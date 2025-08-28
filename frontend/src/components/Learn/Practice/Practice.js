import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchLessons } from '../../../api/LearnApi';
import Unit from './Unit';
import useAuth from '../../../hooks/UseAuth';
import { useEffect } from 'react';

const Practice = () => {
  const location = useLocation();
  const currentSection = location.state?.currentSection || 1;
  const { auth } = useAuth();
  const user = auth?.user;
  const currentUnitOrder = user?.current_unit_order || 0;

  const {
    data: units,
    isLoading: loading,
    error
  } = useQuery({
    queryKey: ['lessons', currentSection],
    queryFn: () => fetchLessons({ sectionId: currentSection }),
    staleTime: Infinity,
    cacheTime: Infinity,
    keepPreviousData: true
  });



  useEffect(() => {
    if (user?.current_unit) {
      const el = document.getElementById(`unit-${user.current_unit}`);
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
    <div className='flex flex-col flex-grow h-full'>
      {/* Units */}
      {units?.map(unit => (
        <Unit
          key={unit.unit_order}
          id={`unit-${unit.unit_id}`}
          unit={unit}
          currentSection={currentSection}
        />
      ))}
    </div>
  );
};

export default Practice;
