import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, RotateCcw, ChefHat } from "lucide-react";
import { SwipeCard } from "./components/SwipeCard";
import { MealSummary } from "./components/MealSummary";
import { MealSuggestion } from "./components/MealSuggestion";

const INGREDIENTS = [
  {
    id: 1,
    name: "Tomatoes",
    category: "Vegetable",
    image: "https://images.unsplash.com/photo-1560433802-62c9db426a4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHRvbWF0b2VzJTIwdmVnZXRhYmxlfGVufDF8fHx8MTc3MTc1OTg0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    calories: 22,
  },
  {
    id: 2,
    name: "Chicken Breast",
    category: "Protein",
    image: "https://images.unsplash.com/photo-1633096013004-e2cb4023b560?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwYnJlYXN0JTIwbWVhdHxlbnwxfHx8fDE3NzE3MjUzMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    calories: 165,
  },
  {
    id: 3,
    name: "Lettuce",
    category: "Vegetable",
    image: "https://images.unsplash.com/photo-1741515042603-70545daeb0c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGxldHR1Y2UlMjBncmVlbnN8ZW58MXx8fHwxNzcxNzU5ODQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    calories: 5,
  },
  {
    id: 4,
    name: "Avocado",
    category: "Fruit",
    image: "https://images.unsplash.com/photo-1758279745324-ff5ed34200a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdm9jYWRvJTIwaGFsZnxlbnwxfHx8fDE3NzE3NTk4NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    calories: 240,
  },
  {
    id: 5,
    name: "Cheese",
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1757857755327-5b38c51a0302?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVlc2UlMjBibG9ja3xlbnwxfHx8fDE3NzE2OTI5OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    calories: 113,
  },
  {
    id: 6,
    name: "Pasta",
    category: "Carbs",
    image: "https://images.unsplash.com/photo-1751182471056-ecd29a41f339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMG5vb2RsZXMlMjBkcnl8ZW58MXx8fHwxNzcxNzU5ODQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    calories: 131,
  },
  {
    id: 7,
    name: "Bell Peppers",
    category: "Vegetable",
    image: "https://images.unsplash.com/photo-1509377244-b9820f59c12f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWxsJTIwcGVwcGVycyUyMGNvbG9yZnVsfGVufDF8fHx8MTc3MTc1OTg0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    calories: 31,
  },
  {
    id: 8,
    name: "Salmon",
    category: "Protein",
    image: "https://images.unsplash.com/photo-1600186321656-eaffd828d536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbG1vbiUyMGZpc2h8ZW58MXx8fHwxNzcxNzQ3NDE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    calories: 206,
  },
  {
    id: 9,
    name: "Onion",
    category: "Vegetable",
    image: "https://images.unsplash.com/photo-1759421278111-739eebcb6c76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmlvbiUyMGJ1bGJzfGVufDF8fHx8MTc3MTc1OTg0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    calories: 40,
  },
  {
    id: 10,
    name: "Garlic",
    category: "Seasoning",
    image: "https://images.unsplash.com/photo-1638521476152-d0a01eaa1207?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJsaWMlMjBjbG92ZXN8ZW58MXx8fHwxNzcxNzU5ODQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    calories: 4,
  },
  {
    id: 11,
    name: "Mushrooms",
    category: "Vegetable",
    image: "https://images.unsplash.com/photo-1552825897-bb5efa86eab1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG11c2hyb29tc3xlbnwxfHx8fDE3NzE3NTk4NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    calories: 22,
  },
  {
    id: 12,
    name: "Rice",
    category: "Carbs",
    image: "https://images.unsplash.com/photo-1743674452796-ad8d0cf38005?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwZ3JhaW5zJTIwd2hpdGV8ZW58MXx8fHwxNzcxNzU5ODQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    calories: 130,
  },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [exitDirection, setExitDirection] = useState(null);

  const currentIngredient = INGREDIENTS[currentIndex];
  const isFinished = currentIndex >= INGREDIENTS.length;

  const handleSwipe = (direction) => {
    setExitDirection(direction);
    
    if (direction === "right") {
      setSelectedIngredients((prev) => [...prev, currentIngredient]);
    }
    
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setExitDirection(null);
    }, 300);
  };

  const handleButtonClick = (direction) => {
    if (!isFinished) {
      handleSwipe(direction);
    }
  };

  const handleRemoveIngredient = (id) => {
    setSelectedIngredients((prev) => prev.filter((ing) => ing.id !== id));
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedIngredients([]);
    setExitDirection(null);
  };

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
      <div className="relative w-full max-w-sm h-[400px] mb-8">
        <AnimatePresence>
          {!isFinished && currentIngredient && (
            <motion.div
              key={currentIngredient.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{
                x: exitDirection === "left" ? -300 : exitDirection === "right" ? 300 : 0,
                opacity: 0,
                transition: { duration: 0.3 },
              }}
            >
              <SwipeCard
                ingredient={currentIngredient}
                onSwipe={handleSwipe}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next card preview */}
        {!isFinished && INGREDIENTS[currentIndex + 1] && (
          <div className="absolute w-full max-w-sm" style={{ zIndex: -1 }}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden opacity-50 scale-95">
              <div className="h-96 bg-gray-200" />
            </div>
          </div>
        )}

        {/* Finished State */}
        {isFinished && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl mb-2">All Done!</h2>
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

      {/* Action Buttons */}
      {!isFinished && (
        <div className="flex items-center gap-6 mb-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleButtonClick("left")}
            className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
          >
            <X className="w-8 h-8" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleReset}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleButtonClick("right")}
            className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-green-500 hover:bg-green-50 transition-colors"
          >
            <Heart className="w-8 h-8" fill="currentColor" />
          </motion.button>
        </div>
      )}

      {/* Progress Indicator */}
      {!isFinished && (
        <div className="mb-8 text-center">
          <p className="text-sm text-gray-600">
            {currentIndex + 1} / {INGREDIENTS.length}
          </p>
          <div className="w-64 h-2 bg-white rounded-full overflow-hidden mt-2">
            <motion.div
              className="h-full bg-orange-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / INGREDIENTS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
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
