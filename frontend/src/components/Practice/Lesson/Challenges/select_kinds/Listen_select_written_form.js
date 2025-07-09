import { ImVolumeMedium } from "react-icons/im";

const ListenSelectWrittenForm = ({ challenge, Check_Selected, shuffledOptions, selectedOption, setSelectedOption, playSound, correctAnswer }) => {


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

export default ListenSelectWrittenForm;
