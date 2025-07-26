// src/context/LessonContext.js
import { createContext, useCallback, useState } from "react";
import lessonCompletedSound from "../components/Learn/Practice/Lesson/sounds/fanfare.mp3"
import nextChallengeSound from "../components/Learn/Practice/Lesson/sounds/short-fanfare.wav";
import wrongAnswerSound from "../components/Learn/Practice/Lesson/sounds/wrong-answer.wav";

const LessonContext = createContext({});

export const LessonProvider = ({ children }) => {
  // Shared states
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [challengeIndex, setChallengeIndex] = useState(1);
  const [challenge, setChallenge] = useState();
  const [challenges, setChallenges] = useState([]);

  const [displayContinue, setDisplayContinue] = useState(false);
  const [continueText, setContinueText] = useState('');
  const [continueButtonText, setContinueButtonText] = useState('Continue');

  const [currentAudio, setCurrentAudio] = useState(null);



  // ----------Function-to-play-Sound----------
  const playSound = (sound) => {
    if (currentAudio && currentAudio.currentTime > 0) {
      currentAudio.pause();
    }
    const newAudio = new Audio(sound);
    setCurrentAudio(newAudio);
    newAudio.play();
    newAudio.onended = () => setCurrentAudio(null);
  };

  

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
      correctAnswer,
      setCorrectAnswer,
      challengeIndex,
      setChallengeIndex,
      challenge,
      setChallenge,
      challenges,
      setChallenges,
      displayContinue,
      setDisplayContinue,
      continueText,
      setContinueText,
      continueButtonText,
      setContinueButtonText,
      playSound,
      nextChallengeSound,
      wrongAnswerSound,
      fisher_yates_shuffle,
      lessonCompletedSound,
    }}>
      {children}
    </LessonContext.Provider>
  );
};

export default LessonContext;
