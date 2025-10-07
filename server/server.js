import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.GEMINI_API_KEY;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(API_KEY);

// ✅ Route to test API connection
app.get("/test", async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Say 'Gemini API connected successfully!'");
    res.json({ message: result.response.text() });
  } catch (error) {
    console.error("Gemini API Test Error:", error);
    res.status(500).json({ error: "Gemini API test failed. Check your key or model name." });
  }
});

// ✅ Main generation route
app.post("/api/generate", async (req, res) => {
  try {
    const { type, payload } = req.body;

    // Use Gemini 1.5 Flash (fast and suitable for quizzes)
// CORRECT
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    let prompt = "";

    if (type === "quiz") {
      const { topic } = payload;
      prompt = `You are a helpful quiz generator. Create 5 multiple-choice questions on the topic "${topic}". 
      Return ONLY valid JSON array format:
      [
        {"question": "", "options": ["A","B","C","D"], "correctAnswer": ""}
      ]`;
    } 
    else if (type === "feedback") {
      const { topic, score } = payload;
      prompt = `You are a friendly tutor. A student scored ${score}/5 on a quiz about "${topic}".
      Write a short, encouraging feedback paragraph.`;
    } 
    else {
      return res.status(400).json({ error: "Invalid request type" });
    }

    // Call Gemini
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    if (type === "quiz") {
      // Remove code block formatting if Gemini adds it
      const cleanText = text.replace(/```json|```/g, "").trim();
      const quizData = JSON.parse(cleanText);
      res.json(quizData);
    } else {
      res.json({ feedback: text });
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Failed to generate content from Gemini API." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port: ${PORT}`);
});
