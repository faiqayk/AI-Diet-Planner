import { useNavigate } from "react-router-dom";

export default function Exercise() {

  const navigate = useNavigate();

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#fff0f5",
        padding: "40px",
      }}
    >

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          padding: "10px 20px",
          background: "hotpink",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        ⬅ Back
      </button>

      <div
        style={{
          maxWidth: "700px",
          margin: "30px auto",
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >

        <h1
          style={{
            textAlign: "center",
            color: "hotpink",
          }}
        >
          🏋️ Exercise Suggestions
        </h1>

        <div style={{ marginTop: "25px" }}>

          <h3>🚶 Beginner Level</h3>
          <ul>
            <li>15 min Walking</li>
            <li>10 Squats</li>
            <li>10 Jumping Jacks</li>
            <li>5 Push-ups</li>
          </ul>

          <h3>🏃 Intermediate Level</h3>
          <ul>
            <li>20 min Jogging</li>
            <li>20 Squats</li>
            <li>15 Push-ups</li>
            <li>30 sec Plank</li>
          </ul>

          <h3>💪 Advanced Level</h3>
          <ul>
            <li>30 min Running</li>
            <li>50 Squats</li>
            <li>30 Push-ups</li>
            <li>1 min Plank</li>
          </ul>

        </div>

      </div>

    </div>
  );
}