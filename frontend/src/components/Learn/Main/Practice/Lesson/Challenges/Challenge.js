import { useContext } from 'react';
import LessonContext from '../../../../../../context/LessonContext.js';
import ChallengeMatch from './Challenge_match.js';
import ChallengeSort from './Challenge_sort.js';
import ChallengeSelect from './Challenge_select';

import { MdOutlineSwipeUp } from "react-icons/md";

const Challenge = () => {

  const { challenge } = useContext(LessonContext);

  // Challenge component types
  const challenge_components = {
    match: ChallengeMatch,
    select: ChallengeSelect,
    sort: ChallengeSort,
  };
  const challengeType = challenge?.challenge_type;
  const ChallengeComponent = challenge && challenge_components[challengeType]
    ? challenge_components[challengeType]
    : null;

  return (
    <div className='grow flex'>
      {ChallengeComponent ?
        (
          <ChallengeComponent />
        )
        :
        (
          <p className='pt-4 pb-2 text-bluesea font-bold gap-x-4 flex  justify-center  items-center'>
            <span>Swipe up to finish the lesson</span>
            <MdOutlineSwipeUp className="text-4xl" />
          </p>
        )
        }
    </div>
  )
}

export default Challenge
