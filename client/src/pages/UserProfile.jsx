import { useNavigate } from "react-router-dom";

export default function UserProfile() {

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
          maxWidth: "500px",
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
          👤 User Profile
        </h1>

        <p><strong>Age:</strong> {localStorage.getItem("age") || "Not entered"}</p>
        <p><strong>Gender:</strong> {localStorage.getItem("gender") || "Not selected"}</p>
        <p><strong>Height:</strong> {localStorage.getItem("height") || "0"} cm</p>
        <p><strong>Weight:</strong> {localStorage.getItem("weight") || "0"} kg</p>
        <p><strong>Diet Level:</strong> {localStorage.getItem("dietLevel") || "Not selected"}</p>
      </div>
    </div>
  );
}