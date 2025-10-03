import { useContext } from "react";
import LessonContext from "../../../../../../../context/LessonContext";

function MatchPictureToWritten_form({
    handleLeftSelect,
    handleRightSelect,
    rightSelected,
    leftSelected,
    leftSideWords,
    rightSideWords,
}) {

    const { playSound } = useContext(LessonContext);

    return (
        <div className="flex flex-row w-full h-full">
            
            {/* Left side: pictures */}
            <ul className="w-6/12 flex flex-col items-center justify-center space-y-[4vh] text-center">
                {leftSideWords.map((word) => (
                    <li className="w-10/12" key={word.id + '-left'}>
                        <button
                            className={`w-content h-full border-2 border-black rounded-[18px] min-w-[60%] text-center
                                ${word.disabled ? 'opacity-50 border-[1px]' : ''} 
                                ${word.id === leftSelected?.id ? 'io-selected' : ''} io-button`}
                            onClick={() => {
                                playSound(word.audio_url);
                                handleLeftSelect(word);
                            }}
                            disabled={word.disabled}
                        >
                            <img 
                                src={word.image_url} 
                                alt={word.written_form} 
                                className=" h-[15vh] object-contain rounded-[12px]" 
                            />
                        </button>
                    </li>
                ))}
            </ul>

            {/* Right side: written forms */}
            <ul className="w-6/12 flex flex-col items-center justify-center space-y-[4vh]">
                {rightSideWords.map((word) => (
                    <li className="w-10/12" key={word.id + '-right'}>
                        <button
                            className={`w-full h-full py-[3vh] border-2 border-black rounded-[18px] text-2xl 
                                ${word.disabled ? 'opacity-50 border-[1px]' : 'io-button'}
                                ${word.id === rightSelected?.id ? 'io-selected' : ''}`}
                            onClick={() => {
                                handleRightSelect(word);
                            }}
                            disabled={word.disabled}
                        >
                            {word.written_form}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MatchPictureToWritten_form;
