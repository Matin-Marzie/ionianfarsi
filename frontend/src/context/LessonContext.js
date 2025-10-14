import { createContext, useCallback, useState } from "react";
import { useRef } from "react";
import lessonCompletedSound from "../components/Learn/Main/Practice/Lesson/sounds/fanfare.mp3"
import nextChallengeSound from "../components/Learn/Main/Practice/Lesson/sounds/short-fanfare.wav";
import wrongAnswerSound from "../components/Learn/Main/Practice/Lesson/sounds/wrong-answer.wav";

const LessonContext = createContext({});

export const LessonProvider = ({ children }) => {

  const [learnPageIndex, setLearnPageIndex] = useState(1); // Start at Practice
  const [learnPageScrollDirection, setLearnPageScrollDirection] = useState(0);

  const [challengeIndex, setChallengeIndex] = useState(0);
  const [challenge, setChallenge] = useState({});
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);

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
      learnPageIndex, setLearnPageIndex,
      learnPageScrollDirection, setLearnPageScrollDirection,
      
      challengeIndex, setChallengeIndex,
      challenge, setChallenge,

      correctAnswer, setCorrectAnswer,
      displayAnswer, setDisplayAnswer,
      answerText, setAnswerText,
      selectedOption, setSelectedOption,
      playSound,
      fisher_yates_shuffle,
      hasSwiped, setHasSwiped,
      destinationItems, setDestinationItems,
      nextChallengeSound,
      wrongAnswerSound,
      lessonCompletedSound,
      isLessonCompleted, setIsLessonCompleted,
    }}>
      {children}
    </LessonContext.Provider>
  );
};

export default LessonContext;
