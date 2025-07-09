import { useEffect, useState } from 'react';

// Import child Components
import MatchPictureToWritten_form from './match_kinds/MatchPictureToWritten_form';
import MatchWritten_formToEnglish_equivalent from './match_kinds/MatchWritten_formToEnglish_equivalent';
import MatchSoundToWritten_form from './match_kinds/MatchSoundToWritten_form';

const Challenge_match = ({
  playSound,
  nextChallengeSound,
  wrongAnswerSound,
  setDisplayContinue,
  challenge,
  fisher_yates_shuffle,
  setCorrectAnswer, }) => {

  // Child components object
  const match_kinds = {
    match_sound_to_written_form: MatchSoundToWritten_form,
    match_written_form_to_english_equivalent: MatchWritten_formToEnglish_equivalent,
    match_picture_to_written_form: MatchPictureToWritten_form
  }

  const [leftSelected, setLeftSelected] = useState(null);
  const [rightSelected, setRightSelected] = useState(null);
  const [leftSideWords, setLeftSideWords] = useState([])
  const [rightSideWords, setRightSideWords] = useState([])

  useEffect(() => {
    // Shuffle both side words
    setLeftSideWords(fisher_yates_shuffle([...challenge.content]))
    setRightSideWords(fisher_yates_shuffle([...challenge.content]))
  }, [challenge, fisher_yates_shuffle])

  // When user selectes a button from left side
  const handleLeftSelect = (word) => {
    // If the same word is selected previosly and trying to select it again, we merely deselect the word
    if (leftSelected?.id === word.id) {
      setLeftSelected(null);
    }
    else {
      setLeftSelected(word);
      checkMatch(word, rightSelected);
    }
  }



  // When user selectes a button from right side
  const handleRightSelect = (word) => {
    // If the same word is selected previosly and trying to select it again, we just deselect the word
    if (rightSelected?.id === word.id) {
      setRightSelected(null);
    }
    else {
      setRightSelected(word);
      checkMatch(leftSelected, word);

    }
  }

  const checkMatch = (leftSelectedWord, rightSelectedWord) => {
    // When user has choosen both from left and right side
    if (leftSelectedWord && rightSelectedWord) {
      setLeftSelected(null);
      setRightSelected(null);
      // Correct Answer
      if (leftSelectedWord.id === rightSelectedWord.id) {
        // Disable left word button
        const updatedWords = leftSideWords.map((word) => (word.id === leftSelectedWord.id) ? { ...word, disabled: true } : word);
        setLeftSideWords(updatedWords);

        // Disable right word button
        const updatedRightWords = rightSideWords.map((word) => (word.id === rightSelectedWord.id) ? { ...word, disabled: true } : word);
        setRightSideWords(updatedRightWords);


        // Check if all words has been matched (Check if all words disabled)
        if (rightSideWords.filter(word => word.id !== leftSelectedWord.id).every(word => word.disabled === true)) {
          // Bring the continue component
          setDisplayContinue(true);
          setCorrectAnswer(true);
          playSound(nextChallengeSound);
        }
      }
      // Wrong answer
      else {
        playSound(wrongAnswerSound);
      }
    }
  }


  const MatchKindsComponent = match_kinds[challenge.content[0].match_type];
  return (
    <div className="w-full flex-grow p-2 flex flex-col">
      <p className='text-2xl font-bold px-6'>
        {challenge.question}
      </p>
      <MatchKindsComponent
        playSound={playSound}
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
  )
}

export default Challenge_match