import asyncio
import logging
from datetime import date
from uuid import UUID

from app.db.session import SessionLocal
from app.core.config import settings
from app.models.user import User
from app.models.project import Project
from app.models.experience import Experience
from app.services.auth_service import AuthService
from app.repositories.user import UserRepository
from app.schemas.user import UserCreate

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def seed_data() -> None:
    async with SessionLocal() as session:
        user_repo = UserRepository(User)
        auth_service = AuthService(user_repo)
        
        # 1. Ensure Superuser exists
        user = await auth_service.get_user_by_email(db=session, email=settings.FIRST_SUPERUSER)
        if not user:
            user_in = UserCreate(
                email=settings.FIRST_SUPERUSER,
                password=settings.FIRST_SUPERUSER_PASSWORD,
                is_superuser=True,
                full_name="Santino Fonso",
                is_active=True,
            )
            user = await auth_service.create_user(db=session, user_in=user_in)
            logger.info(f"Superuser Santino Fonso created")
        
        user_id = user.id

        # 2. Seed Projects
        projects_data = [
            {
                "title": "Quantum Core Architecture",
                "description": "A high-performance portfolio engine 100% built by Santino at 18. Features a distributed FastAPI core, distributed caching, and AI-driven predictive search.",
                "link": "https://github.com/santino/quantum-core",
                "tags": ["FastAPI", "Next.js", "Redis", "Distributed Systems"],
                "user_id": user_id
            },
            {
                "title": "Neural Bridge AI",
                "description": "Unified orchestration layer for multiple LLMs, providing real-time code generation and autonomous debugging for enterprise workflows.",
                "link": "https://github.com/santino/neural-bridge",
                "tags": ["Python", "OpenAI", "Anthropic", "VectorDB"],
                "user_id": user_id
            },
            {
                "title": "Sentinel OS Terminal",
                "description": "Terminal-based workstation environment with integrated DevEx tools, 100% designed to optimize high-speed engineering workflows.",
                "link": "https://github.com/santino/sentinel-os",
                "tags": ["Rust", "TUI", "Go", "Kernel-Level Tools"],
                "user_id": user_id
            },
            {
                "title": "Cognisys Orbit",
                "description": "Plataforma de inteligencia empresarial distribuida con microservicios de alto rendimiento, coordinando agentes de IA en tiempo real. Backend en Rust y dashboard React/TypeScript.",
                "link": "https://github.com/santino/cognisys-orbit",
                "tags": ["Rust", "React", "TypeScript", "Microservicios", "AI"],
                "user_id": user_id
            }
        ]

        for p_data in projects_data:
            project = Project(**p_data)
            session.add(project)
        
        # 3. Seed Experience
        experiences_data = [
            {
                "company": "Tech Innovators Inc.",
                "position": "Senior Full-stack Developer",
                "start_date": date(2022, 1, 1),
                "description": "Lead developer for AI-driven analytics platforms. Architected scalable microservices using Python and React.",
                "user_id": user_id
            },
            {
                "company": "Digital Dreams Studio",
                "position": "Backend Engineer",
                "start_date": date(2020, 6, 1),
                "end_date": date(2021, 12, 31),
                "description": "Focused on optimizing high-traffic APIs and database performance for gaming applications.",
                "user_id": user_id
            }
        ]

        for e_data in experiences_data:
            experience = Experience(**e_data)
            session.add(experience)

        await session.commit()
        logger.info("Database seeded with sample projects and experiences.")

async def main() -> None:
    logger.info("Starting seed process...")
    await seed_data()
    logger.info("Seed process completed.")

if __name__ == "__main__":
    asyncio.run(main())
