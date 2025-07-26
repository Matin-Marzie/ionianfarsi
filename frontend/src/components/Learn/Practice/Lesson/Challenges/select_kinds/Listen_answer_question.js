import { useContext } from "react";
import { ImVolumeMedium } from "react-icons/im";
import LessonContext from "../../../../../../context/LessonContext";

const Listen_answer_question = ({ Check_Selected, shuffledOptions, selectedOption, setSelectedOption,
  setContinueText
}) => {

  const { playSound, challenge } = useContext(LessonContext);
  
  return (
    <div className="w-full h-full flex flex-col justify-between text-2xl ">
      {/* Audio Button */}
      <button
        className="io-button text-6xl p-8 bg-blue-500 text-white hover:bg-blue-600 mx-auto"
        onClick={() => playSound(challenge.sentence_audio_url)}
      >
        <ImVolumeMedium style={{ transform: "rotateZ(180deg)" }} />
      </button>

      {/* Question */}
      <p className="text-right">
        {challenge.select_question}
      </p>

      {/* Options */}
      <div className="grid gap-4">
        {shuffledOptions.map((option) => (
          <button
            key={option.option_id}
            className={`rounded-[18px] io-button border-2 border-black p-3
              ${selectedOption === option.option_id ? "bg-blue-300 opacity-70" : ''}
               `}
            onClick={() => {
              if(option.audio_url) playSound(option.audio_url);
              setSelectedOption(option.option_id)
            }}
          >
            {option.written_form}
          </button>
        ))}
      </div>

      {/* Check Button */}
      <button
        className={`p-2 bg-green-500 text-white font-bold rounded-lg
          ${selectedOption ? 'opacity-100 hover:bg-green-600 transition' : 'opacity-80'}
          `}
        onClick={() => Check_Selected(selectedOption)}
        disabled={selectedOption === null}
      >
        Check Answer
      </button>
    </div>
  );
};

export default Listen_answer_question;
