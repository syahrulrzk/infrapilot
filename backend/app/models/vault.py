from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database.session import Base

class VaultItem(Base):
    __tablename__ = "vault_items"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    username = Column(String)
    password = Column(Text)  # This will be encrypted
    url = Column(String)
    notes = Column(Text)
    category = Column(String, default="general")  # general, server, database, api, etc.
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    owner_id = Column(Integer, ForeignKey("users.id"))
    
    # Relationship
    owner = relationship("User", back_populates="vault_items")