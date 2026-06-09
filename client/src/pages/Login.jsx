import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#ffd6e7",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          width: "350px",
          textAlign: "center",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        }}
      >
        <h1 className="login-title">
          AI Diet Planner 💖
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            marginTop: "20px",
            padding: "12px",
            width: "100%",
            background: "hotpink",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}