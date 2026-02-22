// import { motion } from "framer-motion";
// import { UtensilsCrossed, Sparkles } from "lucide-react";

// // Meals with required ingredient IDs (matching INGREDIENTS in App.jsx)
// const MEAL_SUGGESTIONS = [
//   {
//     id: "caesar",
//     name: "Caesar Salad",
//     description: "Classic lettuce and cheese base. Add olive oil, lemon, and optional anchovy.",
//     ingredientIds: [3, 5], // Lettuce, Cheese
//   },
//   {
//     id: "chicken-salad",
//     name: "Grilled Chicken Salad",
//     description: "Light salad with grilled chicken, lettuce, and tomatoes.",
//     ingredientIds: [2, 3, 1], // Chicken, Lettuce, Tomatoes
//   },
//   {
//     id: "avocado-toast",
//     name: "Avocado Toast",
//     description: "Mash avocado on toast with a pinch of salt and pepper.",
//     ingredientIds: [4], // Avocado
//   },
//   {
//     id: "pasta-primavera",
//     name: "Pasta Primavera",
//     description: "Pasta with tomatoes, bell peppers, garlic, and onion.",
//     ingredientIds: [6, 1, 7, 10, 9], // Pasta, Tomatoes, Bell Peppers, Garlic, Onion
//   },
//   {
//     id: "salmon-bowl",
//     name: "Salmon Rice Bowl",
//     description: "Rice topped with salmon and avocado.",
//     ingredientIds: [8, 12, 4], // Salmon, Rice, Avocado
//   },
//   {
//     id: "stuffed-peppers",
//     name: "Stuffed Bell Peppers",
//     description: "Bell peppers stuffed with rice, cheese, tomatoes, onion, and garlic.",
//     ingredientIds: [7, 12, 5, 1, 9, 10],
//   },
//   {
//     id: "mushroom-pasta",
//     name: "Creamy Mushroom Pasta",
//     description: "Pasta with garlic mushrooms and cheese.",
//     ingredientIds: [6, 11, 10, 5], // Pasta, Mushrooms, Garlic, Cheese
//   },
//   {
//     id: "caprese",
//     name: "Caprese Style",
//     description: "Tomatoes and cheese with basil and balsamic (add basil if you have it).",
//     ingredientIds: [1, 5], // Tomatoes, Cheese
//   },
//   {
//     id: "chicken-stirfry",
//     name: "Chicken Stir Fry",
//     description: "Chicken with rice, bell peppers, onion, garlic, and mushrooms.",
//     ingredientIds: [2, 12, 7, 9, 10, 11],
//   },
//   {
//     id: "mediterranean-salad",
//     name: "Mediterranean Salad",
//     description: "Tomatoes, lettuce, avocado, and cheese with olive oil.",
//     ingredientIds: [1, 3, 4, 5],
//   },
//   {
//     id: "tomato-pasta",
//     name: "Simple Tomato Pasta",
//     description: "Pasta with garlic, onion, and tomatoes.",
//     ingredientIds: [6, 1, 10, 9],
//   },
//   {
//     id: "veggie-rice",
//     name: "Veggie Rice Bowl",
//     description: "Rice with bell peppers, onion, garlic, and mushrooms.",
//     ingredientIds: [12, 7, 9, 10, 11],
//   },
// ];

// function getSuggestedMeals(selectedIngredients) {
//   const selectedIds = new Set(selectedIngredients.map((ing) => ing.id));
//   return MEAL_SUGGESTIONS.filter((meal) =>
//     meal.ingredientIds.every((id) => selectedIds.has(id))
//   );
// }

// export function MealSuggestion({ selectedIngredients }) {
//   const suggestions = getSuggestedMeals(selectedIngredients);

//   if (selectedIngredients.length === 0) {
//     return null;
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.1 }}
//       className="w-full max-w-sm mt-6"
//     >
//       <div className="flex items-center gap-2 mb-3">
//         <Sparkles className="w-5 h-5 text-amber-500" />
//         <h3 className="text-xl font-semibold text-gray-800">Meal suggestions</h3>
//       </div>

//       {suggestions.length === 0 ? (
//         <div className="bg-white rounded-2xl shadow-xl p-6 text-center text-gray-500">
//           <UtensilsCrossed className="w-12 h-12 mx-auto mb-2 text-gray-300" />
//           <p className="text-sm">
//             No exact matches yet. Keep swiping to add more ingredients, or try
//             mixing what you have!
//           </p>
//         </div>
//       ) : (
//         <ul className="space-y-3">
//           {suggestions.map((meal, index) => (
//             <motion.li
//               key={meal.id}
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: index * 0.05 }}
//               className="bg-white rounded-2xl shadow-xl overflow-hidden"
//             >
//               <div className="p-4">
//                 <div className="flex items-start gap-3">
//                   <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
//                     <UtensilsCrossed className="w-5 h-5 text-amber-600" />
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900">{meal.name}</h4>
//                     <p className="text-sm text-gray-600 mt-0.5">
//                       {meal.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </motion.li>
//           ))}
//         </ul>
//       )}
//     </motion.div>
//   );
// }


import { useState } from "react";

export function MealSuggestion({ selectedIngredients }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateMeals = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3001/api/meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedIngredients }),
      });

      if (!res.ok) throw new Error("Meal generation failed");
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (selectedIngredients.length === 0) return null;

  return (
    <div className="w-full max-w-sm mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">Meal suggestions</h3>
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

      <div className="space-y-3">
        {meals.map((m, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-900">{m.title}</p>
                <p className="text-sm text-gray-600 mt-1">{m.description}</p>
              </div>
              <div className="text-xs text-gray-600 whitespace-nowrap">
                {m.time_minutes} min
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}