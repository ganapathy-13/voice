from groq import Groq
import os

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def therapist_reply(text: str, emotion: str) -> str:
    prompt = f"""
You are a calm, empathetic therapist.
User emotion: {emotion}
User message: "{text}"

Respond briefly and supportively.
"""

    response = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {"role": "system", "content": "You are an AI therapist."},
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content
