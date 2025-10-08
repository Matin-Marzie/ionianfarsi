import { useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Unit from './Unit';
import { fetchLessons, fetchLessonChallenges } from '../../../../api/LearnApi';
import AuthContext from '../../../../context/AuthProvider';

const Practice = () => {

  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);

  // Current section (section user viewing or user section)
  const currentSection = location.state?.currentSection || user?.section?.section_id;

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


  useEffect(() => {
    // wait until units are fetched
    if (loading || !units) return;

    if (user.reset_data) {
      // Find current unit
      const currentUnit = units.find(
        u => u.unit_id === user.unit.unit_id
      );

      // Find current repetition inside that unit
      const currentRepetition = currentUnit?.repetitions?.find(
        r => r.repetition_id === user.repetition.repetition_id
      );

      // Find current lesson inside that repetition
      const currentLesson = currentRepetition?.lessons?.find(
        l => l.lesson_id === user.lesson.lesson_id
      );

      if (currentUnit && currentRepetition && currentLesson) {
        setUser({
          ...user,
          unit: currentUnit,
          repetition: currentRepetition,
          lesson: currentLesson,
          reset_data: false,
        });
      }
    }
  }, [loading, units, user, setUser]);


  // Fetch user's current lesson data
  useQuery({
    queryKey: ['challenges', user.lesson.lesson_id],
    queryFn: ({ signal }) => fetchLessonChallenges({ lessonId: user.lesson.lesson_id, signal }),
    staleTime: Infinity,
  });



  // Scroll to user's current unit
  useEffect(() => {
    const el = document.getElementById(`unit-${user.unit.unit_id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
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
        />
      ))}

      {/* footer */}
      <div className='flex items-center justify-center py-1'>
        ionianfarsi - ایونیان فارسی
      </div>
    </div>
  );
};

export default Practice;
