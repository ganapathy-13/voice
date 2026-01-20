export default function EmotionIndicator({ emotion }) {
    if (!emotion) return null;
  
    return (
      <div className="emotion-indicator">
        <span>🧠 Detected Emotion:</span>
        <strong className={`emotion ${emotion}`}>
          {emotion.toUpperCase()}
        </strong>
      </div>
    );
  }
  