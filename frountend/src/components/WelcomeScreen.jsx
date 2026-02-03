import React from "react";

export default function WelcomeScreen({ onStartSession }) {
    const starters = [
        "I've been feeling stressed lately...",
        "Help me sleep better tonight.",
        "Need motivation about my day?",
        "How does this platform work?",
    ];

    return (
        <div className="welcome-card">
            <div className="logo-container">
                {/* Simple SVG icon for heart/shield */}
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="logo-icon"
                >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            </div>

            <h1 className="welcome-title">Welcome to Serenity</h1>
            <p className="welcome-subtitle">
                Your private, judgment-free space for reflection.
            </p>

            <div className="starters-section">
                <h3 className="starters-title">Conversation Starters</h3>
                <div className="starters-grid">
                    {starters.map((text, idx) => (
                        <div key={idx} className="starter-card" onClick={() => onStartSession(text)}>
                            <p>{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
