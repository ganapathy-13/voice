from dotenv import load_dotenv
from groq import Groq
from openai import OpenAI
import uvicorn
import os
load_dotenv()   # 👈 VERY IMPORTANT

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8001,
        reload=True
    )

print("OPENAI:", os.getenv("OPENAI_API_KEY") is not None)
print("GROQ:", os.getenv("GROQ_API_KEY") is not None)

# from fastapi import FastAPI, UploadFile, File
# from fastapi.middleware.cors import CORSMiddleware
# import tempfile
# from app.services.whisper_service import speech_to_text
# from app.services.emotion_service import detect_emotion
# from app.services.groq_service import therapist_reply
# app = FastAPI()
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_methods=["*"],