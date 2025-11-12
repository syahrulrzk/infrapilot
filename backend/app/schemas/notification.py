from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class NotificationBase(BaseModel):
    title: str
    message: str
    type: str
    recipient: Optional[str] = None
    status: Optional[str] = "pending"

class NotificationCreate(NotificationBase):
    pass

class NotificationUpdate(BaseModel):
    title: Optional[str] = None
    message: Optional[str] = None
    type: Optional[str] = None
    recipient: Optional[str] = None
    status: Optional[str] = None

class NotificationInDBBase(NotificationBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]
    user_id: int

    class Config:
        orm_mode = True

class Notification(NotificationInDBBase):
    pass