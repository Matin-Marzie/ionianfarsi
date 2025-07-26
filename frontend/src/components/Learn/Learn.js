import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Vocabulary from './Vocabulary/Vocabulary.js'
import Practice from './Practice/Practice.js'
import Grammer from './Grammer/Grammer.js'

const pageComponents = [<Vocabulary />, <Practice />, <Grammer />];

export default function Learn() {
  const [index, setIndex] = useState(1); // Start at Practice
  const [direction, setDirection] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const pointerStartX = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsFirstLoad(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = (x) => {
    pointerStartX.current = x;
  };

  const handleEnd = (x) => {
    const deltaX = x - pointerStartX.current;

    if (deltaX > 100 && index > 0) {
      setDirection(-1);
      setIndex((prev) => prev - 1);
    } else if (deltaX < -100 && index < pageComponents.length - 1) {
      setDirection(1);
      setIndex((prev) => prev + 1);
    }
  };

  const variants = {
    enter: (dir) => ({
      x: isFirstLoad ? 0 : dir > 0 ? "100vw" : "-100vw",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: isFirstLoad ? 0 : 0.5 },
    },
    exit: (dir) => ({
      x: dir < 0 ? "100vw" : "-100vw",
      opacity: 0,
    }),
  };

  return (
    <div
      className="h-full overflow-y-scroll m-auto flex w-full max-w-screen-md h-content min-h-[100dvh] bg-white text-xl"
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseUp={(e) => handleEnd(e.clientX)}
    >
      <div className="relative w-full h-full">
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: isFirstLoad ? 1 : 0.5 }}
            className="absolute inset-0 w-full h-full"
          >
            {pageComponents[index]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
