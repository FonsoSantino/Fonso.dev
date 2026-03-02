from typing import List, Optional
from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.project import Project
from app.repositories.project import ProjectRepository
from app.schemas.project import ProjectCreate, ProjectUpdate


class ProjectService:
    def __init__(self, project_repo: ProjectRepository):
        self.project_repo = project_repo

    async def get_multi(
        self,
        db: AsyncSession,
        user_id: Optional[UUID] = None,
        search: Optional[str] = None,
        tags: Optional[List[str]] = None,
        sort_by: str = "created_at",
        skip: int = 0,
        limit: int = 10,
    ) -> List[Project]:
        return await self.project_repo.get_multi_optimized(
            db,
            user_id=user_id,
            search=search,
            tags=tags,
            sort_by=sort_by,
            skip=skip,
            limit=limit,
        )

    async def get(self, db: AsyncSession, id: UUID, user_id: UUID) -> Optional[Project]:
        project = await self.project_repo.get(db, id)
        if not project:
            return None
        if project.user_id != user_id:
            return None
        return project

    async def create(
        self, db: AsyncSession, obj_in: ProjectCreate, user_id: UUID
    ) -> Project:
        return await self.project_repo.create_with_owner(
            db, obj_in=obj_in, owner_id=user_id
        )

    async def update(
        self, db: AsyncSession, db_obj: Project, obj_in: ProjectUpdate
    ) -> Project:
        return await self.project_repo.update(db, db_obj=db_obj, obj_in=obj_in)

    async def delete(self, db: AsyncSession, db_obj: Project) -> Project:
        return await self.project_repo.delete(db, id=db_obj.id)
