import { useState } from "react";

export default function History() {

  const [history] = useState(
    JSON.parse(localStorage.getItem("dietHistory")) || []
  );

  return (
    <div style={{ padding: "40px" }}>
      
      <h1 style={{ color: "hotpink", textAlign: "center" }}>
        📜 Diet History
      </h1>

      {history.length === 0 ? (
        <p style={{ textAlign: "center" }}>No history found 😔</p>
      ) : (
        history.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#ffe4ec",
              padding: "15px",
              marginTop: "10px",
              borderRadius: "10px",
              whiteSpace: "pre-line",
            }}
          >
            {item}
          </div>
        ))
      )}

    </div>
  );
}