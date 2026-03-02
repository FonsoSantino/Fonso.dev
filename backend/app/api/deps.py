from typing import AsyncGenerator, Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import ValidationError

from app.core import security
from app.core.config import settings
from app.db.session import SessionLocal
from app.models.user import User
from app.models.project import Project
from app.models.experience import Experience
from app.schemas.token import TokenPayload
from app.services.auth_service import AuthService
from app.services.project_service import ProjectService
from app.services.experience_service import ExperienceService
from app.repositories.user import UserRepository
from app.repositories.project import ProjectRepository
from app.repositories.experience import ExperienceRepository

reusable_oauth2 = security.oauth2_scheme

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with SessionLocal() as session:
        yield session

SessionDep = Annotated[AsyncSession, Depends(get_db)]
TokenDep = Annotated[str, Depends(reusable_oauth2)]

# Repository Providers
def get_user_repo() -> UserRepository:
    return UserRepository(User)

def get_project_repo() -> ProjectRepository:
    return ProjectRepository(Project)

def get_experience_repo() -> ExperienceRepository:
    return ExperienceRepository(Experience)

# Service Providers
def get_auth_service(user_repo: UserRepository = Depends(get_user_repo)) -> AuthService:
    return AuthService(user_repo)

def get_project_service(
    project_repo: ProjectRepository = Depends(get_project_repo)
) -> ProjectService:
    return ProjectService(project_repo)

def get_experience_service(
    experience_repo: ExperienceRepository = Depends(get_experience_repo)
) -> ExperienceService:
    return ExperienceService(experience_repo)


async def get_current_user(
    session: SessionDep,
    token: TokenDep,
    auth_service: AuthService = Depends(get_auth_service),
) -> User:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        token_data = TokenPayload(**payload)
    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    user = await auth_service.get_user_by_email(session, email=token_data.sub)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return user


CurrentUser = Annotated[User, Depends(get_current_user)]
