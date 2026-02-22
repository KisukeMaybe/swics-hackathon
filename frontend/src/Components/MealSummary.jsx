import { motion } from "framer-motion";
import { X } from "lucide-react";

export function MealSummary({ selectedIngredients, onRemove, onReset }) {
  if (selectedIngredients.length === 0) {
    return null;
  }

  const totalCalories = selectedIngredients.reduce((sum, ing) => sum + ing.calories, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl">Your Meal</h3>
        <button
          onClick={onReset}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Reset
        </button>
      </div>

      <div className="space-y-3 mb-4">
        {selectedIngredients.map((ingredient) => (
          <motion.div
            key={ingredient.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
          >
            <img
              src={ingredient.image}
              alt={ingredient.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="text-sm">{ingredient.name}</p>
              <p className="text-xs text-gray-500">{ingredient.calories} cal</p>
            </div>
            <button
              onClick={() => onRemove(ingredient.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Calories</span>
          <span className="text-lg">{totalCalories} cal</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-600">Ingredients</span>
          <span className="text-lg">{selectedIngredients.length}</span>
        </div>
      </div>
    </motion.div>
  );
}
