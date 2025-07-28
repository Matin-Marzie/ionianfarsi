import { ImVolumeMedium } from "react-icons/im";
import { useContext } from "react";
import LessonContext from "../../../../../../context/LessonContext";
import { MdOutlineSwipeUp } from "react-icons/md";

const ListenSelectWrittenForm = ({ shuffledOptions, selectedOption, setSelectedOption }) => {

  const { playSound, challenge } = useContext(LessonContext);
  return (
    <div className="w-full h-full flex flex-col justify-between text-2xl ">
      {/* Audio Button */}
      <button
        className="io-button text-6xl p-8 bg-blue-500 text-white hover:bg-blue-600 mx-auto"
        onClick={() => playSound(challenge.word_audio_url)}
      >
        <ImVolumeMedium style={{ transform: "rotateZ(180deg)" }}/>
      </button>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4">
        {shuffledOptions.map((option) => (
          <button
            key={option.option_id}
            className={`io-button h-[200px] border rounded-lg shadow-md hover:bg-gray-200 transition
              ${selectedOption === option.option_id ? "bg-blue-300" : "bg-white"}
               `}
            onClick={() => setSelectedOption(option.option_id)}
          >
            {option.written_form}
          </button>
        ))}
      </div>

      {/* Check selected */}
      <p className='p-2 text-bluesea rounded-lg font-bold flex gap-x-4 mx-auto'>
        <span>Swipe Up</span> <MdOutlineSwipeUp className="text-4xl" />
      </p>
    </div>
  );
};

export default ListenSelectWrittenForm;
