import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

import connectDB from "./db.js";
import Diet from "./Diet.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// OpenAI setup
let client = null;

if (process.env.OPENAI_API_KEY) {
  client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// FREE AI
function freeAI(message) {
  const msg = message.toLowerCase();

  let reply = [];

  if (msg.includes("hello") || msg.includes("hi")) {
    reply.push("Hello 👋 I am your AI Diet Assistant.");
  }

  if (msg.includes("egg") && msg.includes("allergy")) {
    reply.push(
      "Egg allergy hai to eggs avoid karo 🥚❌. Paneer, tofu aur lentils use karo."
    );
  }

  if (msg.includes("sugar")) {
    reply.push(
      "Sugar gradually reduce karo 🍬. Fruits 🍎 aur healthy snacks use karo."
    );
  }

  if (msg.includes("weight")) {
    reply.push(
      "Weight loss ke liye walking 🚶 aur balanced diet follow karo."
    );
  }

  if (msg.includes("diet") || msg.includes("meal")) {
    reply.push(
      "Healthy meal 🍽️ = protein 🍗 + vegetables 🥗 + water 💧"
    );
  }

  if (reply.length === 0) {
    return null;
  }

  return reply.join("\n\n");
}

// REAL AI
async function realAI(msg) {
  try {
    if (!client) return null;

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: msg,
    });

    return response.output_text;
  } catch (error) {
    console.log("OpenAI Error:", error);
    return null;
  }
}

// CHAT ROUTE
app.post("/chat", async (req, res) => {
  app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
  try {
    const message = req.body.message;

    // FREE AI
    const freeReply = freeAI(message);

    if (freeReply) {
      return res.json({
        reply: freeReply,
      });
    }

    // REAL AI
    const aiReply = await realAI(message);

    if (aiReply) {
      return res.json({
        reply: aiReply,
      });
    }

    // FALLBACK
    res.json({
      reply: "AI temporarily unavailable ⚠️",
    });
  } catch (error) {
    console.log(error);

    res.json({
      reply: "System error ❌",
    });
  }
});

// ==========================
// SAVE DIET API
// ==========================
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

// START SERVER
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});