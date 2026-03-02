import logging
from openai import AsyncOpenAI
from app.core.config import settings

logger = logging.getLogger(__name__)

class AIService:
    def __init__(self):
        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

    async def generate_text(self, prompt: str, system_message: str = "You are a helpful assistant.") -> str:
        try:
            response = await self.client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": system_message},
                    {"role": "user", "content": prompt},
                ],
            )
            return response.choices[0].message.content or ""
        except Exception as e:
            logger.error(f"OpenAI API Error: {str(e)}")
            raise e

    async def get_portfolio_assistant_response(self, message: str) -> str:
        system_msg = (
            "You are Fonso's virtual portfolio assistant. You are professional, confident, and knowledgeable about Fonso's work. "
            "You answer questions about his skills (Next.js, FastAPI, Python), experience, and projects. "
            "Keep answers concise and inviting."
        )
        return await self.generate_text(message, system_message=system_msg)

    async def generate_project_description(self, title: str, keywords: str) -> str:
        system_msg = "You are a professional technical writer creating portfolio project descriptions."
        prompt = f"Write a compelling 2-sentence description for a project titled '{title}' involving these keywords/technologies: {keywords}."
        return await self.generate_text(prompt, system_message=system_msg)

ai_service = AIService()
