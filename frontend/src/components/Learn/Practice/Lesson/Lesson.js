import { useCallback, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";

import useAxiosPrivate from '../../../../hooks/useAxiosPrivate.js';

import lessonCompletedSound from './sounds/fanfare.mp3';
import nextChallengeSound from './sounds/short-fanfare.wav';
import wrongAnswerSound from './sounds/wrong-answer.wav';
import Header from './Header'
import Continue from './Continue';
import EndOfLesson from './EndOfLesson.js';

// -----------importing-challenge-components-----------
import ChallengeMatch from './Challenges/Challenge_match.js';
import ChallengeSelect from './Challenges/Challenge_select'
import ChallengeSort from './Challenges/Challenge_sort.js'

function Lesson() {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();

  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const [challenges, setChallenges] = useState([]);
  const [challenge, setChallenge] = useState();
  const [challengeIndex, setChallengeIndex] = useState(1);

  // Variable used to hide and display continue component
  const [displayContinue, setDisplayContinue] = useState(false);
  const [continueText, setContinueText] = useState('');
  const [continueButtonText, setContinueButtonText] = useState('Continue');

  // Depending on challenge type, select child component
  const challenge_components = {
    challenge_match: ChallengeMatch,
    challenge_select: ChallengeSelect,
    challenge_sort: ChallengeSort,
  };

  // ----------Function-to-play-Sound----------
  const [currentAudio, setCurrentAudio] = useState(null);
  const playSound = (sound) => {

    // Stop the currently playing sound
    if (currentAudio && currentAudio.currentTime > 0) {
      currentAudio.pause();
    }

    // Create and play the new audio
    const newAudio = new Audio(sound);
    setCurrentAudio(newAudio); // Set the new audio as the current one
    newAudio.play();

    // Remove the reference when the sound finishes
    newAudio.onended = () => setCurrentAudio(null);
  };

  // ----------Fisher-Yates_Algorithm----------
  // It is used to shuffle items
  // Time complexity:  O(n)
  // Space complexity: O(1)
  const fisher_yates_shuffle = useCallback((array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let rand_index = Math.floor(Math.random() * (i + 1));
      [array[i], array[rand_index]] = [array[rand_index], array[i]];
    }
    return array;
  }, [])


  // ----------------------Fetch-Lesson-Data(challenges)----------------------
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchChanllenges = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(`/lesson?lesson_id=${id}`, { signal: controller.signal });
        isMounted && setChallenges(response.data);
        isMounted && setChallenge(response.data[0]);
      } catch (err) {
        if (err.code === "ERR_CANCELED") return; // ignore abort errors
        setError("Failed to fetch challenges.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChanllenges();

    return () => {
      isMounted = false;
      controller.abort();
    }

  }, [id, axiosPrivate]);


  // --------------------Handle-when-current-challenge-finish--------------------
  const handleContinue = () => {
    setChallengeIndex(challengeIndex + 1);

    // Hide continue
    setDisplayContinue(false)
    setContinueText('')

    // Bring the next component
    if (challengeIndex < challenges.length) {
      const nextChallenge = challenges[challengeIndex];
      setChallenge(nextChallenge);
    }
    // End of lesson session
    else {
      playSound(lessonCompletedSound);
    }
  }

  // Rendering components of each challenge
  const challengeType = challenges[challengeIndex - 1]?.type;
  // Depending on each challenge type, bring the correct component
  const ChallengeComponent = (challengeIndex <= challenges.length) ? challenge_components[challengeType] : null;


  if (loading) return <p className='text-center w-full pt-24'>Loading Challenges, <br />you may need to wait, up to 50 seconds in first load</p>;
  if (error) return <p className='text-center w-full pt-24'>{error}</p>;

  return (
    <div className="max-w-screen-md m-auto w-full h-full bg-[#F5F5F5] flex flex-col">
      <Header percentage={challengeIndex - 1} exercise_count={challenges.length} />

      {ChallengeComponent
        ?
        <ChallengeComponent
          playSound={playSound}
          nextChallengeSound={nextChallengeSound}
          wrongAnswerSound={wrongAnswerSound}
          setDisplayContinue={setDisplayContinue}
          displayContinue={displayContinue}
          setContinueButtonText={setContinueButtonText}
          setContinueText={setContinueText}
          setChallengeIndex={setChallengeIndex}
          challenge={challenge}
          setChallenge={setChallenge}
          fisher_yates_shuffle={fisher_yates_shuffle}
          setCorrectAnswer={setCorrectAnswer}
        />
        :
        <EndOfLesson />}

      <Continue
        handleContinue={handleContinue}
        displayContinue={displayContinue}
        continueText={continueText}
        continueButtonText={continueButtonText}
        correctAnswer={correctAnswer}
      />
    </div>
  );
}

export default Lesson;