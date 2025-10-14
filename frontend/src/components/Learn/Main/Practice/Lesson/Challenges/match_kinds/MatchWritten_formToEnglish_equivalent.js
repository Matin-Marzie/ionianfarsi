import { useContext, useRef } from "react";
import LessonContext from "../../../../../../../context/LessonContext";

function MatchWritten_formToEnglish_equivalent({
  handleLeftSelect,
  handleRightSelect,
  rightSelected,
  leftSelected,
  leftSideWords,
  rightSideWords,
  matchType,
  checkMatch
}) {
  const { playSound } = useContext(LessonContext);

  // Track active touches
  const activeTouches = useRef({ left: null, right: null });

  const handleTouch = (word, side) => (e) => {
    e.preventDefault(); // prevent pinch zoom

    activeTouches.current[side] = word;

    const leftWord = activeTouches.current.left;
    const rightWord = activeTouches.current.right;

    // if both sides are touched, select both
    if (leftWord && rightWord) {
      if (leftWord.audio_url) playSound(leftWord.audio_url);
      handleLeftSelect(leftWord);
      handleRightSelect(rightWord);
      checkMatch(leftWord, rightWord);

      // reset
      activeTouches.current.left = null;
      activeTouches.current.right = null;
    }
  };

  const handleTouchEnd = (side) => () => {
    activeTouches.current[side] = null;
  };

  return (
    <div className="flex flex-row w-full h-full">
      {/* Left Side */}
      <ul className="w-6/12 flex flex-col items-center justify-center space-y-[4vh]">
        {leftSideWords.map((word) => (
          <li className="w-10/12" key={word.id + "-left"}>
            <button
              className={`w-full h-full py-[3vh] border-2 border-black rounded-[18px] text-2xl 
                ${word.disabled ? "opacity-50 border-[1px]" : ""} 
                ${word.id === leftSelected?.id ? "io-selected" : ""} io-button`}
              onClick={() => {
                if (word.audio_url) playSound(word.audio_url);
                handleLeftSelect(word);
              }}
              onTouchStart={handleTouch(word, "left")}
              onTouchEnd={handleTouchEnd("left")}
              disabled={word.disabled}
            >
              {word.written_form || word.english_equivalent || "—"}
            </button>
          </li>
        ))}
      </ul>

      {/* Right Side */}
      <ul className="w-6/12 flex flex-col items-center justify-center space-y-[4vh]">
        {rightSideWords.map((word) => (
          <li className="w-10/12" key={word.id + "-right"}>
            <button
              className={`w-full h-full py-[3vh] border-2 border-black rounded-[18px] text-2xl 
                ${word.disabled ? "opacity-50 border-[1px]" : "io-button"} 
                ${word.id === rightSelected?.id ? "io-selected" : ""}`}
              onClick={() => handleRightSelect(word)}
              onTouchStart={handleTouch(word, "right")}
              onTouchEnd={handleTouchEnd("right")}
              disabled={word.disabled}
            >
              {matchType === "writtenform_to_englishequivalent"
                ? word.english_equivalent || word.written_form || "—"
                : word.transliteration || word.written_form || "—"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MatchWritten_formToEnglish_equivalent;
