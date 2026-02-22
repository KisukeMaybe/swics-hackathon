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
 * Images use direct images.unsplash.com URLs (more reliable than source.unsplash.com).
 */
function unsplash(photoId) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=900&q=80`;
}

const INGREDIENTS = [
  // Fruits
  {
    id: "fruit-apple",
    name: "Apple",
    category: "Fruit",
    calories: 52,
    image: unsplash("photo-1560806887-1e4cd0b6cbd6"),
  },
  {
    id: "fruit-banana",
    name: "Banana",
    category: "Fruit",
    calories: 89,
    image: unsplash("photo-1571771894821-ce9b6c11b08e"),
  },
  {
    id: "fruit-avocado",
    name: "Avocado",
    category: "Fruit",
    calories: 160,
    image: unsplash("photo-1523049673857-eb18f1d7b578"),
  },
  {
    id: "fruit-orange",
    name: "Orange",
    category: "Fruit",
    calories: 47,
    image: unsplash("photo-1547514701-42782101795e"),
  },
  {
    id: "fruit-strawberries",
    name: "Strawberries",
    category: "Fruit",
    calories: 32,
    image: unsplash("photo-1464965911861-746a04b4bca6"),
  },
  {
    id: "fruit-blueberries",
    name: "Blueberries",
    category: "Fruit",
    calories: 57,
    image: unsplash("photo-1464965911861-746a04b4bca6"),
  },

  // Veg
  {
    id: "veg-tomatoes",
    name: "Tomatoes",
    category: "Veg",
    calories: 18,
    image: unsplash("photo-1560433802-62c9db426a4d"),
  },
  {
    id: "veg-lettuce",
    name: "Lettuce",
    category: "Veg",
    calories: 15,
    image: unsplash("photo-1540420773420-3366772f4999"),
  },
  {
    id: "veg-onion",
    name: "Onion",
    category: "Veg",
    calories: 40,
    image: unsplash("photo-1518977676601-b53f82aba655"),
  },
  {
    id: "veg-garlic",
    name: "Garlic",
    category: "Veg",
    calories: 149,
    image: unsplash("photo-1638521476152-d0a01eaa1207"),
  },
  {
    id: "veg-bell-pepper",
    name: "Bell Pepper",
    category: "Veg",
    calories: 31,
    image: unsplash("photo-1509377244-b9820f59c12f"),
  },
  {
    id: "veg-cucumber",
    name: "Cucumber",
    category: "Veg",
    calories: 16,
    image: unsplash("photo-1568584711271-54f2a4b2f7b0"),
  },
  {
    id: "veg-mushrooms",
    name: "Mushrooms",
    category: "Veg",
    calories: 22,
    image: unsplash("photo-1552825897-bb5efa86eab1"),
  },
  {
    id: "veg-broccoli",
    name: "Broccoli",
    category: "Veg",
    calories: 34,
    image: unsplash("photo-1459411552884-841db9b3cc2a"),
  },
  {
    id: "veg-spinach",
    name: "Spinach",
    category: "Veg",
    calories: 23,
    image: unsplash("photo-1576045057995-568f588f82fb"),
  },
  {
    id: "veg-carrot",
    name: "Carrot",
    category: "Veg",
    calories: 41,
    image: unsplash("photo-1447175008436-054170c2e979"),
  },

  // Meat
  {
    id: "meat-chicken-breast",
    name: "Chicken Breast",
    category: "Meat",
    calories: 165,
    image: unsplash("photo-1633096013004-e2cb4023b560"),
  },
  {
    id: "meat-beef",
    name: "Beef (Lean)",
    category: "Meat",
    calories: 250,
    image: unsplash("photo-1603048297172-c92544798d5a"),
  },
  {
    id: "meat-turkey",
    name: "Turkey",
    category: "Meat",
    calories: 135,
    image: unsplash("photo-1604908554162-3c6c2f0d2ef0"),
  },
  {
    id: "meat-salmon",
    name: "Salmon",
    category: "Meat",
    calories: 208,
    image: unsplash("photo-1600186321656-eaffd828d536"),
  },
  {
    id: "meat-tuna",
    name: "Tuna",
    category: "Meat",
    calories: 132,
    image: unsplash("photo-1534766555764-ce878a5e3a2b"),
  },

  // Dairy
  {
    id: "dairy-milk",
    name: "Milk",
    category: "Dairy",
    calories: 42,
    image: unsplash("photo-1585238342028-4c5b44f1b3b8"),
  },
  {
    id: "dairy-greek-yogurt",
    name: "Greek Yogurt",
    category: "Dairy",
    calories: 59,
    image: unsplash("photo-1542444459-db63c0a2a2b2"),
  },
  {
    id: "dairy-cheese",
    name: "Cheese",
    category: "Dairy",
    calories: 402,
    image: unsplash("photo-1546443046-ed1ce6ffd1ab"),
  },
  {
    id: "dairy-mozzarella",
    name: "Mozzarella",
    category: "Dairy",
    calories: 280,
    image: unsplash("photo-1604908176997-125f25cc500f"),
  },

  // Carbs
  {
    id: "carbs-rice",
    name: "Rice",
    category: "Carbs",
    calories: 130,
    image: unsplash("photo-1604909052743-94e838986d24"),
  },
  {
    id: "carbs-pasta",
    name: "Pasta",
    category: "Carbs",
    calories: 131,
    image: unsplash("photo-1523986371872-9d3ba2e2f5f3"),
  },
  {
    id: "carbs-bread",
    name: "Bread",
    category: "Carbs",
    calories: 265,
    image: unsplash("photo-1549931319-a545dcf3bc73"),
  },
  {
    id: "carbs-oats",
    name: "Oats",
    category: "Carbs",
    calories: 389,
    image: unsplash("photo-1514996937319-344454492b37"),
  },
  {
    id: "carbs-potato",
    name: "Potato",
    category: "Carbs",
    calories: 77,
    image: unsplash("photo-1567306226416-28f0efdc88ce"),
  },
  {
    id: "carbs-tortilla",
    name: "Tortilla Wrap",
    category: "Carbs",
    calories: 310,
    image: unsplash("photo-1615870216519-2f9fa575fa5c"),
  },

  // Protein (non-meat)
  {
    id: "protein-eggs",
    name: "Eggs",
    category: "Protein",
    calories: 155,
    image: unsplash("photo-1582722872445-44dc5f7e3c8f"),
  },
  {
    id: "protein-tofu",
    name: "Tofu",
    category: "Protein",
    calories: 76,
    image: unsplash("photo-1546069901-ba9599a7e63c"),
  },
  {
    id: "protein-chickpeas",
    name: "Chickpeas",
    category: "Protein",
    calories: 164,
    image: unsplash("photo-1604908177522-0403d2e8c3d6"),
  },
  {
    id: "protein-lentils",
    name: "Lentils",
    category: "Protein",
    calories: 116,
    image: unsplash("photo-1589927986089-35812388d1f4"),
  },
  {
    id: "protein-black-beans",
    name: "Black Beans",
    category: "Protein",
    calories: 132,
    image: unsplash("photo-1604908554275-0f3b41b1c18d"),
  },
  {
    id: "protein-peanut-butter",
    name: "Peanut Butter",
    category: "Protein",
    calories: 588,
    image: unsplash("photo-1585238342028-4c5b44f1b3b8"),
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