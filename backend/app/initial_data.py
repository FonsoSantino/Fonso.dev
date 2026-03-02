import asyncio
import logging
from sqlalchemy import select

from app.db.session import SessionLocal
from app.core.config import settings
from app.models.user import User
from app.schemas.user import UserCreate
from app.services.auth_service import AuthService
from app.repositories.user import UserRepository

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def init_db() -> None:
    async with SessionLocal() as session:
        user_repo = UserRepository(User)
        auth_service = AuthService(user_repo)
        user = await auth_service.get_user_by_email(db=session, email=settings.FIRST_SUPERUSER)
        if not user:
            user_in = UserCreate(
                email=settings.FIRST_SUPERUSER,
                password=settings.FIRST_SUPERUSER_PASSWORD,
                is_superuser=True,
                full_name="Initial Super User",
                is_active=True,
            )
            user = await auth_service.create_user(db=session, user_in=user_in)
            logger.info(f"Superuser {settings.FIRST_SUPERUSER} created")
        else:
            logger.info("Superuser already exists")

async def main() -> None:
    logger.info("Creating initial data")
    await init_db()
    logger.info("Initial data created")

if __name__ == "__main__":
    asyncio.run(main())
