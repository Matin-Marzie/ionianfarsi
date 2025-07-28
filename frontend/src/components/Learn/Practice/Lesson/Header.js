import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import LessonContext from '../../../../context/LessonContext';

function Header() {
  const { challenges, challengeIndex } = useContext(LessonContext);

  const percentage = challengeIndex
  const exercise_count = challenges.length

  // Show how many exercises(ex. 4/10) we have done in the practice session
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
          style={{ width: `${((percentage) / exercise_count) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Header;
