import { useContext, useEffect, useState } from "react";
import LessonContext from "../../../../../context/LessonContext";

import ListenSelectWrittenForm from "./select_kinds/Listen_select_written_form";
import ListenAnswerQuestion from "./select_kinds/Listen_answer_question";
import ReadSentenceSelectWrittenForm from "./select_kinds/Read_sentence_select_written_form";
import ReadWordSelectPicture from "./select_kinds/Read_word_select_picture";

const ChallengeSelect = () => {
  const {
    challenge,
    playSound,
    setDisplayContinue,
    setContinueText,
    setCorrectAnswer,
    nextChallengeSound,
    wrongAnswerSound,
    fisher_yates_shuffle,
    displayContinue,
  } = useContext(LessonContext);

  const select_kinds = {
    listen_select_written_form: ListenSelectWrittenForm,
    listen_answer_question: ListenAnswerQuestion,
    read_sentence_select_written_form: ReadSentenceSelectWrittenForm,
    read_word_select_picture: ReadWordSelectPicture,
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    setSelectedOption(null);
    setShuffledOptions(fisher_yates_shuffle([...challenge.options]));
  }, [challenge.options, fisher_yates_shuffle]);

  const Check_Selected = (selected_option) => {
    setDisplayContinue(true);
    const correctAnswer =
      challenge.options.find((option) => option.correct === 1)?.option_id || null;

    if (challenge.select_type === "listen_answer_question") {
      setContinueText(
        `${challenge.sentence_written_form}\n${challenge.sentence_english_equivalent}`
      );
    }

    if (selected_option === correctAnswer) {
      playSound(nextChallengeSound);
      setCorrectAnswer(true);
    } else {
      playSound(wrongAnswerSound);
      setCorrectAnswer(false);
    }
  };

  const ChallengeComponent = select_kinds[challenge.select_type];

  return (
    <div className="flex-grow p-4 flex flex-col space-y-4">
      <p className="text-2xl font-bold">{challenge.question}</p>
      <ChallengeComponent
        shuffledOptions={shuffledOptions}
        Check_Selected={Check_Selected}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        displayContinue={displayContinue}
        setContinueText={setContinueText}
      />
    </div>
  );
};

export default ChallengeSelect;
