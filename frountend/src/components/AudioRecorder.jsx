import { useRef, useState } from "react";
import { sendAudioToBackend } from "../services/api";

export default function AudioRecorder({
  inCall,
  setInCall,
  setEmotion,
  setMessages,
}) {
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [loading, setLoading] = useState(false);

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = async () => {
      setLoading(true);

      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      try {
        const response = await sendAudioToBackend(audioBlob);

        // Update emotion
        setEmotion(response.emotion);

        // Update chat
        setMessages((prev) => [
          ...prev,
          { sender: "user", text: response.transcript },
          { sender: "therapist", text: response.reply },
        ]);

        // Play AI voice reply
        if (response.audio_url) {
          const audio = new Audio(response.audio_url);
          audio.play();
        }
      } catch (error) {
        console.error("Error processing audio:", error);
      }

      setLoading(false);
    };

    mediaRecorderRef.current.start();
    setInCall(true);
  };

  const stopCall = () => {
    mediaRecorderRef.current.stop();
    setInCall(false);
  };

  return (
    <div className="call-controls">
      {!inCall ? (
        <button className="call-btn" onClick={startCall}>
          📞 Start Call
        </button>
      ) : (
        <button className="call-btn stop" onClick={stopCall}>
          ⛔ End Call
        </button>
      )}

      {loading && <p className="loading">Analyzing emotion & replying...</p>}
    </div>
  );
}
