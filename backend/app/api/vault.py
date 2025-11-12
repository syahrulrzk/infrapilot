from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.schemas.vault import VaultItem, VaultItemCreate, VaultItemUpdate
from app.models.vault import VaultItem as VaultItemModel
from app.utils.encryption import encrypt_data, decrypt_data

router = APIRouter()

@router.post("/", response_model=VaultItem, status_code=status.HTTP_201_CREATED)
def create_vault_item(item: VaultItemCreate, db: Session = Depends(get_db)):
    item_dict = item.dict()
    # Encrypt the password before storing
    if item_dict.get('password'):
        item_dict['password'] = encrypt_data(item_dict['password'])
    db_item = VaultItemModel(**item_dict)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/", response_model=List[VaultItem])
def read_vault_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = db.query(VaultItemModel).offset(skip).limit(limit).all()
    # Decrypt passwords before returning
    for item in items:
        if item.password:
            item.password = decrypt_data(item.password)
    return items

@router.get("/{item_id}", response_model=VaultItem)
def read_vault_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(VaultItemModel).filter(VaultItemModel.id == item_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Vault item not found")
    # Decrypt the password before returning
    if db_item.password:
        db_item.password = decrypt_data(db_item.password)
    return db_item

@router.put("/{item_id}", response_model=VaultItem)
def update_vault_item(item_id: int, item: VaultItemUpdate, db: Session = Depends(get_db)):
    db_item = db.query(VaultItemModel).filter(VaultItemModel.id == item_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Vault item not found")
    
    update_data = item.dict(exclude_unset=True)
    # Encrypt the password if it's being updated
    if 'password' in update_data and update_data['password'] is not None:
        update_data['password'] = encrypt_data(update_data['password'])
    for key, value in update_data.items():
        setattr(db_item, key, value)
    
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_vault_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(VaultItemModel).filter(VaultItemModel.id == item_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Vault item not found")
    
    db.delete(db_item)
    db.commit()
    return