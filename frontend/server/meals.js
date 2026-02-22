import { getGeminiClient } from "./geminiClient.js";

function extractJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("Gemini did not return JSON");
  }
  return JSON.parse(text.slice(start, end + 1));
}

export async function generateMeals(selectedIngredients) {
  const ai = getGeminiClient();

  const names = (selectedIngredients || [])
    .map((x) => x?.name)
    .filter(Boolean);

  const prompt = `
Return ONLY JSON:
{
  "meals": [
    {
      "title": "string",
      "description": "string",
      "time_minutes": number,
      "difficulty": "Easy|Medium|Hard",
      "uses": ["ingredient names used"],
      "missing": ["0-4 missing ingredients"]
    }
  ]
}

Selected ingredients: ${JSON.stringify(names)}

Generate exactly 3 quick meals (<= 30 minutes).
Keep missing items minimal and generic.
JSON only. No markdown.
`;

  const resp = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return extractJson(resp.text);
}