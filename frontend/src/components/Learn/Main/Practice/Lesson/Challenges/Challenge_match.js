import { useContext, useEffect, useState } from 'react';

import MatchPictureToWritten_form from './match_kinds/MatchPictureToWritten_form';
import MatchWritten_formToEnglish_equivalent from './match_kinds/MatchWritten_formToEnglish_equivalent';
import MatchSoundToWritten_form from './match_kinds/MatchSoundToWritten_form';

import LessonContext from '../../../../../../context/LessonContext';

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

  const [leftSelected, setLeftSelected] = useState(null);
  const [rightSelected, setRightSelected] = useState(null);
  const [leftSideWords, setLeftSideWords] = useState([]);
  const [rightSideWords, setRightSideWords] = useState([]);

  useEffect(() => {

      // combine words + sentences in one unified array
    const Items = [
      ...(challenge.content.words || []),
      ...(challenge.content.sentences || [])
    ];

    // shuffle for both sides
    const shuffledLeft = fisher_yates_shuffle([...Items]);
    const shuffledRight = fisher_yates_shuffle([...Items]);


    setLeftSideWords(shuffledLeft);
    setRightSideWords(shuffledRight);
    
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

      if (leftSelectedWord.id === rightSelectedWord.id || leftSelectedWord.audio_url === rightSelectedWord.audio_url) {
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



  const match_kinds = {
    picture_to_writtenform: MatchPictureToWritten_form,
    writtenform_to_englishequivalent: MatchWritten_formToEnglish_equivalent,
    sound_to_writtenform: MatchSoundToWritten_form,
    writtenform_to_transliteration: MatchWritten_formToEnglish_equivalent
  };

  const matchType = challenge?.content?.match_type;
  const MatchKindsComponent = match_kinds[matchType];

  return (
    <div className="w-full grow p-2 flex flex-col">
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
        matchType={matchType}
      />
    </div>
  );
};

export default Challenge_match;
