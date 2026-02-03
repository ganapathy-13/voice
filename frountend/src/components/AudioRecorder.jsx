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
    try {
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
    } catch (err) {
      console.error("Microphone access denied:", err);
      alert("Could not access microphone.");
    }
  };

  const stopCall = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setInCall(false);
    }
  };

  const toggleCall = () => {
    if (inCall) {
      stopCall();
    } else {
      startCall();
    }
  }

  return (
    <div className="footer-section">
      <div className="mic-button-container">
        <button className="mic-btn-large" onClick={toggleCall}>
          {loading ? (
            <span className="loading-spinner">...</span>
          ) : inCall ? (
            /* Stop Icon */
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
          ) : (
            /* Mic Icon */
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          )}
        </button>
        <p className="mic-hint">
          {inCall ? "Tap to stop speaking" : loading ? "Processing..." : "Tap mic to begin speaking"}
        </p>
      </div>

      <div className="footer-links">
        <span>End-to-End Encrypted & Private</span>
        <span className="footer-link">Crisis Resources</span>
      </div>
    </div>
  );
}
