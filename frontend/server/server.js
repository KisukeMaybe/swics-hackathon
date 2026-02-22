import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({}); // uses GEMINI_API_KEY env var

function extractJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON found");
  return JSON.parse(text.slice(start, end + 1));
}

app.post("/api/meals", async (req, res) => {
  try {
    const selected = (req.body.selectedIngredients || []).map((x) => x.name);

    const prompt = `
Return ONLY JSON:
{
  "meals": [
    { "title": "string", "description": "string", "time_minutes": number }
  ]
}

Selected ingredients: ${JSON.stringify(selected)}

Generate exactly 3 quick meals (<= 30 minutes).
No extra text. No markdown. JSON only.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const data = extractJson(response.text);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3001, () => console.log("Gemini API server on http://localhost:3001"));