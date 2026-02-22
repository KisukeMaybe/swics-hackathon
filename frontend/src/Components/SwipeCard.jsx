import { motion, useMotionValue, useTransform } from "framer-motion";
import { X, Heart } from "lucide-react";

export function SwipeCard({ ingredient, onSwipe, style }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (_, info) => {
    if (Math.abs(info.offset.x) > 100) {
      const direction = info.offset.x > 0 ? "right" : "left";
      onSwipe(direction);
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{
        x,
        rotate,
        opacity,
        ...style,
      }}
      onDragEnd={handleDragEnd}
      className="absolute w-full max-w-sm cursor-grab active:cursor-grabbing"
    >
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="relative h-96">
          <img
            src={ingredient.image}
            alt={ingredient.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Swipe indicators */}
          <motion.div
            style={{
              opacity: useTransform(x, [0, 100], [0, 1]),
            }}
            className="absolute top-8 right-8 bg-green-500 text-white px-6 py-3 rounded-full rotate-12 border-4 border-white"
          >
            <Heart className="w-8 h-8" fill="currentColor" />
          </motion.div>
          
          <motion.div
            style={{
              opacity: useTransform(x, [-100, 0], [1, 0]),
            }}
            className="absolute top-8 left-8 bg-red-500 text-white px-6 py-3 rounded-full -rotate-12 border-4 border-white"
          >
            <X className="w-8 h-8" />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-3xl mb-2">{ingredient.name}</h2>
            <div className="flex items-center gap-4">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                {ingredient.category}
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                {ingredient.calories} cal
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
