from datetime import datetime, date
from typing import Optional
from uuid import UUID

from sqlalchemy import String, ForeignKey, DateTime, func, Text, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base

class Experience(Base):
    __tablename__ = "experiences"

    company: Mapped[str] = mapped_column(String, index=True, nullable=False)
    position: Mapped[str] = mapped_column(String, index=True, nullable=False)
    start_date: Mapped[date] = mapped_column(Date, nullable=False)
    end_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    description: Mapped[Optional[str]] = mapped_column(Text)
    
    user_id: Mapped[UUID] = mapped_column(ForeignKey("users.id"))
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    owner: Mapped["User"] = relationship(back_populates="experiences")
