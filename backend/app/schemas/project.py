from typing import Optional
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel, ConfigDict

class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = None
    link: Optional[str] = None
    tags: list[str] = []
    priority: int = 0
    metadata_json: Optional[dict] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    link: Optional[str] = None
    tags: Optional[list[str]] = None
    priority: Optional[int] = None
    metadata_json: Optional[dict] = None

class ProjectOut(ProjectBase):
    id: UUID
    user_id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
