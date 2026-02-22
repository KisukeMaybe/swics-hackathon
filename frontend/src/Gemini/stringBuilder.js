async function getNextIngredient(currentIngredient, usedIngredients=[]) {
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

  return response.text.trim();
}