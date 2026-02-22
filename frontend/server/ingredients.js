import { getGeminiClient } from "./geminiClient.js";

function extractJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("Gemini did not return JSON");
  }
  return JSON.parse(text.slice(start, end + 1));
}

function unsplashUrlFromQuery(q) {
  const safe = encodeURIComponent(String(q || "").trim() || "food");
  return `https://source.unsplash.com/featured/?${safe}`;
}

export async function generateIngredients(count = 12) {
  const ai = getGeminiClient();

  const prompt = `
Return ONLY JSON:
{
  "ingredients": [
    {
      "id": "short-unique-string",
      "name": "string",
      "category": "Protein|Vegetable|Carbs|Dairy|Fruit|Seasoning|Other",
      "calories_per_100g": number,
      "image_query": "short phrase"
    }
  ]
}

Generate exactly ${count} common grocery ingredients for quick meals.
Rules:
- Must be real common foods.
- Calories_per_100g must be realistic.
- No duplicates.
- image_query should be simple (e.g., "avocado", "chicken breast", "garlic cloves").
JSON only. No markdown.
`;

  const resp = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  const data = extractJson(resp.text);

  const ingredients = (data.ingredients || []).map((x, idx) => {
    const id = x.id || `ing-${idx}-${Math.random().toString(16).slice(2, 8)}`;
    const name = String(x.name || "").trim();
    const category = normalizeCategory(x.category);
    const calories = Number(x.calories_per_100g) || 0;
    const imageQuery = String(x.image_query || name || "food").trim();
  
    function normalizeCategory(cat) {
      const c = String(cat || "").toLowerCase().trim();
      if (c.includes("protein")) return "Protein";
      if (c.includes("veget")) return "Vegetable";
      if (c.includes("carb") || c.includes("grain") || c.includes("rice")) return "Carbs";
      if (c.includes("dairy")) return "Dairy";
      if (c.includes("fruit")) return "Fruit";
      if (c.includes("season") || c.includes("spice")) return "Seasoning";
      return "Other";
    }

    return {
      id,
      name,
      category,
      calories, // calories per 100g
      image: unsplashUrlFromQuery(imageQuery),
    };
  });

  return { ingredients };
}