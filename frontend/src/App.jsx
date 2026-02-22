import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, RotateCcw, ChefHat } from "lucide-react";
import { SwipeCard } from "./components/SwipeCard";
import { MealSummary } from "./components/MealSummary";
import { MealSuggestion } from "./components/MealSuggestion";

/**
 * Categories requested:
 * fruits, veg, meat, dairy, carbs, protein
 *
 * Calories are approx per 100g (good enough for demo).
 * Images use Unsplash Source (no API key needed).
 */
const INGREDIENTS = [
  // Fruits
  {
    id: "fruit-apple",
    name: "Apple",
    category: "Fruit",
    calories: 52,
    image: "https://source.unsplash.com/featured/?apple,fruit",
  },
  {
    id: "fruit-banana",
    name: "Banana",
    category: "Fruit",
    calories: 89,
    image: "https://source.unsplash.com/featured/?banana,fruit",
  },
  {
    id: "fruit-avocado",
    name: "Avocado",
    category: "Fruit",
    calories: 160,
    image: "https://source.unsplash.com/featured/?avocado",
  },
  {
    id: "fruit-orange",
    name: "Orange",
    category: "Fruit",
    calories: 47,
    image: "https://source.unsplash.com/featured/?orange,fruit",
  },
  {
    id: "fruit-strawberries",
    name: "Strawberries",
    category: "Fruit",
    calories: 32,
    image: "https://source.unsplash.com/featured/?strawberries",
  },
  {
    id: "fruit-blueberries",
    name: "Blueberries",
    category: "Fruit",
    calories: 57,
    image: "https://source.unsplash.com/featured/?blueberries",
  },

  // Veg
  {
    id: "veg-tomatoes",
    name: "Tomatoes",
    category: "Veg",
    calories: 18,
    image: "https://source.unsplash.com/featured/?tomatoes",
  },
  {
    id: "veg-lettuce",
    name: "Lettuce",
    category: "Veg",
    calories: 15,
    image: "https://source.unsplash.com/featured/?lettuce",
  },
  {
    id: "veg-onion",
    name: "Onion",
    category: "Veg",
    calories: 40,
    image: "https://source.unsplash.com/featured/?onion",
  },
  {
    id: "veg-garlic",
    name: "Garlic",
    category: "Veg",
    calories: 149,
    image: "https://source.unsplash.com/featured/?garlic",
  },
  {
    id: "veg-bell-pepper",
    name: "Bell Pepper",
    category: "Veg",
    calories: 31,
    image: "https://source.unsplash.com/featured/?bell-pepper",
  },
  {
    id: "veg-cucumber",
    name: "Cucumber",
    category: "Veg",
    calories: 16,
    image: "https://source.unsplash.com/featured/?cucumber",
  },
  {
    id: "veg-mushrooms",
    name: "Mushrooms",
    category: "Veg",
    calories: 22,
    image: "https://source.unsplash.com/featured/?mushrooms",
  },
  {
    id: "veg-broccoli",
    name: "Broccoli",
    category: "Veg",
    calories: 34,
    image: "https://source.unsplash.com/featured/?broccoli",
  },
  {
    id: "veg-spinach",
    name: "Spinach",
    category: "Veg",
    calories: 23,
    image: "https://source.unsplash.com/featured/?spinach",
  },
  {
    id: "veg-carrot",
    name: "Carrot",
    category: "Veg",
    calories: 41,
    image: "https://source.unsplash.com/featured/?carrot",
  },

  // Meat
  {
    id: "meat-chicken-breast",
    name: "Chicken Breast",
    category: "Meat",
    calories: 165,
    image: "https://source.unsplash.com/featured/?chicken-breast",
  },
  {
    id: "meat-beef",
    name: "Beef (Lean)",
    category: "Meat",
    calories: 250,
    image: "https://source.unsplash.com/featured/?beef",
  },
  {
    id: "meat-turkey",
    name: "Turkey",
    category: "Meat",
    calories: 135,
    image: "https://source.unsplash.com/featured/?turkey,meat",
  },
  {
    id: "meat-salmon",
    name: "Salmon",
    category: "Meat",
    calories: 208,
    image: "https://source.unsplash.com/featured/?salmon",
  },
  {
    id: "meat-tuna",
    name: "Tuna",
    category: "Meat",
    calories: 132,
    image: "https://source.unsplash.com/featured/?tuna",
  },

  // Dairy
  {
    id: "dairy-milk",
    name: "Milk",
    category: "Dairy",
    calories: 42,
    image: "https://source.unsplash.com/featured/?milk",
  },
  {
    id: "dairy-greek-yogurt",
    name: "Greek Yogurt",
    category: "Dairy",
    calories: 59,
    image: "https://source.unsplash.com/featured/?greek-yogurt",
  },
  {
    id: "dairy-cheese",
    name: "Cheese",
    category: "Dairy",
    calories: 402,
    image: "https://source.unsplash.com/featured/?cheese",
  },
  {
    id: "dairy-mozzarella",
    name: "Mozzarella",
    category: "Dairy",
    calories: 280,
    image: "https://source.unsplash.com/featured/?mozzarella",
  },

  // Carbs
  {
    id: "carbs-rice",
    name: "Rice",
    category: "Carbs",
    calories: 130,
    image: "https://source.unsplash.com/featured/?rice",
  },
  {
    id: "carbs-pasta",
    name: "Pasta",
    category: "Carbs",
    calories: 131,
    image: "https://source.unsplash.com/featured/?pasta",
  },
  {
    id: "carbs-bread",
    name: "Bread",
    category: "Carbs",
    calories: 265,
    image: "https://source.unsplash.com/featured/?bread",
  },
  {
    id: "carbs-oats",
    name: "Oats",
    category: "Carbs",
    calories: 389,
    image: "https://source.unsplash.com/featured/?oats",
  },
  {
    id: "carbs-potato",
    name: "Potato",
    category: "Carbs",
    calories: 77,
    image: "https://source.unsplash.com/featured/?potato",
  },
  {
    id: "carbs-tortilla",
    name: "Tortilla Wrap",
    category: "Carbs",
    calories: 310,
    image: "https://source.unsplash.com/featured/?tortilla-wrap",
  },

  // Protein (non-meat)
  {
    id: "protein-eggs",
    name: "Eggs",
    category: "Protein",
    calories: 155,
    image: "https://source.unsplash.com/featured/?eggs",
  },
  {
    id: "protein-tofu",
    name: "Tofu",
    category: "Protein",
    calories: 76,
    image: "https://source.unsplash.com/featured/?tofu",
  },
  {
    id: "protein-chickpeas",
    name: "Chickpeas",
    category: "Protein",
    calories: 164,
    image: "https://source.unsplash.com/featured/?chickpeas",
  },
  {
    id: "protein-lentils",
    name: "Lentils",
    category: "Protein",
    calories: 116,
    image: "https://source.unsplash.com/featured/?lentils",
  },
  {
    id: "protein-black-beans",
    name: "Black Beans",
    category: "Protein",
    calories: 132,
    image: "https://source.unsplash.com/featured/?black-beans",
  },
  {
    id: "protein-peanut-butter",
    name: "Peanut Butter",
    category: "Protein",
    calories: 588,
    image: "https://source.unsplash.com/featured/?peanut-butter",
  },
];

