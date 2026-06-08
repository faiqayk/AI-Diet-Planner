import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

import connectDB from "./db.js";
import Diet from "./Diet.js";

dotenv.config();

// ======================
// DEBUG ENV
// ======================
console.log("API KEY:", process.env.OPENAI_API_KEY ? "YES" : "NO");

// ======================
// DB CONNECTION (SAFE)
// ======================
connectDB()
  .then(() => console.log("DB Connected"))
  .catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
    console.log("⚠️ Server will still run without DB");
  });

// ======================
// APP INIT
// ======================
const app = express();

app.use(cors());
app.use(express.json());

// ======================
// ROOT ROUTE
// ======================
app.get("/", (req, res) => {
  res.send("AI Diet Planner Backend Running ✅");
});

// ======================
// OPENAI CLIENT
// ======================
const client = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

// ======================
// FREE AI (RULE BASED)
// ======================
function freeAI(message) {
  const msg = message.toLowerCase();
  let reply = [];

  if (msg.includes("hello") || msg.includes("hi")) {
    reply.push("Hello 👋 I am your AI Diet Assistant.");
  }

  if (msg.includes("sugar")) {
    reply.push("Sugar reduce karo 🍬 aur fruits use karo 🍎");
  }

  if (msg.includes("weight")) {
    reply.push("Walk 🚶 + balanced diet 🍽️ follow karo");
  }

  if (msg.includes("diet") || msg.includes("meal")) {
    reply.push("Healthy meal = protein + veggies + water 💧");
  }

  return reply.length ? reply.join("\n\n") : null;
}

// ======================
// REAL AI (OPENAI SAFE)
// ======================
async function realAI(msg) {
  try {
    if (!client) {
      console.log("❌ OpenAI client not initialized");
      return null;
    }

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: msg,
    });

    console.log("✅ OpenAI response received");

    let text = "";

    if (response?.output?.length) {
      for (const item of response.output) {
        for (const c of item.content || []) {
          if (c.text) text += c.text;
        }
      }
    }

    return text || null;

  } catch (error) {
    console.log("❌ OpenAI Error:", error.message);
    return null;
  }
}

// ======================
// CHAT API
// ======================
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    // 1. FREE AI FIRST
    const freeReply = freeAI(message);
    if (freeReply) {
      return res.json({ reply: freeReply });
    }

    // 2. REAL AI
    const aiReply = await realAI(message);

    if (aiReply) {
      return res.json({ reply: aiReply });
    }

    // 3. FALLBACK
    return res.json({
      reply: "AI temporarily unavailable ⚠️",
    });

  } catch (error) {
    console.log("Chat Error:", error.message);
    res.json({ reply: "System error ❌" });
  }
});

// ======================
// SAVE DIET API
// ======================
app.post("/saveDiet", async (req, res) => {
  try {
    const newDiet = new Diet(req.body);
    await newDiet.save();

    res.json({
      success: true,
      message: "Diet Saved Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});