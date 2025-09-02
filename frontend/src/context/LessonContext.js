import { createContext, useCallback, useState } from "react";
import { useRef } from "react";
// import lessonCompletedSound from "../components/Learn/Main/Practice/Lesson-old/sounds/fanfare.mp3"
// import nextChallengeSound from "../components/Learn/Main/Practice/Lesson-old/sounds/short-fanfare.wav";
// import wrongAnswerSound from "../components/Learn/Main/Practice/Lesson-old/sounds/wrong-answer.wav";

const LessonContext = createContext({});

export const LessonProvider = ({ children }) => {
  // Shared states
  const [currentUnit, setCurrentUnit] = useState(1);
  const [currentRepetition, setCurrentRepetition] = useState(1);
  const [currentLesson, setCurrentLesson] = useState(1);
  const [challengeIndex, setChallengeIndex] = useState(0);

  
  



  const [correctAnswer, setCorrectAnswer] = useState(null);

  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [answerText, setAnswerText] = useState('');

  const [hasSwiped, setHasSwiped] = useState(false);

  // For Challenge_select component
  const [selectedOption, setSelectedOption] = useState(null);

  // For Challenge_sort component
  const [destinationItems, setDestinationItems] = useState([]);

  // ----------Function-to-play-Sound----------
  const currentAudioRef = useRef(null);

  const playSound = useCallback((sound) => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.src = '';
      currentAudioRef.current = null;
    }
    const newAudio = new Audio(sound);
    currentAudioRef.current = newAudio;
    newAudio.play().catch(() => { });// Ignore play interruption errors
    newAudio.onended = () => {
      currentAudioRef.current = null;
    };
  }, []);




  // ----------Fisher-Yates_Algorithm----------
  const fisher_yates_shuffle = useCallback((array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let rand_index = Math.floor(Math.random() * (i + 1));
      [array[i], array[rand_index]] = [array[rand_index], array[i]];
    }
    return array;
  }, []);



  return (
    <LessonContext.Provider value={{
      currentUnit, setCurrentUnit,
      currentRepetition, setCurrentRepetition,
      currentLesson, setCurrentLesson,
      challengeIndex,setChallengeIndex,

      correctAnswer, setCorrectAnswer,
      displayAnswer, setDisplayAnswer,
      answerText, setAnswerText,
      selectedOption, setSelectedOption,
      playSound,
      fisher_yates_shuffle,
      hasSwiped, setHasSwiped,
      destinationItems, setDestinationItems
      // nextChallengeSound,
      // wrongAnswerSound,
      // lessonCompletedSound,
    }}>
      {children}
    </LessonContext.Provider>
  );
};

export default LessonContext;
