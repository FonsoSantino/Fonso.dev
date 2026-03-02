from datetime import datetime
from typing import Optional
from uuid import UUID

from sqlalchemy import String, ForeignKey, DateTime, func, Text, Integer, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base

class Project(Base):
    __tablename__ = "projects"

    title: Mapped[str] = mapped_column(String, index=True, nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text)
    link: Mapped[Optional[str]] = mapped_column(String)
    
    # New fields for Next-Gen Portfolio
    tags: Mapped[Optional[list[str]]] = mapped_column(JSON, default=[])
    priority: Mapped[int] = mapped_column(Integer, default=0, index=True)
    metadata_json: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True) # For icons, stats, etc.
    
    user_id: Mapped[UUID] = mapped_column(ForeignKey("users.id"))
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    owner: Mapped["User"] = relationship(back_populates="projects")
