import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Dashboard({ history, setHistory }) {
  const navigate = useNavigate();

  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [dietLevel, setDietLevel] = useState("");

  const [dietPlan, setDietPlan] = useState("");
  const [bmi, setBMI] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const generatePlan = () => {
    if (!age || !height || !weight || !gender || !dietLevel) {
      alert("Fill all fields");
      return;
    }

    let plan = "";

    if (dietLevel === "Low") {
      plan = "Breakfast: Oats\nLunch: Salad\nDinner: Soup";
    } else if (dietLevel === "Medium") {
      plan = "Breakfast: Eggs\nLunch: Chicken\nDinner: Rice";
    } else {
      plan = "Breakfast: Toast\nLunch: Steak\nDinner: Pasta";
    }

    setDietPlan(plan);

    // 🚨 Safe LocalStorage Saving
    localStorage.setItem("age", age);
    localStorage.setItem("gender", gender);
    localStorage.setItem("height", height);
    localStorage.setItem("weight", weight);
    localStorage.setItem("dietLevel", dietLevel);

    if (setHistory) {
      const newHistoryItem = {
        type: "Diet Plan Generated",
        age: age,
        gender: gender,
        dietLevel: dietLevel,
        result: plan,
        date: new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString()
      };
      setHistory([...history, newHistoryItem]);
    }
  };

  const calculateBMI = () => {
    if (!height || !weight) {
      alert("Please enter height and weight first");
      return;
    }

    const h = height / 100;
    const result = (weight / (h * h)).toFixed(1);

    let status = "";
    if (result < 18.5) status = "Underweight";
    else if (result < 25) status = "Normal";
    else status = "Overweight";

    const finalBmi = `${result} (${status})`;
    setBMI(finalBmi);

    if (setHistory) {
      const newHistoryItem = {
        type: "BMI Calculated",
        age: age || "N/A",
        gender: gender || "N/A",
        dietLevel: dietLevel || "N/A",
        result: `BMI: ${finalBmi}`,
        date: new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString()
      };
      setHistory([...history, newHistoryItem]);
    }
  };

  return (
    <div className={`dashboard ${darkMode ? "dark" : ""}`}>
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>💖 FitAI</h2>
        <button onClick={() => navigate("/dashboard")}>🏠 Dashboard</button>
        <button onClick={() => navigate("/chat")}>🤖 AI Chat</button>
        <button onClick={() => navigate("/history")}>📜 History</button>
        <button onClick={() => navigate("/exercise")}>🏋️ Exercise</button>
        <button onClick={() => navigate("/profile")}>👤 Profile</button>
        <button onClick={() => navigate("/")}>🚪 Logout</button>
      </div>

      {/* MAIN */}
      <div className="main">
        <h1>AI Diet Planner</h1>

        <button className="modeBtn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <div className="card">
          <input placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
          <input placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} />
          <input placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />

          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <select value={dietLevel} onChange={(e) => setDietLevel(e.target.value)}>
            <option value="">Diet Level</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button onClick={generatePlan}>Generate Plan</button>
          <button onClick={calculateBMI}>Calculate BMI</button>

          <div className="result">
            <pre>{dietPlan}</pre>
            <p>{bmi}</p>
          </div>
        </div>
      </div>
    </div>
  );
}