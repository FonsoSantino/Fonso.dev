from fastapi import APIRouter, HTTPException, Request, Depends
from pydantic import BaseModel

from app.services.ai_service import ai_service
from app.api.deps import CurrentUser
from app.core.rate_limit import limiter

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

class GenDescRequest(BaseModel):
    title: str
    keywords: str

@router.post("/chat", response_model=ChatResponse)
@limiter.limit("5/minute")
async def chat_with_assistant(
    request: Request,
    chat_req: ChatRequest
) -> ChatResponse:
    """
    Public endpoint to chat with portfolio assistant. Rate limited.
    """
    try:
        response = await ai_service.get_portfolio_assistant_response(chat_req.message)
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate-description", response_model=ChatResponse)
async def generate_description(
    req: GenDescRequest,
    current_user: CurrentUser
) -> ChatResponse:
    """
    Admin only: Generate project description.
    """
    if not current_user.is_superuser:
         raise HTTPException(status_code=403, detail="Not authorized")
         
    try:
        response = await ai_service.generate_project_description(req.title, req.keywords)
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
