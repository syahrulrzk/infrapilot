from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ServerBase(BaseModel):
    name: str
    ip_address: str
    ssh_key: Optional[str] = None
    status: Optional[str] = "offline"
    cpu_usage: Optional[int] = 0
    memory_usage: Optional[int] = 0
    disk_usage: Optional[int] = 0
    last_seen: Optional[datetime] = None

class ServerCreate(ServerBase):
    pass

class ServerUpdate(BaseModel):
    name: Optional[str] = None
    ip_address: Optional[str] = None
    ssh_key: Optional[str] = None
    status: Optional[str] = None
    cpu_usage: Optional[int] = None
    memory_usage: Optional[int] = None
    disk_usage: Optional[int] = None
    last_seen: Optional[datetime] = None

class ServerInDBBase(ServerBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]
    owner_id: int

    class Config:
        orm_mode = True

class Server(ServerInDBBase):
    pass