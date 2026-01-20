import { useState } from "react";
import AudioRecorder from "../components/AudioRecorder";
import ChatWindow from "../components/ChatWindow";
import EmotionIndicator from "../components/EmotionIndicator";

export default function Home() {
  const [emotion, setEmotion] = useState("");
  const [messages, setMessages] = useState([]);
  const [inCall, setInCall] = useState(false);

  return (
    <div className="container">
      <h1>🎧 Emotion-Aware Therapist</h1>

      <p className="subtitle">
        Voice-based conversational therapy system
      </p>

      {/* Emotion Display */}
      <EmotionIndicator emotion={emotion} />

      {/* Chat Messages */}
      <ChatWindow messages={messages} />

      {/* Call Controls */}
      <AudioRecorder
        inCall={inCall}
        setInCall={setInCall}
        setEmotion={setEmotion}
        setMessages={setMessages}
      />
    </div>
  );
}
