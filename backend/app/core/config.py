from pydantic import PostgresDsn, computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_ignore_empty=True,
        extra="ignore",
    )

    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    # 60 minutes * 24 hours * 8 days = 8 days
    
    FIRST_SUPERUSER: str = "admin@example.com"
    FIRST_SUPERUSER_PASSWORD: str = "changethis"
    
    # CORS
    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:8000"]

    @property
    def all_cors_origins(self) -> list[str]:
        return self.BACKEND_CORS_ORIGINS

    OPENAI_API_KEY: str
    DATABASE_URL: str = "sqlite:///./fonso.db"

    @computed_field
    @property
    def ASYNC_DATABASE_URL(self) -> str:
        if self.DATABASE_URL.startswith("postgresql"):
            return str(self.DATABASE_URL).replace("postgresql://", "postgresql+asyncpg://")
        return self.DATABASE_URL.replace("sqlite://", "sqlite+aiosqlite://")


settings = Settings()
