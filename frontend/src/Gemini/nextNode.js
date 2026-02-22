// nextNode.js
import { GoogleGenAI } from "@google/genai";

// Make sure GEMINI_API_KEY is set
const ai = new GoogleGenAI({});

/**
 * Generate the next complementary ingredient for a given ingredient.
 * @param {string} currentIngredient - The ingredient to pair with.
 * @param {string[]} usedIngredients - Array of ingredients already used.
 * @returns {Promise<string>} - Next complementary ingredient.
 */
export async function getNextIngredient(currentIngredient, usedIngredients = []) {
  const prompt = `
You are a food pairing assistant.

Given an ingredient, return exactly ONE complementary ingredient that pairs well with it.

Rules:
- Output must be a single ingredient
- No sentences
- No punctuation
- No extra words
- Avoid duplicates: [${usedIngredients.map(i => `"${i}"`).join(", ")}]

Ingredient: ${currentIngredient}
Output:
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    generationConfig: { temperature: 0.2 },
  });

  // Clean up the response
  return response.text.trim();
}

// Example usage
async function demo() {
  const used = ["Spinach", "Blueberries"];
  const next = await getNextIngredient("Quinoa", used);
  console.log("Next ingredient:", next);
}

demo();