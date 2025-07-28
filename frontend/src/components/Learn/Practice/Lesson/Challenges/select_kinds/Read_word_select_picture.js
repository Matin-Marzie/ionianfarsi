import { useContext } from "react";
import { ImVolumeMedium } from "react-icons/im";
import LessonContext from "../../../../../../context/LessonContext";
import { MdOutlineSwipeUp } from "react-icons/md";

const Read_word_select_picture = ({shuffledOptions, selectedOption, setSelectedOption }) => {

  const { challenge, playSound } = useContext(LessonContext);

  return (
    <div className="w-full h-full flex flex-col justify-between text-2xl ">
      {/* Sentence */}
      <div className='flex justify-end items-start text-right'>
        <p className="underline underline-offset-[10px] leading-loose">
          {challenge.word_written_form}
        </p>
        {/* Audio Button */}
        <button
          className="io-button text-3xl p-3 bg-blue-500 text-white hover:bg-blue-600 ml-4"
          onClick={() => playSound(challenge.word_audio_url)}
        >
          <ImVolumeMedium style={{ transform: "rotateZ(180deg)" }} />
        </button>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4">
        {shuffledOptions.map((option) => (
          <button
            key={option.option_id}
            className={`p-3 rounded-[18px]
              ${selectedOption === option.option_id ? "bg-blue-300 opacity-70" : ""}
               `}
            onClick={() => setSelectedOption(option.option_id)}
          >
            <img className={`io-button`}
              src={option.image_url}
              alt={option.english_equivalent} />
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

export default Read_word_select_picture;
