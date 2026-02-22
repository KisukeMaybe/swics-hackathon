import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, UtensilsCrossed } from "lucide-react";

const API_BASE = "http://localhost:3001";

export function MealSuggestion({ selectedIngredients }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Send only what the server needs (smaller + safer for rate limits)
  const payload = useMemo(() => {
    return {
      ingredients: selectedIngredients.map((i) => ({
        name: i.name,
        category: i.category,
        calories: i.calories,
      })),
    };
  }, [selectedIngredients]);

  // If user changes ingredients, clear old results
  useEffect(() => {
    setMeals([]);
    setError("");
    setLoading(false);
  }, [payload]);

  const generateMeals = async () => {
    if (!payload.ingredients.length) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/meals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Meal generation failed");
      }

      setMeals(Array.isArray(data.meals) ? data.meals : []);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (selectedIngredients.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm mt-6"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-semibold text-gray-900">
            Meal suggestions
          </h3>
        </div>

        <button
          onClick={generateMeals}
          disabled={loading}
          className="px-3 py-2 rounded-lg bg-orange-500 text-white text-sm disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate with Gemini"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm mb-3">
          {error}
        </div>
      )}

      {!loading && meals.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center text-gray-500">
          <UtensilsCrossed className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">
            Click “Generate with Gemini” to get meal ideas from your selected
            ingredients.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {meals.map((m, idx) => (
            <motion.li
              key={`${m.title || "meal"}-${idx}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {m.title || "Meal"}
                    </p>
                    {m.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {m.description}
                      </p>
                    )}
                    {Array.isArray(m.ingredients_used) &&
                      m.ingredients_used.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {m.ingredients_used.slice(0, 8).map((t) => (
                            <span
                              key={t}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>

                  {Number.isFinite(m.time_minutes) && (
                    <div className="text-xs text-gray-600 whitespace-nowrap">
                      {m.time_minutes} min
                    </div>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}