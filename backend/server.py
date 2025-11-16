from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import os
import logging
from pathlib import Path
from typing import List
from datetime import timedelta, datetime
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

# MongoDB connection - Sync
mongo_url = os.environ['MONGO_URL']
client = MongoClient(
    mongo_url,
    tls=True,
    tlsAllowInvalidCertificates=True,
    serverSelectionTimeoutMS=5000,
    connectTimeoutMS=10000
)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")
security = HTTPBearer()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Auth
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    token_data = decode_token(token)
    if token_data is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    user = db.admin_users.find_one({"username": token_data.username})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@api_router.post("/auth/login", response_model=Token)
def login(user_login: UserLogin):
    user = db.admin_users.find_one({"username": user_login.username})
    if not user or not verify_password(user_login.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    access_token = create_access_token(
        data={"sub": user["username"]},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": access_token, "token_type": "bearer"}

@api_router.get("/auth/me")
def get_me(current_user: dict = Depends(get_current_user)):
    return {
        "username": current_user["username"],
        "email": current_user["email"],
        "full_name": current_user["full_name"],
        "role": current_user.get("role", "admin")
    }

@api_router.post("/auth/init-admin")
def init_admin():
    if db.admin_users.find_one({"username": "admin"}):
        raise HTTPException(status_code=400, detail="Admin already exists")
    admin = {
        "username": "admin",
        "email": "admin@nuracadde.com",
        "full_name": "Admin User",
        "hashed_password": get_password_hash("admin123"),
        "role": "admin",
        "active": True
    }
    db.admin_users.insert_one(admin)
    return {"message": "Admin created", "username": "admin", "password": "admin123"}

# Properties
@api_router.get("/properties", response_model=List[Property])
def get_properties(active_only: bool = False, skip: int = 0, limit: int = 100):
    query = {"active": True} if active_only else {}
    properties = list(db.properties.find(query).sort("created_at", -1).skip(skip).limit(limit))
    return [Property(**p) for p in properties]

@api_router.get("/properties/{property_id}", response_model=Property)
def get_property(property_id: str):
    prop = db.properties.find_one({"id": property_id})
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    db.properties.update_one({"id": property_id}, {"$inc": {"views": 1}})
    return Property(**prop)

@api_router.post("/properties", response_model=Property)
def create_property(property_data: PropertyCreate, current_user: dict = Depends(get_current_user)):
    new_property = Property(**property_data.dict())
    db.properties.insert_one(new_property.dict())
    return new_property

@api_router.put("/properties/{property_id}", response_model=Property)
def update_property(property_id: str, property_data: PropertyUpdate, current_user: dict = Depends(get_current_user)):
    prop = db.properties.find_one({"id": property_id})
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    update_data = property_data.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    db.properties.update_one({"id": property_id}, {"$set": update_data})
    updated = db.properties.find_one({"id": property_id})
    return Property(**updated)

@api_router.delete("/properties/{property_id}")
def delete_property(property_id: str, current_user: dict = Depends(get_current_user)):
    result = db.properties.delete_one({"id": property_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Property not found")
    return {"message": "Deleted"}

# Contact
@api_router.post("/contact", response_model=ContactMessage)
def create_contact(message_data: ContactMessageCreate):
    new_message = ContactMessage(**message_data.dict())
    db.contact_messages.insert_one(new_message.dict())
    return new_message

@api_router.get("/contact", response_model=List[ContactMessage])
def get_contacts(current_user: dict = Depends(get_current_user), unread_only: bool = False):
    query = {"read": False} if unread_only else {}
    messages = list(db.contact_messages.find(query).sort("created_at", -1).limit(100))
    return [ContactMessage(**m) for m in messages]

@api_router.put("/contact/{message_id}/read")
def mark_read(message_id: str, current_user: dict = Depends(get_current_user)):
    db.contact_messages.update_one({"id": message_id}, {"$set": {"read": True}})
    return {"message": "Marked read"}

@api_router.delete("/contact/{message_id}")
def delete_contact(message_id: str, current_user: dict = Depends(get_current_user)):
    db.contact_messages.delete_one({"id": message_id})
    return {"message": "Deleted"}

# Testimonials
@api_router.get("/testimonials", response_model=List[Testimonial])
def get_testimonials(approved_only: bool = True):
    query = {"approved": True} if approved_only else {}
    testimonials = list(db.testimonials.find(query).sort("date", -1).limit(100))
    return [Testimonial(**t) for t in testimonials]

@api_router.post("/testimonials", response_model=Testimonial)
def create_testimonial(test_data: TestimonialCreate):
    new_test = Testimonial(**test_data.dict())
    db.testimonials.insert_one(new_test.dict())
    return new_test

@api_router.put("/testimonials/{test_id}/approve")
def approve_testimonial(test_id: str, current_user: dict = Depends(get_current_user)):
    db.testimonials.update_one({"id": test_id}, {"$set": {"approved": True}})
    return {"message": "Approved"}

@api_router.delete("/testimonials/{test_id}")
def delete_testimonial(test_id: str, current_user: dict = Depends(get_current_user)):
    db.testimonials.delete_one({"id": test_id})
    return {"message": "Deleted"}

# Image upload
@api_router.post("/upload")
def upload_image(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    allowed_types = ["image/jpeg", "image/png", "image/jpg", "image/webp"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid file type")
    contents = file.file.read()
    file_id = str(uuid.uuid4())
    image_doc = {
        "id": file_id,
        "filename": file.filename,
        "content_type": file.content_type,
        "data": base64.b64encode(contents).decode('utf-8'),
        "uploaded_at": datetime.utcnow()
    }
    db.images.insert_one(image_doc)
    return {"url": f"/api/images/{file_id}", "id": file_id}

@api_router.get("/images/{image_id}")
def get_image(image_id: str):
    image = db.images.find_one({"id": image_id})
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    image_data = base64.b64decode(image["data"])
    return Response(content=image_data, media_type=image["content_type"])

# Dashboard
@api_router.get("/dashboard/stats", response_model=DashboardStats)
def get_stats(current_user: dict = Depends(get_current_user)):
    return DashboardStats(
        total_properties=db.properties.count_documents({}),
        active_properties=db.properties.count_documents({"active": True}),
        total_messages=db.contact_messages.count_documents({}),
        unread_messages=db.contact_messages.count_documents({"read": False}),
        total_testimonials=db.testimonials.count_documents({}),
        pending_testimonials=db.testimonials.count_documents({"approved": False}),
        total_views=sum(p.get("views", 0) for p in db.properties.find({}, {"views": 1}))
    )

@api_router.get("/")
def root():
    return {"message": "Nura Cadde Emlak API"}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
