import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import useAxiosPrivate from '../../../../hooks/useAxiosPrivate.js';
import { LessonProvider } from '../../../../context/LessonContext.js';
import LessonContext from '../../../../context/LessonContext.js';
import { useQuery } from '@tanstack/react-query';
import { fetchLessonChallenges } from '../../../../api/LearnApi.js';


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
    challengeIndex,
    setChallengeIndex,
    setChallenge,
    challenges,
    setChallenges,
    setDisplayContinue,
    setContinueText,
    playSound,
    lessonCompletedSound,
  } = useContext(LessonContext);

  const challenge_components = {
    challenge_match: ChallengeMatch,
    challenge_select: ChallengeSelect,
    challenge_sort: ChallengeSort,
  };

  // ----------------------Fetch-Lesson-Data(challenges)----------------------
  const { data: challengesData, isPending: loading, error } = useQuery({
  queryKey: ['lesson', id],
  queryFn: ({ signal }) => fetchLessonChallenges({ lessonId: id, signal, axiosInstance: axiosPrivate }),
  staleTime: Infinity,
});


useEffect(() => {
  if (challengesData) {
    setChallenges(challengesData);
    setChallenge(challengesData[0]);
  }
}, [challengesData, setChallenge, setChallenges]);


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

      {ChallengeComponent ? <ChallengeComponent/> : <EndOfLesson />}

      <Continue handleContinue={handleContinue} />
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
