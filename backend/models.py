from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid

# Property Models
class PropertyBase(BaseModel):
    title: str
    location: str
    price: str
    type: str  # Satılık veya Kiralık
    bedrooms: int
    bathrooms: int
    area: int
    description: Optional[str] = None
    images: List[str] = []
    featured: bool = False
    active: bool = True

class PropertyCreate(PropertyBase):
    pass

class PropertyUpdate(BaseModel):
    title: Optional[str] = None
    location: Optional[str] = None
    price: Optional[str] = None
    type: Optional[str] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    area: Optional[int] = None
    description: Optional[str] = None
    images: Optional[List[str]] = None
    featured: Optional[bool] = None
    active: Optional[bool] = None

class Property(PropertyBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    views: int = 0

# Contact Message Models
class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str

class ContactMessage(ContactMessageCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    read: bool = False

# Testimonial Models
class TestimonialBase(BaseModel):
    name: str
    location: str
    rating: int
    comment: str

class TestimonialCreate(TestimonialBase):
    pass

class Testimonial(TestimonialBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    date: datetime = Field(default_factory=datetime.utcnow)
    approved: bool = False

# User Models
class UserLogin(BaseModel):
    username: str
    password: str

class AdminUser(BaseModel):
    username: str
    email: EmailStr
    full_name: str
    role: str = "admin"  # admin, editor
    active: bool = True

class AdminUserCreate(AdminUser):
    password: str

# Stats Models
class DashboardStats(BaseModel):
    total_properties: int
    active_properties: int
    total_messages: int
    unread_messages: int
    total_testimonials: int
    pending_testimonials: int
    total_views: int