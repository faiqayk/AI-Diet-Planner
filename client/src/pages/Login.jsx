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
          width: "300px",
          textAlign: "center",
        }}
      >
        <h1>AI Diet Planner</h1>

        <input
          type="email"
          placeholder="Enter Email"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
          }}
        />

        <button
          onClick={handleLogin}
  style={{
    marginTop: "20px",
    padding: "10px",
    width: "100%",
    background: "pink",
    border: "none",
    borderRadius: "10px",
  }}
>
  Login
        </button>
      </div>
    </div>
  );
}