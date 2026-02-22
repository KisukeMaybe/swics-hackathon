// base_gemini_array.js
import { GoogleGenAI } from "@google/genai";

// Make sure GEMINI_API_KEY is set in your environment
const ai = new GoogleGenAI({});

async function generateHealthyBases() {
  const prompt = `
You are a nutrition-focused food assistant.

Generate exactly 10 healthy base ingredients (vegetables, fruits, whole grains, lean proteins).

Rules:
- Output must be a JSON array of 10 strings
- No explanation
- No extra text
- Only healthy ingredients

Format:
["ingredient1", "ingredient2", ..., "ingredient10"]

Output:
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  // Parse JSON array into a JS array
  const basesArray = JSON.parse(response.text);
  return basesArray;
}

// Example usage
async function main() {
  const bases = await generateHealthyBases();
  console.log(bases); // ["spinach", "quinoa", "chicken", ...]
  
  // Pick a random first ingredient
  const firstIngredient = bases[Math.floor(Math.random() * bases.length)];
  console.log("First ingredient:", firstIngredient);
}

main();