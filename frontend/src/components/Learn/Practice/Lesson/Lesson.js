import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import useAxiosPrivate from '../../../../hooks/useAxiosPrivate.js';
import { LessonProvider } from '../../../../context/LessonContext.js';
import LessonContext from '../../../../context/LessonContext.js';

import Header from './Header';
import Continue from './Continue';
import EndOfLesson from './EndOfLesson.js';

import ChallengeMatch from './Challenges/Challenge_match.js';
import ChallengeSelect from './Challenges/Challenge_select';
import ChallengeSort from './Challenges/Challenge_sort.js';

function LessonContent() {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();

  // Context values
  const {
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
  } = useContext(LessonContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const challenge_components = {
    challenge_match: ChallengeMatch,
    challenge_select: ChallengeSelect,
    challenge_sort: ChallengeSort,
  };

  // ----------------------Fetch-Lesson-Data(challenges)----------------------
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchChanllenges = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(`/lesson?lesson_id=${id}`, { signal: controller.signal });
        if (isMounted) {
          setChallenges(response.data);
          setChallenge(response.data[0]);
        }
      } catch (err) {
        if (err.code === "ERR_CANCELED") return;
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
    };
  }, [id, axiosPrivate, setChallenges, setChallenge]);

  // --------------------Handle-when-current-challenge-finish--------------------
  const handleContinue = () => {
    setChallengeIndex(challengeIndex + 1);
    setDisplayContinue(false);
    setContinueText('');

    if (challengeIndex < challenges.length) {
      const nextChallenge = challenges[challengeIndex];
      setChallenge(nextChallenge);
    } else {
      playSound(lessonCompletedSound);
    }
  };

  const challengeType = challenges[challengeIndex - 1]?.type;
  const ChallengeComponent = (challengeIndex <= challenges.length) ? challenge_components[challengeType] : null;

  if (loading) return <p className='text-center w-full pt-24'>Loading Challenges, <br />you may need to wait, up to 50 seconds in first load</p>;
  if (error) return <p className='text-center w-full pt-24'>{error}</p>;

  return (
    <div className="max-w-screen-md m-auto w-full h-full bg-[#F5F5F5] flex flex-col">
      <Header />

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

// Wrap with context provider
export default function Lesson() {
  return (
    <LessonProvider>
      <LessonContent />
    </LessonProvider>
  );
}
