import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Chat from "./pages/Chat";
import UserProfile from "./pages/UserProfile";
import Exercise from "./pages/Exercise";

export default function App() {

  // Global History State
  const historyData = [];

  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN PAGE */}
        <Route path="/" element={<Login />} />

        {/* DASHBOARD PAGE */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* HISTORY PAGE */}
        <Route
          path="/history"
          element={<History history={historyData} darkMode={false} />}
        />

        {/* AI CHAT PAGE */}
        <Route path="/chat" element={<Chat />} />

        {/* USER PROFILE PAGE */}
        <Route path="/profile" element={<UserProfile />} />

        {/* EXERCISE PAGE */}
        <Route path="/exercise" element={<Exercise />} />

      </Routes>

    </BrowserRouter>
  );
}