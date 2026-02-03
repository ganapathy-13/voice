const BACKEND_URL = "http://localhost:8000";

export async function sendAudioToBackend(audioBlob) {
  const formData = new FormData();
  formData.append("file", audioBlob);

  const response = await fetch(`${BACKEND_URL}/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to process audio");
  }

  return await response.json();
  return await response.json();
}

export async function sendTextToBackend(text) {
  const response = await fetch(`${BACKEND_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: text }),
  });

  if (!response.ok) {
    throw new Error("Failed to process text");
  }

  return await response.json();
}
