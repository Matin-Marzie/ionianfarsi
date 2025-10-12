import { useContext } from "react";
import LessonContext from "../../../../../../../context/LessonContext";
import { GiSoundWaves } from "react-icons/gi";

function MatchWrittenformAudioToEnglishequivalent({
    handleLeftSelect,
    handleRightSelect,
    rightSelected,
    leftSelected,
    leftSideWords,
    rightSideWords,
}) {
    const { playSound } = useContext(LessonContext);

    return (
        <div className="flex flex-grow w-full h-full">
            {/* Depict the left side words */}
            <ul className="w-6/12 flex flex-col items-center justify-center space-y-[4vh]">
                {leftSideWords.map((word) => (
                    <li className="w-10/12" key={word.id + '-left'}>
                        <button
                            // If a word is disabled, it means that it has been matched
                            className={`w-full h-full py-[3vh] border-2 border-black rounded-[18px] text-2xl 
                                ${word.disabled ? 'opacity-50 border-[1px]' : ''} 
                                ${word.id === leftSelected?.id ? 'io-selected' : ''} io-button`}
                            onClick={() => {
                                // ✅ play sound only if available (works for words & sentences)
                                if (word.audio_url) playSound(word.audio_url);
                                handleLeftSelect(word);
                            }}
                            // Disable the button when the item has been matched
                            disabled={word.disabled}
                        >
                            {/* ✅ show written_form or fallback */}
                            {word.written_form || word.english_equivalent || "—"}
                        </button>
                    </li>
                ))}
            </ul>

            {/* 📝 RIGHT SIDE (written or english equivalent) */}
            <ul className="w-6/12 flex flex-col items-center justify-center space-y-[4vh]">
                {rightSideWords.map((item) => (
                    <li className="w-10/12" key={item.id + "-right"}>
                        <button
                            className={`w-full h-full py-[3vh] border-2 border-black rounded-[18px] text-2xl
                ${item.disabled ? "opacity-50 border-[1px]" : "io-button"}
                ${item.id === rightSelected?.id ? "io-selected" : ""}`}
                            onClick={() => handleRightSelect(item)}
                            disabled={item.disabled}
                        >
                            {/* Prefer english_equivalent if available, otherwise fallback */}
                            {item.english_equivalent || item.written_form || "—"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MatchWrittenformAudioToEnglishequivalent;
