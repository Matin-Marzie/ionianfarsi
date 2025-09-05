import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import LessonContext from '../../../../../context/LessonContext';
import { useQueryClient } from '@tanstack/react-query';

function Header() {
  const { challengeIndex } = useContext(LessonContext);

  // Show how many exercises(ex. 4/10)
  const done_exercise_count = challengeIndex

  //  /learn/:lesson_id
  const { lesson_id } = useParams();

  const queryClient = useQueryClient();
  const lessonData = queryClient.getQueryData(['lesson', lesson_id])
  const exercise_count = lessonData?.challenges?.length || 0;

  const navigate = useNavigate();

  const handleBackClick = (e) => {
    e.preventDefault();
    const confirmed = window.confirm('Are you sure to end the Session?');
    if (confirmed) {
      navigate('./../..');
    }
  };

  return (
    <div className='practice-header-container flex items-center'>
      <a href="/exercise" onClick={handleBackClick} className=''>
        <FaArrowLeft className='text-bluesea text-2xl md:text-2xl font-bold' />
      </a>
      <div className='percentage min-h-[20px]'>
        <div className='percentage-filled'
                                // Header percentage:
          style={{ width: `${((done_exercise_count) / exercise_count) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Header;
