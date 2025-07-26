import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const challenges = [
  {
    id: 51,
    type: "challenge_select",
    word_written_form: "سَلام",
    word_english_equivalent: "Hello",
    word_audio_url: "https://ionianfarsi.onrender.com/audio/section-2/unit-1/word/Hello.mp3",
  },
  {
    id: 55,
    type: "challenge_select",
    word_written_form: "آب",
    word_english_equivalent: "water",
    word_audio_url: "https://ionianfarsi.onrender.com/audio/lesson-1/ab.mp3",
  },
  {
    id: 60,
    type: "challenge_select",
    word_written_form: "بادام",
    word_english_equivalent: "almond",
    word_audio_url: "https://ionianfarsi.onrender.com/audio/lesson-1/badam.mp3",
  },
];

export default function ReelsFeed() {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartY = useRef(null);

  // Prevent pull-to-refresh only when swiping down at top of scroll
  useEffect(() => {
    const preventPullToRefresh = (e) => {
      const touchY = e.touches[0].clientY;
      if (window.scrollY === 0 && touchY > touchStartY.current) {
        e.preventDefault();
      }
    };
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", preventPullToRefresh, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", preventPullToRefresh);
    };
  }, []);

  const nextChallenge = () => {
    if (index < challenges.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setIndex((prev) => prev + 1);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const handleWheel = (e) => {
    if (e.deltaY > 0) nextChallenge();
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (deltaY < -100) nextChallenge();
  };

  const currentChallenge = challenges[index];

  return (
    <div
      className="h-screen overflow-hidden bg-black text-white flex items-center justify-center w-full"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        key={currentChallenge.id}
        initial={{ y: "100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100vh", opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center h-full w-full"
      >
        <h1 className="text-4xl mb-4">{currentChallenge.word_written_form}</h1>
        <p className="text-xl mb-8">{currentChallenge.word_english_equivalent}</p>
        <audio src={currentChallenge.word_audio_url} autoPlay />
      </motion.div>
    </div>
  );
}




