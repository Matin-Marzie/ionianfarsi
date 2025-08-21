import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchLessons } from '../../../api/LearnApi';
import Unit from './Unit';

const Practice = () => {
  const location = useLocation();
  const currentSection = location.state?.currentSection || 1;

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
          unit={unit}
          currentSection={currentSection}
        />
      ))}
    </div>
  );
};

export default Practice;
