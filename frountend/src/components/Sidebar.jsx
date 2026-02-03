import React from "react";

export default function Sidebar() {
    return (
        <div className="sidebar">
            {/* Brand / Logo Area could go here if moving logo to sidebar, keeping consistent with image */}

            <button className="start-session-btn">Start First Session</button>

            <div className="journey-section">
                <div className="journey-header">
                    <div className="journey-icon">+</div>
                    <span>Your Journey Starts Here</span>
                </div>
                <p className="journey-text">
                    After your first session, summaries and insights will appear here to
                    track your progress.
                </p>
            </div>
        </div>
    );
}
