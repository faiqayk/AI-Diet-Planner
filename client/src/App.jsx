import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"; 

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Chat from "./pages/Chat";
import UserProfile from "./pages/UserProfile";
import Exercise from "./pages/Exercise";

export default function App() {
  const [historyData, setHistoryData] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Dashboard ko sirf history pass ki */}
        <Route 
          path="/dashboard" 
          element={<Dashboard history={historyData} setHistory={setHistoryData} />} 
        />

        <Route
          path="/history"
          element={<History history={historyData} darkMode={false} />}
        />

        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/exercise" element={<Exercise history={historyData} setHistory={setHistoryData} />} />
      </Routes>
    </BrowserRouter>
  );
}