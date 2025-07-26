import { useContext } from "react";
import LessonContext from "../../../../../../context/LessonContext";
import { GiSoundWaves } from "react-icons/gi";

function MatchSoundToWritten_form({
    handleLeftSelect,
    handleRightSelect,
    rightSelected,
    leftSelected,
    leftSideWords,
    rightSideWords,
}) {

    const { playSound } = useContext(LessonContext)

    return (
        <div className="flex flex-grow w-full h-full">

            {/* Depict the left side words */}
            <ul className="w-6/12 flex flex-col items-center justify-center space-y-[4vh]">
                {leftSideWords.map((word) => (
                    <li className="w-10/12" key={word.id + '-left'}>
                        <button
                            // If a word is disabled, it means that it has been matched
                            className={`w-full h-full py-[1.5vh] border-2 border-black rounded-[18px] 
                                ${word.disabled ? 'opacity-50 border-[1px]' : ''} 
                                ${word.id === leftSelected?.id ? 'io-selected' : ''} io-button`}
                            onClick={() => {
                                playSound(word.audio_url);
                                handleLeftSelect(word);
                            }}
                            // Disable the button when the item has been matched
                            disabled={word.disabled}
                        >
                            <GiSoundWaves className="text-6xl md:text-7xl m-auto" />
                        </button>
                    </li>
                ))}
            </ul>

            {/* Depicting right side words */}
            <ul className="w-6/12 flex flex-col items-center justify-center space-y-[4vh]">
                {rightSideWords.map((word) => (
                    <li className="w-10/12" key={word.id + '-left'}>
                        <button
                            className={`w-full h-full py-[3vh] border-2 border-black rounded-[18px] text-2xl 
                             ${word.disabled ? 'opacity-50 border-[1px]' : 'io-button'}
                             ${word.id === rightSelected?.id ? 'io-selected' : ''}
                             `}
                            onClick={() => {
                                handleRightSelect(word);
                            }}
                            disabled={word.disabled}
                        >
                            {word.written_form}
                        </button>
                    </li>
                ))
                }
            </ul >
        </div >
    );
}

export default MatchSoundToWritten_form;