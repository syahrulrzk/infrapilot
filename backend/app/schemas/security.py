from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SecurityAlertBase(BaseModel):
    title: str
    description: Optional[str] = None
    severity: Optional[str] = "low"
    status: Optional[str] = "open"
    source: Optional[str] = None

class SecurityAlertCreate(SecurityAlertBase):
    pass

class SecurityAlertUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    severity: Optional[str] = None
    status: Optional[str] = None
    source: Optional[str] = None

class SecurityAlertInDBBase(SecurityAlertBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]
    owner_id: int

    class Config:
        orm_mode = True

class SecurityAlert(SecurityAlertInDBBase):
    pass