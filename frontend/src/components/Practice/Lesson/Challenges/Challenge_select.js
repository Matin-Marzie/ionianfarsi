import { useState, useEffect } from "react";
import ListenSelectWrittenForm from "./select_kinds/Listen_select_written_form";
import ListenAnswerQuestion from "./select_kinds/Listen_answer_question";
import ReadSentenceSelectWrittenForm from "./select_kinds/Read_sentence_select_written_form";
import ReadWordSelectPicture from "./select_kinds/Read_word_select_picture";


const ChallengeSelect = ({
  playSound,
  nextChallengeSound,
  wrongAnswerSound,
  displayContinue,
  setDisplayContinue,
  setContinueText,
  setCorrectAnswer,
  challenge,
  fisher_yates_shuffle
}) => {

  const select_kinds = {
    listen_select_written_form: ListenSelectWrittenForm,
    listen_answer_question: ListenAnswerQuestion,
    read_sentence_select_written_form: ReadSentenceSelectWrittenForm,
    read_word_select_picture: ReadWordSelectPicture,
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  // ----------When-component-mounts----------
  useEffect(() => {
    // Shuffle the options
    setSelectedOption(null);
    setShuffledOptions(fisher_yates_shuffle([...challenge.options]));
  }, [challenge.options, fisher_yates_shuffle]);


  // ----------Check-selected-answer----------
  // Input: selected_option id
  const Check_Selected = (selected_option) => {
    setDisplayContinue(true);
    const correctAnswer = challenge.options.find((option) => option.correct === 1)?.option_id || null;

    if(challenge.select_type === 'listen_answer_question'){
      setContinueText(`${challenge.sentence_written_form}\n${challenge.sentence_english_equivalent}`)
    }

    // Correct answer
    if (selected_option === correctAnswer) {
      playSound(nextChallengeSound);
      setCorrectAnswer(true);

      // Wrong answer
    } else {
      playSound(wrongAnswerSound);
      setCorrectAnswer(false);
    }
  };

  const ChallengeComponent = select_kinds[challenge.select_type];

  return (
    <div className="flex-grow p-4 flex flex-col space-y-4">
      <p className="text-2xl font-bold">
        {challenge.question}
      </p>
      <ChallengeComponent
        challenge={challenge}
        shuffledOptions={shuffledOptions}
        Check_Selected={Check_Selected}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        playSound={playSound}
        displayContinue={displayContinue}
        setContinueText={setContinueText}
      />
    </div>
  );
};

export default ChallengeSelect;