const CATEGORY_OPTIONS = [
  { key: "All", label: "All" },
  { key: "Fruit", label: "Fruits" },
  { key: "Veg", label: "Veg" },
  { key: "Meat", label: "Meat" },
  { key: "Dairy", label: "Dairy" },
  { key: "Carbs", label: "Carbs" },
  { key: "Protein", label: "Protein" },
];

function CategoryPill({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors",
        active
          ? "bg-orange-500 text-white shadow"
          : "bg-white/70 text-gray-700 hover:bg-white",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export default function App() {
  const [category, setCategory] = useState("All");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [exitDirection, setExitDirection] = useState(null);

  const filteredIngredients = useMemo(() => {
    if (category === "All") return INGREDIENTS;
    return INGREDIENTS.filter((i) => i.category === category);
  }, [category]);

  const currentIngredient = filteredIngredients[currentIndex];
  const isFinished = currentIndex >= filteredIngredients.length;

  const handleSwipe = (direction) => {
    if (isFinished || !currentIngredient) return;

    setExitDirection(direction);

    if (direction === "right") {
      setSelectedIngredients((prev) => {
        // prevent duplicates
        if (prev.some((x) => x.id === currentIngredient.id)) return prev;
        return [...prev, currentIngredient];
      });
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

  const handleResetDeck = () => {
    setCurrentIndex(0);
    setExitDirection(null);
  };

  const handleResetAll = () => {
    setCategory("All");
    setCurrentIndex(0);
    setSelectedIngredients([]);
    setExitDirection(null);
  };

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    setCurrentIndex(0);
    setExitDirection(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="mb-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <ChefHat className="w-7 h-7 text-orange-500" />
          <h1 className="text-3xl font-semibold text-gray-900">MealSwipe</h1>
        </div>
        <p className="text-sm text-gray-600">
          Pick a category, swipe right to add, left to skip
        </p>
      </div>

      {/* Category Selector */}
      <div className="w-full max-w-sm mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {CATEGORY_OPTIONS.map((c) => (
            <CategoryPill
              key={c.key}
              label={c.label}
              active={category === c.key}
              onClick={() => handleCategoryChange(c.key)}
            />
          ))}
        </div>

        <div className="flex items-center justify-between mt-2 text-xs text-gray-600 px-1">
          <span>
            Showing:{" "}
            <span className="font-semibold text-gray-800">{category}</span>
          </span>
          <button
            onClick={handleResetDeck}
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            Restart deck
          </button>
        </div>
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
              <h2 className="text-2xl mb-2 text-gray-900">Category done!</h2>
              <p className="text-gray-600 mb-6">
                {filteredIngredients.length > 0
                  ? "Try another category or generate meals from your picks."
                  : "No items in this category."}
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleResetDeck}
                  className="bg-gray-100 text-gray-800 px-5 py-3 rounded-full hover:bg-gray-200 transition-colors"
                >
                  Restart deck
                </button>
                <button
                  onClick={handleResetAll}
                  className="bg-orange-500 text-white px-5 py-3 rounded-full hover:bg-orange-600 transition-colors"
                >
                  Reset all
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Progress Indicator */}
      {!isFinished && filteredIngredients.length > 0 && (
        <div className="w-full max-w-sm mb-5">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-2 px-1">
            <span>Progress</span>
            <span>
              {currentIndex + 1} / {filteredIngredients.length}
            </span>
          </div>
          <div className="h-2 bg-white/70 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-orange-500"
              initial={{ width: 0 }}
              animate={{
                width: `${
                  ((currentIndex + 1) / filteredIngredients.length) * 100
                }%`,
              }}
              transition={{ duration: 0.25 }}
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {!isFinished && filteredIngredients.length > 0 && (
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
            onClick={handleResetAll}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
            title="Reset all"
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
        onReset={handleResetAll}
      />

      {/* Meal Suggestions (Gemini) */}
      <MealSuggestion selectedIngredients={selectedIngredients} />
    </div>
  );
}