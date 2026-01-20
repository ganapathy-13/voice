export default function ChatWindow({ messages }) {
    return (
      <div className="chat-window">
        {messages.length === 0 && (
          <p className="chat-placeholder">
            🎧 Start the call and speak to begin the session...
          </p>
        )}
  
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "user" ? "user" : "therapist"
            }`}
          >
            <strong>{msg.sender === "user" ? "You" : "Therapist"}:</strong>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
    );
  }
  