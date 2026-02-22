import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, RotateCcw, ChefHat } from "lucide-react";
import { SwipeCard } from "./components/SwipeCard";
import { MealSummary } from "./components/MealSummary";
import { MealSuggestion } from "./components/MealSuggestion";

const API_BASE = "http://localhost:3001";

export default function App() {
  const [ingredients, setIngredients] = useState([]);
  const [loadingIngredients, setLoadingIngredients] = useState(true);
  const [ingredientsError, setIngredientsError] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [exitDirection, setExitDirection] = useState(null);

  const loadIngredients = async () => {
    setLoadingIngredients(true);
    setIngredientsError("");

    try {
      const res = await fetch(`${API_BASE}/api/ingredients?count=12`);
      if (!res.ok) throw new Error("Failed to fetch ingredients");
      const data = await res.json();

      setIngredients(data.ingredients || []);
      setCurrentIndex(0);
      setSelectedIngredients([]);
      setExitDirection(null);
    } catch (e) {
      setIngredientsError(e.message);
    } finally {
      setLoadingIngredients(false);
    }
  };

  useEffect(() => {
    loadIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentIngredient = ingredients[currentIndex];
  const isFinished = currentIndex >= ingredients.length;

  const handleSwipe = (direction) => {
    if (isFinished || !currentIngredient) return;

    setExitDirection(direction);

    if (direction === "right") {
      setSelectedIngredients((prev) => [...prev, currentIngredient]);
    }

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setExitDirection(null);
    }, 250);
  };

  const handleButtonClick = (direction) => {
    handleSwipe(direction);
  };

  const handleRemoveIngredient = (id) => {
    setSelectedIngredients((prev) => prev.filter((ing) => ing.id !== id));
  };

  const handleReset = async () => {
    await loadIngredients();
  };

  if (loadingIngredients) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-700">Generating ingredients...</div>
      </div>
    );
  }

  if (ingredientsError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full">
          <p className="text-gray-900 font-semibold mb-2">
            Couldn’t load ingredients
          </p>
          <p className="text-gray-600 text-sm mb-4">{ingredientsError}</p>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg"
            onClick={handleReset}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <ChefHat className="w-7 h-7 text-orange-500" />
          <h1 className="text-3xl font-semibold text-gray-900">MealSwipe</h1>
        </div>
        <p className="text-sm text-gray-600">
          Swipe right to add, left to skip
        </p>
      </div>

      {/* Card Stack Area */}
      <div className="relative w-full max-w-sm h-[400px] mb-6">
        <AnimatePresence>
          {!isFinished && currentIngredient && (
            <motion.div
              key={currentIngredient.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{
                x: exitDirection === "left" ? -320 : 320,
                opacity: 0,
                transition: { duration: 0.25 },
              }}
            >
              <SwipeCard ingredient={currentIngredient} onSwipe={handleSwipe} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Finished State */}
        {isFinished && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl mb-2 text-gray-900">All Done!</h2>
              <p className="text-gray-600 mb-6">
                {selectedIngredients.length > 0
                  ? `You've created a meal with ${selectedIngredients.length} ingredients!`
                  : "No ingredients selected. Try again?"}
              </p>
              <button
                onClick={handleReset}
                className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors flex items-center gap-2 mx-auto"
              >
                <RotateCcw className="w-5 h-5" />
                Start Over
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Progress Indicator */}
      {!isFinished && ingredients.length > 0 && (
        <div className="w-full max-w-sm mb-5">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-2 px-1">
            <span>Progress</span>
            <span>
              {currentIndex + 1} / {ingredients.length}
            </span>
          </div>
          <div className="h-2 bg-white/70 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-orange-500"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentIndex + 1) / ingredients.length) * 100}%`,
              }}
              transition={{ duration: 0.25 }}
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {!isFinished && (
        <div className="flex items-center gap-6 mb-6">
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleButtonClick("left")}
            className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
          >
            <X className="w-8 h-8" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleReset}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleButtonClick("right")}
            className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-green-500 hover:bg-green-50 transition-colors"
          >
            <Heart className="w-8 h-8" fill="currentColor" />
          </motion.button>
        </div>
      )}

      {/* Meal Summary */}
      <MealSummary
        selectedIngredients={selectedIngredients}
        onRemove={handleRemoveIngredient}
        onReset={handleReset}
      />

      {/* Meal Suggestions */}
      <MealSuggestion selectedIngredients={selectedIngredients} />
    </div>
  );
}