import { useContext, useEffect, useState, useCallback } from "react";
import LessonContext from "../../../../../context/LessonContext";

import ListenSelectWrittenForm from "./select_kinds/Listen_select_written_form";
import ListenAnswerQuestion from "./select_kinds/Listen_answer_question";
import ReadSentenceSelectWrittenForm from "./select_kinds/Read_sentence_select_written_form";
import ReadWordSelectPicture from "./select_kinds/Read_word_select_picture";

const ChallengeSelect = () => {
  console.log("Challenge Select")
  const {
    challenge,
    playSound,
    setDisplayAnswer,
    setAnswerText,
    setCorrectAnswer,
    wrongAnswerSound,
    fisher_yates_shuffle,
    hasSwiped,
    selectedOption,
    setSelectedOption
  } = useContext(LessonContext);

  const select_kinds = {
    listen_select_written_form: ListenSelectWrittenForm,
    listen_answer_question: ListenAnswerQuestion,
    read_sentence_select_written_form: ReadSentenceSelectWrittenForm,
    read_word_select_picture: ReadWordSelectPicture,
  };

  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    setSelectedOption(null);
    setShuffledOptions(fisher_yates_shuffle([...challenge.options]));
  }, [challenge.options, fisher_yates_shuffle, setSelectedOption]);



  const Check_Selected = useCallback(() => {
  if (!selectedOption) return;

  setDisplayAnswer(true);
  const correctAnswer =
    challenge.options.find((option) => option.correct === 1)?.option_id || null;

  if (challenge.select_type === "listen_answer_question") {
    setAnswerText(
      `${challenge.sentence_written_form}\n${challenge.sentence_english_equivalent}`
    );
  }

  if (selectedOption === correctAnswer) {
    setCorrectAnswer(true);
  } else {
    playSound(wrongAnswerSound);
    setCorrectAnswer(false);
  }
}, [selectedOption, challenge, setDisplayAnswer, setAnswerText, playSound, setCorrectAnswer, wrongAnswerSound]);




  useEffect(()=> {
    if(hasSwiped) Check_Selected();
  }, [hasSwiped, Check_Selected])

  const ChallengeComponent = select_kinds[challenge.select_type] || null;
  if(!ChallengeComponent) return ( <div>null component select</div>)

  return (
    <div className="flex-grow p-4 flex flex-col space-y-4">
      <p className="text-2xl font-bold">{challenge.question}</p>
      <ChallengeComponent
        shuffledOptions={shuffledOptions}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    </div>
  );
};

export default ChallengeSelect;
