from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import tempfile

from app.services.speech_to_text import speech_to_text
from app.services.emotion_recognition import detect_emotion
from app.services.therapist_agent import therapist_reply

import os
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_audio(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(await file.read())
        audio_path = tmp.name

    text = speech_to_text(audio_path)
    emotion = detect_emotion(text)
    reply = therapist_reply(text, emotion)

    return {
        "transcript": text,
        "emotion": emotion,
        "reply": reply
    }
# print("OPENAI:", os.getenv("OPENAI_API_KEY") is not None)
# print("GROQ:", os.getenv("GROQ_API_KEY") is not None)
