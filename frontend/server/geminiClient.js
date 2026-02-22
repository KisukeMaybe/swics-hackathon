import { GoogleGenAI } from "@google/genai";

export function getGeminiClient() {
  // Uses GEMINI_API_KEY from environment automatically.
  return new GoogleGenAI({});
}