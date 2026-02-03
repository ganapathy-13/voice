from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import tempfile
import os
from dotenv import load_dotenv

from app.services.speech_to_text import speech_to_text
from app.services.emotion_recognition import detect_emotion
from app.services.therapist_agent import therapist_reply


load_dotenv()

app = FastAPI(title="Emotion Aware Therapist API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/analyze")
async def analyze_audio(file: UploadFile = File(...)):
    try:
        # ✅ Preserve file extension
        suffix = os.path.splitext(file.filename)[1]

        if suffix == "":
            raise HTTPException(status_code=400, detail="Unsupported file format")

        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            tmp.write(await file.read())
            audio_path = tmp.name

        # 1️⃣ Speech to Text (Gemini – FREE)
        text = speech_to_text(audio_path)

        # 2️⃣ Emotion Detection (LOCAL – FREE)
        emotion = detect_emotion(text)

        # 3️⃣ Therapist Response (Gemini – FREE)
        reply = therapist_reply(text, emotion)

        return {
            "transcript": text,
            "emotion": emotion,
            "reply": reply
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        # ✅ Cleanup temp file
        if "audio_path" in locals() and os.path.exists(audio_path):
            os.remove(audio_path)


class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_with_therapist(request: ChatRequest):
    try:
        text = request.message
        
        # 1️⃣ Emotion Detection (LOCAL – FREE)
        # Assuming detect_emotion can handle text input directly as per its name
        emotion = detect_emotion(text)

        # 2️⃣ Therapist Response (Gemini – FREE)
        reply = therapist_reply(text, emotion)

        return {
            "transcript": text,
            "emotion": emotion,
            "reply": reply
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
