from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import timedelta
import base64
import uuid

from models import (
    Property, PropertyCreate, PropertyUpdate,
    ContactMessage, ContactMessageCreate,
    Testimonial, TestimonialCreate,
    UserLogin, DashboardStats
)
from auth import (
    verify_password, get_password_hash, create_access_token,
    decode_token, Token, ACCESS_TOKEN_EXPIRE_MINUTES
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBearer()

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ==================== AUTH ====================

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    token_data = decode_token(token)
    if token_data is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = await db.admin_users.find_one({"username": token_data.username})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@api_router.post("/auth/login", response_model=Token)
async def login(user_login: UserLogin):
    # Admin kullanıcısını bul
    user = await db.admin_users.find_one({"username": user_login.username})
    
    if not user or not verify_password(user_login.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"]},
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@api_router.get("/auth/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return {
        "username": current_user["username"],
        "email": current_user["email"],
        "full_name": current_user["full_name"],
        "role": current_user.get("role", "admin")
    }

# İlk admin kullanıcısını oluştur (sadece bir kez çalışır)
@api_router.post("/auth/init-admin")
async def init_admin():
    # Kontrol et, admin var mı
    existing_admin = await db.admin_users.find_one({"username": "admin"})
    if existing_admin:
        raise HTTPException(status_code=400, detail="Admin already exists")
    
    # İlk admin oluştur
    admin = {
        "username": "admin",
        "email": "admin@nuracadde.com",
        "full_name": "Admin User",
        "hashed_password": get_password_hash("admin123"),  # İlk şifre
        "role": "admin",
        "active": True
    }
    
    await db.admin_users.insert_one(admin)
    return {"message": "Admin user created", "username": "admin", "password": "admin123"}

# ==================== PROPERTIES ====================

@api_router.get("/properties", response_model=List[Property])
async def get_properties(active_only: bool = False, skip: int = 0, limit: int = 100):
    query = {"active": True} if active_only else {}
    properties = await db.properties.find(query).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    return [Property(**prop) for prop in properties]

@api_router.get("/properties/{property_id}", response_model=Property)
async def get_property(property_id: str):
    prop = await db.properties.find_one({"id": property_id})
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    
    # View count artır
    await db.properties.update_one(
        {"id": property_id},
        {"$inc": {"views": 1}}
    )
    
    return Property(**prop)

@api_router.post("/properties", response_model=Property)
async def create_property(property_data: PropertyCreate, current_user: dict = Depends(get_current_user)):
    property_dict = property_data.dict()
    new_property = Property(**property_dict)
    
    await db.properties.insert_one(new_property.dict())
    return new_property

@api_router.put("/properties/{property_id}", response_model=Property)
async def update_property(
    property_id: str,
    property_data: PropertyUpdate,
    current_user: dict = Depends(get_current_user)
):
    prop = await db.properties.find_one({"id": property_id})
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    
    update_data = property_data.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    await db.properties.update_one(
        {"id": property_id},
        {"$set": update_data}
    )
    
    updated_prop = await db.properties.find_one({"id": property_id})
    return Property(**updated_prop)

@api_router.delete("/properties/{property_id}")
async def delete_property(property_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.properties.delete_one({"id": property_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Property not found")
    return {"message": "Property deleted successfully"}

# ==================== CONTACT MESSAGES ====================

@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(message_data: ContactMessageCreate):
    message_dict = message_data.dict()
    new_message = ContactMessage(**message_dict)
    
    await db.contact_messages.insert_one(new_message.dict())
    return new_message

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages(
    current_user: dict = Depends(get_current_user),
    unread_only: bool = False,
    skip: int = 0,
    limit: int = 100
):
    query = {"read": False} if unread_only else {}
    messages = await db.contact_messages.find(query).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    return [ContactMessage(**msg) for msg in messages]

@api_router.put("/contact/{message_id}/read")
async def mark_message_read(message_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.contact_messages.update_one(
        {"id": message_id},
        {"$set": {"read": True}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"message": "Message marked as read"}

@api_router.delete("/contact/{message_id}")
async def delete_message(message_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.contact_messages.delete_one({"id": message_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"message": "Message deleted successfully"}

# ==================== TESTIMONIALS ====================

@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials(approved_only: bool = True):
    query = {"approved": True} if approved_only else {}
    testimonials = await db.testimonials.find(query).sort("date", -1).to_list(100)
    return [Testimonial(**test) for test in testimonials]

@api_router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(testimonial_data: TestimonialCreate):
    testimonial_dict = testimonial_data.dict()
    new_testimonial = Testimonial(**testimonial_dict)
    
    await db.testimonials.insert_one(new_testimonial.dict())
    return new_testimonial

@api_router.put("/testimonials/{testimonial_id}/approve")
async def approve_testimonial(testimonial_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.testimonials.update_one(
        {"id": testimonial_id},
        {"$set": {"approved": True}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"message": "Testimonial approved"}

@api_router.delete("/testimonials/{testimonial_id}")
async def delete_testimonial(testimonial_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.testimonials.delete_one({"id": testimonial_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"message": "Testimonial deleted successfully"}

# ==================== IMAGE UPLOAD ====================

@api_router.post("/upload")
async def upload_image(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    # Dosya tipini kontrol et
    allowed_types = ["image/jpeg", "image/png", "image/jpg", "image/webp"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid file type")
    
    # Dosyayı oku
    contents = await file.read()
    
    # Base64'e çevir (basit yöntem, production'da S3 veya CDN kullan)
    file_id = str(uuid.uuid4())
    file_extension = file.filename.split('.')[-1]
    
    # MongoDB'ye kaydet
    image_doc = {
        "id": file_id,
        "filename": file.filename,
        "content_type": file.content_type,
        "data": base64.b64encode(contents).decode('utf-8'),
        "uploaded_at": datetime.utcnow()
    }
    
    await db.images.insert_one(image_doc)
    
    # URL döndür
    image_url = f"/api/images/{file_id}"
    return {"url": image_url, "id": file_id}

@api_router.get("/images/{image_id}")
async def get_image(image_id: str):
    from fastapi.responses import Response
    
    image = await db.images.find_one({"id": image_id})
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    
    # Base64'den decode et
    image_data = base64.b64decode(image["data"])
    
    return Response(content=image_data, media_type=image["content_type"])

# ==================== DASHBOARD STATS ====================

@api_router.get("/dashboard/stats", response_model=DashboardStats)
async def get_dashboard_stats(current_user: dict = Depends(get_current_user)):
    total_properties = await db.properties.count_documents({})
    active_properties = await db.properties.count_documents({"active": True})
    total_messages = await db.contact_messages.count_documents({})
    unread_messages = await db.contact_messages.count_documents({"read": False})
    total_testimonials = await db.testimonials.count_documents({})
    pending_testimonials = await db.testimonials.count_documents({"approved": False})
    
    # Toplam görüntüleme sayısı
    pipeline = [
        {"$group": {"_id": None, "total_views": {"$sum": "$views"}}}
    ]
    view_result = await db.properties.aggregate(pipeline).to_list(1)
    total_views = view_result[0]["total_views"] if view_result else 0
    
    return DashboardStats(
        total_properties=total_properties,
        active_properties=active_properties,
        total_messages=total_messages,
        unread_messages=unread_messages,
        total_testimonials=total_testimonials,
        pending_testimonials=pending_testimonials,
        total_views=total_views
    )

# ==================== BASIC ROUTES ====================

@api_router.get("/")
async def root():
    return {"message": "Nura Cadde Emlak API"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

from datetime import datetime

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()