import { useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import useAxiosPrivate from '../../../../hooks/useAxiosPrivate.js';
import { LessonProvider } from '../../../../context/LessonContext.js';
import LessonContext from '../../../../context/LessonContext.js';
import { useQuery } from '@tanstack/react-query';
import { fetchLessonChallenges } from '../../../../api/LearnApi.js';


import Header from './Header';
import Answer from './Answer.js';
import EndOfLesson from './EndOfLesson.js';

import ChallengeMatch from './Challenges/Challenge_match.js';
import ChallengeSelect from './Challenges/Challenge_select';
import ChallengeSort from './Challenges/Challenge_sort.js';

function LessonContent() {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();

  const isScrolling = useRef(false);

  // Context values
  const {
    challengeIndex,
    setChallengeIndex,
    challenge,
    setChallenge,
    challenges,
    setChallenges,
    setDisplayAnswer,
    setAnswerText,
    playSound,
    lessonCompletedSound,
    hasSwiped,
    setHasSwiped,
    selectedOption,
    destinationItems,
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
  const nextChallenge = () => {
    console.log("Next Challenge");

    // Reset all challenge-specific states
    setDisplayAnswer(false);
    setAnswerText('');
    setHasSwiped(false);

    setTimeout(() => {
      setChallengeIndex(prev => prev + 1);
    }, 0);

    if (challengeIndex < challenges.length) {
      const nextChallenge = challenges[challengeIndex + 1];
      setChallenge(nextChallenge);


    } else {
      playSound(lessonCompletedSound);
      setChallengeIndex(prev => prev + 1);
    }
  };



  // --------------------Handle-swipe--------------------
  const handleSwipe = (deltaY) => {

    if (deltaY > 100 && !isScrolling.current) {
      // block first swipe for challenge_match
      if (challengeType === 'challenge_match' && !hasSwiped) return;
      if (challengeType === 'challenge_select' && !selectedOption) return;
      if (challengeType === 'challenge_sort' && destinationItems.length === 0) return;

      isScrolling.current = true;

      if (!hasSwiped) { // On first Swipe : check answer
        setHasSwiped(true);
      } else { // On second Swipe : bring the next challenge
          nextChallenge();
      }

      // allow next swipe after animation
      setTimeout(() => {
        isScrolling.current = false;
      }, 300); // match your motion animation duration
    }
  };


  const touchStartY = useRef(null);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    handleSwipe(deltaY);
  };

  const handleWheel = (e) => {
    handleSwipe(e.deltaY);
  };





  const challengeType = challenge?.type;
  const ChallengeComponent = challenge && challenge_components[challengeType]
    ? challenge_components[challengeType]
    : null;

  if (loading) return <p className='text-center w-full pt-24'>Loading Challenges, <br />you may need to wait, up to 50 seconds in first load</p>;
  if (error) return <p className='text-center w-full pt-24'>{error}</p>;

  return (
    <div className="max-w-screen-md m-auto w-full h-full bg-[#F5F5F5] flex flex-col">
      <Header />

      {ChallengeComponent ? (
        <div
          className="flex-grow flex flex-col"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={challengeIndex || 'end'}
              initial={{ y: '100vh', opacity: 1 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100vh', opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-grow flex flex-col"
            >
              <ChallengeComponent />
            </motion.div>
          </AnimatePresence>

          <Answer />
        </div>
      ) : (
        <EndOfLesson />
      )}
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
