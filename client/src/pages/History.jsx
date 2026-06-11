import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";

export default function History({ history }) {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      {/* SIDEBAR (Aapki pehle wali styling ke mutabiq) */}
      <div className="sidebar">
        <h2>💖 FitAI</h2>
        <button onClick={() => navigate("/dashboard")}>🏠 Dashboard</button>
        <button onClick={() => navigate("/chat")}>🤖 AI Chat</button>
        <button onClick={() => navigate("/history")}>📜 History</button>
        <button onClick={() => navigate("/exercise")}>🏋️ Exercise</button>
        <button onClick={() => navigate("/profile")}>👤 Profile</button>
        <button onClick={() => navigate("/")}>🚪 Logout</button>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="main">
        <h1>Calculation History</h1>

        {/* Agar history khali ho */}
        {!history || history.length === 0 ? (
          <p>No history found yet. Go to Dashboard to generate data!</p>
        ) : (
          /* Agar history mein data ho toh loop chalao */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
            {history.map((item, index) => (
              <div key={index} className="result" style={{ borderLeft: '4px solid #bc3aff', padding: '15px', background: '#fff5f7', borderRadius: '10px' }}>
                
                {/* 🚨 SAFELY PRINTING PROPERTIES (NO MORE OBJECT ERRORS) */}
                <h3 style={{ color: '#bc3aff', margin: '0 0 5px 0' }}>{item.type}</h3>
                <p style={{ fontSize: '14px', color: '#666', margin: '0 0 10px 0' }}>⏱️ {item.date}</p>
                
                <div style={{ fontSize: '15px', color: '#333' }}>
                  <p><strong>Age:</strong> {item.age} | <strong>Gender:</strong> {item.gender} | <strong>Diet Level:</strong> {item.dietLevel}</p>
                  <pre style={{ marginTop: '10px', background: '#ffffff', padding: '10px', borderRadius: '5px', fontFamily: 'inherit' }}>
                    {item.result}
                  </pre>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}