from typing import Optional

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User
from app.repositories.user import UserRepository
from app.schemas.user import UserCreate


class AuthService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def get_user_by_email(self, db: AsyncSession, email: str) -> Optional[User]:
        return await self.user_repo.get_by_email(db, email=email)

    async def authenticate_user(
        self, db: AsyncSession, email: str, password: str
    ) -> Optional[User]:
        return await self.user_repo.authenticate(db, email=email, password=password)

    async def create_user(self, db: AsyncSession, user_in: UserCreate) -> User:
        # Hashing is handled in UserRepository.create
        return await self.user_repo.create(db, obj_in=user_in)
