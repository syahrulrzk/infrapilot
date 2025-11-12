from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class VaultItemBase(BaseModel):
    name: str
    username: Optional[str] = None
    password: Optional[str] = None
    url: Optional[str] = None
    notes: Optional[str] = None
    category: Optional[str] = "general"

class VaultItemCreate(VaultItemBase):
    pass

class VaultItemUpdate(BaseModel):
    name: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None
    url: Optional[str] = None
    notes: Optional[str] = None
    category: Optional[str] = None

class VaultItemInDBBase(VaultItemBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]
    owner_id: int

    class Config:
        orm_mode = True

class VaultItem(VaultItemInDBBase):
    pass