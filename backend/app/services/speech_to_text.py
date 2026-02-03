import google.generativeai as genai
import os
import mimetypes
import whisper

# model = whisper.load_model("tiny")

# def speech_to_text(audio_path: str) -> str:
#     try:
#         result = model.transcribe(audio_path)
#         return result["text"].strip()
#     except Exception as e:
#         print("Speech-to-text error:", e)
#         return "Speech transcription failed"

import os
import mimetypes

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def speech_to_text(audio_path: str) -> str:
    try:
        mime_type, _ = mimetypes.guess_type(audio_path)
        if mime_type is None:
            mime_type = "audio/mpeg"

        audio_file = genai.upload_file(
            path=audio_path,
            mime_type=mime_type
        )

        # ✅ CORRECT MODEL
        model = genai.GenerativeModel("models/gemini-1.5-pro")

        response = model.generate_content([
            "Transcribe this audio to text accurately.",
            audio_file
        ])

        return response.text.strip()

    except Exception as e:
        print("Speech-to-text error:", e)
        return "Speech transcription failed"
