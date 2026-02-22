import { getGeminiClient } from "./geminiClient.js";

function extractJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("Gemini did not return JSON");
  }
  return JSON.parse(text.slice(start, end + 1));
}

function normalizeMeals(payload) {
  const rawMeals = Array.isArray(payload?.meals) ? payload.meals : [];

  return rawMeals.slice(0, 3).map((m) => {
    const title = String(m?.title || "Meal").trim();
    const description = String(m?.description || "").trim();

    const timeMinutesRaw = Number(m?.time_minutes);
    const time_minutes = Number.isFinite(timeMinutesRaw)
      ? Math.max(1, Math.min(120, Math.round(timeMinutesRaw)))
      : 15;

    const difficultyRaw = String(m?.difficulty || "Easy").trim();
    const difficulty =
      difficultyRaw === "Medium" || difficultyRaw === "Hard"
        ? difficultyRaw
        : "Easy";

    // accept either "uses" or "ingredients_used"
    const used = Array.isArray(m?.ingredients_used)
      ? m.ingredients_used
      : Array.isArray(m?.uses)
        ? m.uses
        : [];

    const ingredients_used = used
      .map((x) => String(x).trim())
      .filter(Boolean)
      .slice(0, 12);

    const missing = Array.isArray(m?.missing) ? m.missing : [];
    const missing_ingredients = missing
      .map((x) => String(x).trim())
      .filter(Boolean)
      .slice(0, 6);

    return {
      title,
      description,
      time_minutes,
      difficulty,
      ingredients_used,
      missing_ingredients,
    };
  });
}

export async function generateMeals(ingredients) {
  const ai = getGeminiClient();

  const items = Array.isArray(ingredients) ? ingredients : [];

  // The smaller payload from frontend: [{ name, category, calories }]
  const names = items
    .map((x) => String(x?.name || "").trim())
    .filter(Boolean)
    .slice(0, 25);

  if (names.length === 0) {
    return { meals: [] };
  }

  const prompt = `
Return ONLY JSON in this exact shape:

{
  "meals": [
    {
      "title": "string",
      "description": "string",
      "time_minutes": number,
      "difficulty": "Easy|Medium|Hard",
      "ingredients_used": ["ingredient names used"],
      "missing_ingredients": ["0-4 missing ingredients"]
    }
  ]
}

Selected ingredients: ${JSON.stringify(names)}

Generate exactly 3 quick meals (<= 30 minutes).
Keep missing items minimal and generic (salt, pepper, olive oil, lemon, soy sauce, etc.).
JSON only. No markdown. No extra text.
`;

  const resp = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    generationConfig: { temperature: 0.4 },
  });

  const parsed = extractJson(resp.text);
  const meals = normalizeMeals(parsed);

  return { meals };
}