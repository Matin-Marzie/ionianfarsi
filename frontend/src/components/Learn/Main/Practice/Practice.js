import { useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Unit from './Unit';
import { fetchLessons, fetchLessonChallenges } from '../../../../api/LearnApi';
import useAuth from '../../../../hooks/UseAuth';
import LessonContext from '../../../../context/LessonContext';

const Practice = () => {

  const location = useLocation();
  const { user } = useAuth();

  // LessonContext values
  const {
    setCurrentUnit,
    setCurrentRepetition,
    setCurrentLesson,
  } = useContext(LessonContext);

  // Current section(section user viewing or user section)
  const currentSection = location.state?.currentSection || user.section_id;
  console.log(currentSection)

  // Fetch all units in a section with repetitions and lessons inside of unit
  const {
    data: units,
    isLoading: loading,
    error
  } = useQuery({
    queryKey: ['section', currentSection],
    queryFn: () => fetchLessons({ sectionId: currentSection }),
    staleTime: Infinity,
    cacheTime: Infinity,
    keepPreviousData: true
  });

  // Find current unit
  const currentUnit = units?.find(u => u.unit_id === user.unit_id);

  // Find current repetition inside that unit
  const currentRepetition = currentUnit?.repetitions?.find(
    r => r.repetition_id === user.repetition_id
  );

  // Find current lesson inside that repetition
  const currentLesson = currentRepetition?.lessons?.find(
    l => l.lesson_id === user.lesson_id
  );

  // Fetch user's current lesson data
  useQuery({
    queryKey: ['challenges', user.lesson_id],
    queryFn: ({ signal }) => fetchLessonChallenges({ lessonId: user.lesson_id, signal }),
    staleTime: Infinity,
  });
  
  // After queries and derivations, set LessonContext
  useEffect(() => {
    if (currentUnit) setCurrentUnit(currentUnit);
    if (currentRepetition) setCurrentRepetition(currentRepetition);
    if (currentLesson) setCurrentLesson(currentLesson);
  }, [currentUnit, currentRepetition, currentLesson, setCurrentUnit, setCurrentRepetition, setCurrentLesson]);


  // Scroll to user's current unit
  useEffect(() => {
    if (user.current_unit) {
      const el = document.getElementById(`unit-${user.unit_id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    }
  }, [units, user]);




  if (loading) {
    return <p className='w-full text-center text-2xl'>We're using Free plan of Render: Free instances spin down after inactivity (50s loading time).</p>;
  }

  if (error) {
    return <p className='w-full text-center text-2xl'>Error: {error.message}</p>;
  }

  return (
    <div className='flex flex-col flex-grow'>
      {/* Units */}
      {units?.map(unit => (
        <Unit
          key={unit.unit_order}
          unit={unit}
          currentSection={currentSection}
        />
      ))}
      <div className='flex items-center justify-center py-1'>
        ionianfarsi - ایونیان فارسی
      </div>
    </div>
  );
};

export default Practice;
