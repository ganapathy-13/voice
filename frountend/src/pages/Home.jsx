import { useState } from "react";
import Sidebar from "../components/Sidebar";
import WelcomeScreen from "../components/WelcomeScreen";
import AudioRecorder from "../components/AudioRecorder";
import ChatWindow from "../components/ChatWindow";
import EmotionIndicator from "../components/EmotionIndicator";
import { sendTextToBackend } from "../services/api";

export default function Home() {
  const [emotion, setEmotion] = useState("");
  const [messages, setMessages] = useState([]);
  const [inCall, setInCall] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle clicking a conversation starter
  const handleStartSession = async (starterText) => {
    // 1. Immediately show user message/switch to chat view
    if (!starterText) return;

    // Switch to active view by ensuring messages has an item
    const userMsg = { sender: "user", text: starterText };
    setMessages([userMsg]);
    setLoading(true);

    try {
      const response = await sendTextToBackend(starterText);

      // Update emotion
      if (response.emotion) setEmotion(response.emotion);

      // Add therapist reply
      setMessages((prev) => [
        ...prev,
        { sender: "therapist", text: response.reply }
      ]);

    } catch (error) {
      console.error("Failed to start session:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "therapist", text: "I'm having trouble connecting right now. Please try again or use the microphone." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="main-content">
        {messages.length === 0 ? (
          /* Welcome Screen with Logo & Starters */
          <WelcomeScreen onStartSession={handleStartSession} />
        ) : (
          /* Active Session View */
          <div className="chat-container-view">
            <EmotionIndicator emotion={emotion} />
            <ChatWindow messages={messages} />
          </div>
        )}

        {/* Footer / Mic Controls */}
        <AudioRecorder
          inCall={inCall}
          setInCall={setInCall}
          setEmotion={setEmotion}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
}
