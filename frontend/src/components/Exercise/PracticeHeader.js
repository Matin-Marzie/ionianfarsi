import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function PracticeHeader({ percentage, exercise_count }) {
  // Show how many exercises(ex. 4/10) we have done in the practice session
  const navigate = useNavigate();

  const handleBackClick = (e) => {
    e.preventDefault();
    const confirmed = window.confirm('Are you sure to end the Session?');
    if (confirmed) {
      navigate('/exercise');
    }
  };

  return (
    <div className='practice-header-container'>
      <a href="/exercise" onClick={handleBackClick} className=''>
        <FaArrowLeft />
      </a>
      <div className='percentage'>
        <div className='percentage-filled' style={{ width: `${((percentage -1)/exercise_count) * 100}%` }}></div>
      </div>
    </div>
  );
}

export default PracticeHeader;
