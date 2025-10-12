import { useContext, useEffect, useState, useCallback } from "react";
import LessonContext from "../../../../../../context/LessonContext";
import { MdOutlineSwipeUp } from "react-icons/md";

const ChallengeSelect = () => {
  const {
    challenge,
    playSound,
    setDisplayAnswer,
    setCorrectAnswer,
    wrongAnswerSound,
    fisher_yates_shuffle,
    hasSwiped,
    selectedOption,
    setSelectedOption
  } = useContext(LessonContext);

  const [shuffledOptions, setShuffledOptions] = useState([]);

  // Detect if this is a multiple choice challenge (more than one correct option)
  const multipleChoise = challenge?.content?.options?.filter(opt => opt.correct === 1).length > 1;

  useEffect(() => {
    setSelectedOption(null);
    setShuffledOptions(fisher_yates_shuffle([...challenge?.content?.options || []]));
  }, [challenge.content.options, fisher_yates_shuffle, setSelectedOption]);


  const Check_Selected = useCallback(() => {
    if (!selectedOption) return;

    setDisplayAnswer(true);

    // For multiple choice, selectedOption could be an array
    const correctAnswers = challenge.content.options.filter((option) => option.correct === 1).map(opt => opt.id);

    if (multipleChoise) {
      // If multiple correct, selectedOption should be an array of ids
      const selectedArr = Array.isArray(selectedOption) ? selectedOption : [selectedOption];
      const allCorrect = correctAnswers.every(id => selectedArr.includes(id)) && selectedArr.length === correctAnswers.length;
      setCorrectAnswer(allCorrect);
      if (!allCorrect) playSound(wrongAnswerSound);

    } else {
      // Single correct
      const correctAnswer = correctAnswers[0] || null;
      if (selectedOption === correctAnswer) {
        setCorrectAnswer(true);
      } else {
        playSound(wrongAnswerSound);
        setCorrectAnswer(false);
      }
    }
  }, [selectedOption, challenge, setDisplayAnswer, playSound, setCorrectAnswer, wrongAnswerSound, multipleChoise]);


  useEffect(() => {
    if (hasSwiped) Check_Selected();
  }, [hasSwiped, Check_Selected])

  const select_type = (challenge?.content?.select_type)?.split("_") || [];

  // Handler for selecting options (supporting multiple choice)
  const handleOptionClick = (id) => {
    if (hasSwiped) return;

    if (select_type.includes("audio")) {
      playSound(challenge.content.options.find(opt => opt.id === id)?.audio_url);
    }

    if (multipleChoise) {
      setSelectedOption(prev => {
        let arr = Array.isArray(prev) ? prev : [];
        if (arr.includes(id)) {
          return arr.filter(optId => optId !== id);
        } else {
          return [...arr, id];
        }
      });
    } else {
      setSelectedOption(id);
    }
  };


  return (
    <div className="grow px-4 flex flex-col space-y-4 justify-end">
      <p className="text-2xl font-bold">{challenge.question}</p>

      {/* Question */}
      <p className="text-left font-semibold">
        {challenge.content.question}
      </p>

      {/* Card Options */}
      {select_type[0] === "card" &&
        <div className="grow grid grid-cols-2 gap-x-4 gap-y-[1.5dvh] text-xl">
          {shuffledOptions.map((option) => (
            <button
              key={option.id}
              style={{ minHeight: 30, maxHeight: 220 }} // Responsive height using dvh
              className={`io-button border rounded-lg shadow-md transition active:bg-blue-300
              ${multipleChoise
                  ? (Array.isArray(selectedOption) && selectedOption.includes(option.id) ? "bg-blue-300" : "bg-white")
                  : (selectedOption === option.id ? "bg-blue-300" : "bg-white")
                }
               `}
              onClick={() => handleOptionClick(option.id)}
            >

              {select_type[select_type.length - 1] === "writtenform" ? <div>{option.written_form}</div> :
                select_type[select_type.length - 1] === "picture" ? <img src={option.image_url} alt={option.english_equivalent} /> :
                  select_type[select_type.length - 1] === "transliteration" ? <div>{option.transliteration}</div> :
                  select_type[select_type.length -1 ] === "englishequivalent" ? <div>{option.english_equivalent}</div> :
                    <div>option 404</div>
              }

            </button>
          ))}
        </div>
      }


      {/* Sequence Options */}
      {select_type[0] === "sequential" &&
        <div className="grid gap-4 text-xl">
          {shuffledOptions.map((option) => (
            <button
              key={option.id}
              className={`rounded-[18px] io-button border-2 border-black p-3
              ${selectedOption === option.id ? "bg-blue-300 opacity-70" : ''}
               `}
              onClick={() => handleOptionClick(option.id)}
            >

              {select_type[select_type.length - 1] === "writtenform" ? option.written_form :
                select_type[select_type.length - 1] === "englishequivalent" ? option.english_equivalent :
                  null}

            </button>
          ))}
        </div>
      }

      <p className='pt-[1dvh] pb-1 text-bluesea font-bold gap-x-4 flex  justify-center  items-center'>
        <span>Swipe Up</span>
        <MdOutlineSwipeUp className="text-4xl" />
      </p>
    </div>
  );
};

export default ChallengeSelect;
