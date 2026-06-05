import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  const [dietPlan, setDietPlan] = useState("");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState("");

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [dietLevel, setDietLevel] = useState("");

  const [history, setHistory] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [editedPlan, setEditedPlan] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  // 🍽️ GENERATE DIET PLAN
  const generatePlan = () => {

    localStorage.setItem("age", age);
    localStorage.setItem("gender", gender);
    localStorage.setItem("height", height);
    localStorage.setItem("weight", weight);
    localStorage.setItem("dietLevel", dietLevel);

    if (!age || !gender || !dietLevel) {
      alert("Please fill all fields");
      return;
    }

    let plan = "";

    if (dietLevel === "Low") {
      plan =
        "Breakfast: Oats & Banana 🍌\n" +
        "Lunch: Salad 🥗\n" +
        "Dinner: Soup 🍲";
    }

    else if (dietLevel === "Medium") {
      plan =
        "Breakfast: Eggs & Milk 🥚\n" +
        "Lunch: Chicken Salad 🍗\n" +
        "Dinner: Rice & Vegetables 🍚";
    }

    else {
      plan =
        "Breakfast: Peanut Butter Toast 🥪\n" +
        "Lunch: Beef Steak 🥩\n" +
        "Dinner: Pasta 🍝";
    }

    if (gender === "Female") {
      plan += "\n\nExtra Tip 💖: Iron-rich foods use karo.";
    }

    if (age < 18) {
      plan += "\n\nGrowth Diet 🌱: More milk and fruits.";
    }

    setDietPlan(plan);
    setEditedPlan(plan);

    const updatedHistory = [...history, plan];
    setHistory(updatedHistory);

    localStorage.setItem("dietHistory", JSON.stringify(updatedHistory));

    // ✅ BACKEND SAVE API (NEW ADD)
    fetch("http://localhost:5000/saveDiet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        age,
        gender,
        height,
        weight,
        dietLevel,
        dietPlan: plan,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Saved to DB:", data);
      })
      .catch((err) => {
        console.error("Save error:", err);
      });
  };

  // 📏 BMI CALCULATOR
  const calculateBMI = () => {

    if (!height || !weight) {
      alert("Please enter height and weight");
      return;
    }

    const h = height / 100;
    const result = (weight / (h * h)).toFixed(1);

    let status = "";

    if (result < 18.5) status = "Underweight 😔";
    else if (result < 25) status = "Normal Weight ✅";
    else status = "Overweight ⚠️";

    setBMI(`Your BMI is ${result} (${status})`);
  };

  return (
    <div
      style={{
        display: "flex",
        background: darkMode ? "#1e1e1e" : "#fff0f5",
        minHeight: "100vh",
      }}
    >

      {/* SIDEBAR */}
      <div
        style={{
          width: "220px",
          background: darkMode ? "#2c2c2c" : "white",
          padding: "20px",
          borderRadius: "0 20px 20px 0",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          color: darkMode ? "white" : "black",
        }}
      >
        <h2 style={{ color: "hotpink", textAlign: "center" }}>
          💖 FitAI
        </h2>

        <button onClick={() => navigate("/")} style={btnStyle}>
          🏠 Dashboard
        </button>

        <button onClick={() => navigate("/chat")} style={btnStyle}>
          🤖 AI Chat
        </button>

        <button onClick={() => navigate("/history")} style={btnStyle}>
          📜 History
        </button>

        <button onClick={() => navigate("/exercise")} style={btnStyle}>
          🏋️ Exercise
        </button>

        <button onClick={() => navigate("/profile")} style={btnStyle}>
          👤 Profile
        </button>

        <button onClick={() => navigate("/")} style={logoutStyle}>
          🚪 Logout
        </button>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: "40px" }}>

        <h1 style={{ textAlign: "center", color: darkMode ? "white" : "hotpink" }}>
          AI Diet Planner 💖
        </h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "10px",
            background: darkMode ? "#444" : "hotpink",
            color: "white",
            display: "block",
            margin: "0 auto",
          }}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* FORM */}
        <div style={cardStyle(darkMode)}>

          <input placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} style={inputStyle} />
          <input placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} style={inputStyle} />
          <input placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} style={inputStyle} />

          <select value={gender} onChange={(e) => setGender(e.target.value)} style={inputStyle}>
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <select value={dietLevel} onChange={(e) => setDietLevel(e.target.value)} style={inputStyle}>
            <option value="">Diet Level</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button onClick={generatePlan} style={primaryBtn}>
            Generate Diet Plan
          </button>

          <button onClick={calculateBMI} style={secondaryBtn}>
            Calculate BMI
          </button>

          <div style={resultBox}>
            <pre>{editedPlan}</pre>

            <div style={{ marginTop: "10px", color: "purple" }}>
              {bmi}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ===== Styles ===== */
const btnStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  border: "none",
  borderRadius: "10px",
  background: "#ffe4ec",
  cursor: "pointer",
};

const logoutStyle = {
  ...btnStyle,
  background: "#ffb6c1",
};

const cardStyle = (darkMode) => ({
  background: darkMode ? "#2c2c2c" : "white",
  color: darkMode ? "white" : "black",
  padding: "30px",
  borderRadius: "20px",
  maxWidth: "500px",
  margin: "30px auto",
});

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
};

const primaryBtn = {
  marginTop: "20px",
  width: "100%",
  padding: "12px",
  background: "hotpink",
  color: "white",
  border: "none",
  borderRadius: "10px",
};

const secondaryBtn = {
  marginTop: "10px",
  width: "100%",
  padding: "12px",
  background: "purple",
  color: "white",
  border: "none",
  borderRadius: "10px",
};

const resultBox = {
  marginTop: "20px",
  background: "#ffe4ec",
  padding: "20px",
  borderRadius: "15px",
};