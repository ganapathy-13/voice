import os
from openai import OpenAI

# Use Groq's endpoint + your Groq API key
client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),          # ← Get this from https://console.groq.com/keys
    base_url="https://api.groq.com/openai/v1",
)

def speech_to_text(audio_path: str) -> str:
    with open(audio_path, "rb") as audio_file:
        transcript = client.audio.transcriptions.create(
            file=audio_file,
            model="whisper-large-v3",           # Best quality (or try "whisper-large-v3-turbo" for cheaper/faster)
            # Optional: Add these if needed
            # language="ta",                   # For Tamil-primary audio
            # prompt="Transcribe in Tamil-English mix if present",  # Helps with code-switching
        )
    return transcript.text