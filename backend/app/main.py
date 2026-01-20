from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import tempfile

from app.services.whisper_api import speech_to_text
from app.services.emotion_api import detect_emotion
from app.services.chat_api import therapist_reply

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
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
