import "dotenv/config";
import express from "express";
import cors from "cors";
import { generateIngredients } from "./ingredients.js";
import { generateMeals } from "./meals.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/ingredients", async (req, res) => {
  try {
    const count = Number(req.query.count || 12);
    const data = await generateIngredients(Number.isFinite(count) ? count : 12);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/meals", async (req, res) => {
  try {
    const { selectedIngredients = [] } = req.body;
    const data = await generateMeals(selectedIngredients);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));