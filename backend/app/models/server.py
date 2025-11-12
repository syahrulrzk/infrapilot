from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database.session import Base

class Server(Base):
    __tablename__ = "servers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    ip_address = Column(String, unique=True, index=True, nullable=False)
    ssh_key = Column(Text)
    status = Column(String, default="offline")  # online, offline, maintenance
    cpu_usage = Column(Integer, default=0)
    memory_usage = Column(Integer, default=0)
    disk_usage = Column(Integer, default=0)
    last_seen = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    owner_id = Column(Integer, ForeignKey("users.id"))
    
    # Relationship
    owner = relationship("User", back_populates="servers")