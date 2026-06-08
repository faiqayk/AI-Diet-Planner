import { useState } from "react";

export default function Chat() {

  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {

    if (message.trim() === "") {
      alert("Please enter a question");
      return;
    }

    setLoading(true);

    setReply("AI is thinking... 🤖");

    try {
  const res = await fetch("https://ai-diet-planner-production-9040.up.railway.app/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: message,
    }),
  });

      const data = await res.json();

      setReply(data.reply);

    } catch (error) {

      console.log(error);

      setReply("❌ Error connecting to server");
    }

    setLoading(false);
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#fff0f5",
        padding: "40px",
      }}
    >

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >

        <h1
          style={{
            textAlign: "center",
            color: "hotpink",
          }}
        >
          AI Chatbot 🤖
        </h1>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask diet question..."
          style={{
            width: "100%",
            height: "140px",
            marginTop: "20px",
            padding: "10px",
          }}
        />

        <button
          onClick={askAI}
          disabled={loading}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "12px",
            background: loading ? "gray" : "hotpink",
            color: "white",
            border: "none",
            borderRadius: "10px",
          }}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        <div
          style={{
            marginTop: "20px",
            background: "#ffe4ec",
            padding: "20px",
            borderRadius: "15px",
            color: "black",
            whiteSpace: "pre-line",
          }}
        >
          {reply}
        </div>

      </div>

    </div>
  );
}