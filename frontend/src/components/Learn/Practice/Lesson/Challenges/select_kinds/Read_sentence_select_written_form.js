import { ImVolumeMedium } from "react-icons/im";

const Read_sentence_select_written_form = ({ challenge, Check_Selected, shuffledOptions, selectedOption, setSelectedOption, playSound, correctAnswer }) => {


  return (
    <div className="w-full h-full flex flex-col justify-between text-2xl ">
      {/* Sentence */}
      <div className='flex justify-end items-start text-right'>
        <p className="underline underline-offset-[10px] leading-loose">
          {challenge.sentence_written_form}
        </p>
        {/* Audio Button */}
        <button
          className="io-button text-3xl p-3 bg-blue-500 text-white hover:bg-blue-600 ml-4"
          onClick={() => playSound(challenge.sentence_audio_url)}
        >
          <ImVolumeMedium style={{ transform: "rotateZ(180deg)" }} />
        </button>
      </div>

      {/* Options */}
      <div className="grid gap-4">
        {shuffledOptions.map((option) => (
          <button
            key={option.option_id}
            className={`rounded-[18px] io-button border-2 border-black p-3
              ${selectedOption === option.option_id ? "bg-blue-300 opacity-70" : ''}
               `}
            onClick={() => {
              playSound(option.audio_url)
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

export default Read_sentence_select_written_form;
