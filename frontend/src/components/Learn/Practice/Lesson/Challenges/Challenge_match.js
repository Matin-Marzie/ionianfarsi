import { useContext, useEffect, useState } from 'react';
import MatchPictureToWritten_form from './match_kinds/MatchPictureToWritten_form';
import MatchWritten_formToEnglish_equivalent from './match_kinds/MatchWritten_formToEnglish_equivalent';
import MatchSoundToWritten_form from './match_kinds/MatchSoundToWritten_form';
import LessonContext from '../../../../../context/LessonContext';

const Challenge_match = () => {
  const {
    challenge,
    playSound,
    setDisplayAnswer,
    fisher_yates_shuffle,
    setCorrectAnswer,
    wrongAnswerSound,
    setHasSwiped,
    setAnswerText
  } = useContext(LessonContext);

  const match_kinds = {
    match_sound_to_written_form: MatchSoundToWritten_form,
    match_written_form_to_english_equivalent: MatchWritten_formToEnglish_equivalent,
    match_picture_to_written_form: MatchPictureToWritten_form
  };

  const [leftSelected, setLeftSelected] = useState(null);
  const [rightSelected, setRightSelected] = useState(null);
  const [leftSideWords, setLeftSideWords] = useState([]);
  const [rightSideWords, setRightSideWords] = useState([]);

  useEffect(() => {
    setLeftSideWords(fisher_yates_shuffle([...challenge.content]));
    setRightSideWords(fisher_yates_shuffle([...challenge.content]));
  }, [challenge, fisher_yates_shuffle]);

  const handleLeftSelect = (word) => {
    if (leftSelected?.id === word.id) {
      setLeftSelected(null);
    } else {
      setLeftSelected(word);
      checkMatch(word, rightSelected);
    }
  };

  const handleRightSelect = (word) => {
    if (rightSelected?.id === word.id) {
      setRightSelected(null);
    } else {
      setRightSelected(word);
      checkMatch(leftSelected, word);
    }
  };

  const checkMatch = (leftSelectedWord, rightSelectedWord) => {
    if (leftSelectedWord && rightSelectedWord) {
      setLeftSelected(null);
      setRightSelected(null);

      if (leftSelectedWord.id === rightSelectedWord.id) {
        // correct match
        const updatedLeft = leftSideWords.map((w) =>
          w.id === leftSelectedWord.id ? { ...w, disabled: true } : w
        );
        const updatedRight = rightSideWords.map((w) =>
          w.id === rightSelectedWord.id ? { ...w, disabled: true } : w
        );
        setLeftSideWords(updatedLeft);
        setRightSideWords(updatedRight);

        const remaining = updatedRight.filter(w => w.id !== rightSelectedWord.id);
        if (remaining.every(w => w.disabled)) {
          setHasSwiped(true);
          setCorrectAnswer(true);
          setDisplayAnswer(true);
          setAnswerText("Swipe up to Continue  👆")
        }
      } else {
        // wrong match
        playSound(wrongAnswerSound);
      }
    }
  };


  const MatchKindsComponent = match_kinds[challenge.content[0].match_type];

  return (
    <div className="w-full flex-grow p-2 flex flex-col">
      <p className='text-2xl font-bold px-6'>
        {challenge.question}
      </p>
      <MatchKindsComponent
        handleLeftSelect={handleLeftSelect}
        handleRightSelect={handleRightSelect}
        rightSelected={rightSelected}
        leftSelected={leftSelected}
        leftSideWords={leftSideWords}
        rightSideWords={rightSideWords}
        setShuffledChallenge={setRightSideWords}
        fisher_yates_shuffle={fisher_yates_shuffle}
      />
    </div>
  );
};

export default Challenge_match;
