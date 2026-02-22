import express from "express";
import cors from "cors";
import "dotenv/config";
import { generateMeals } from "./meals.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json({ limit: "1mb" }));

app.use(
  cors({
    origin: true, // fine for hackathon; tighten later
  })
);

// Optional request logger (useful for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// ---- Meals endpoint (Gemini) ----
// Expects payload:
// { ingredients: [{ name, category, calories }] }
app.post("/api/meals", async (req, res) => {
  try {
    const ingredients = Array.isArray(req.body.ingredients)
      ? req.body.ingredients
      : [];

    if (ingredients.length === 0) {
      return res.status(400).json({
        error: "No ingredients provided. Send { ingredients: [...] }",
      });
    }

    const result = await generateMeals(ingredients);

    // result can be { meals: [...] } or just [...]
    const meals = Array.isArray(result) ? result : result.meals;

    res.json({ meals: Array.isArray(meals) ? meals : [] });
  } catch (e) {
    const msg = e?.message || "Meal generation failed";

    // If Gemini is rate-limiting/quota limiting you, return 429 (so UI can say retry)
    const isQuota =
      msg.includes("RESOURCE_EXHAUSTED") ||
      msg.includes("Quota exceeded") ||
      msg.includes("429");

    res.status(isQuota ? 429 : 500).json({ error: msg });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Has GEMINI_API_KEY:", Boolean(process.env.GEMINI_API_KEY));
});