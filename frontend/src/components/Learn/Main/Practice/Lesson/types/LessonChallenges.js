import { motion, AnimatePresence } from 'framer-motion';
import { useContext, useEffect, useRef } from 'react';
import LessonContext from '../../../../../../context/LessonContext.js';

import Media from '../Media/Media.js'
import Challenge from "../Challenges/Challenge.js"
import Answer from '../Answer.js';


const LessonChallenges = ({ lessonData: currentLesson }) => {

  const {
    setChallengeIndex,
    setDisplayAnswer,
    setAnswerText,
    setHasSwiped,
    challengeIndex,
    hasSwiped,
    selectedOption,
    destinationItems,
    setChallenge,
    setIsLessonCompleted,
    correctAnswer,
    playSound,
    nextChallengeSound,
  } = useContext(LessonContext);

  const isScrolling = useRef(false)

  const challenge = currentLesson?.challenges[challengeIndex];
  const challengeType = challenge?.challenge_type;


  useEffect(() => {
    if (currentLesson) {
      setChallenge(currentLesson.challenges[0]);
      setChallengeIndex(0)
    }
  }, [setChallenge, currentLesson, setChallengeIndex]);


  // --------------------Handle-when-current-challenge-finish--------------------
  const nextChallenge = () => {
    if(correctAnswer) playSound(nextChallengeSound)
    // Reset all challenge-specific states
    setDisplayAnswer(false);
    setAnswerText('');
    setHasSwiped(false);

    setChallengeIndex(prev => prev + 1);

    if (challengeIndex < currentLesson?.challenges?.length - 1) {

      const nextChallenge = currentLesson?.challenges[challengeIndex + 1];
      setChallenge(nextChallenge);
    }
    else {
      setIsLessonCompleted(true);
    }
  };


  // --------------------Handle-swipe--------------------
  const handleSwipe = () => {

    if (!isScrolling.current) {
      // block first swipe for challenge_match
      if (challengeType === 'match' && !hasSwiped) return;
      if (challengeType === 'select' && !selectedOption) return;
      if (challengeType === 'sort' && destinationItems.length === 0) return;

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
    if (deltaY < -50) handleSwipe();
  };
  const handleWheel = (e) => {
    if (e.deltaY > 50) handleSwipe();
  };


  return (

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
          <div className='grow flex flex-col justify-between'>
            <Media challenge={challenge} />
            <Challenge nextChallenge={nextChallenge} />
            <Answer />
          </div>
        </motion.div>
      </AnimatePresence>

    </div >
  )
}

export default LessonChallenges
