import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchLessons } from '../../../api/LearnApi';


const Practice = () => {
  const location = useLocation();
  const currentSection = location.state?.currentSection || 1;

  // Use react-query to fetch lessons
  const {
    data: lessons,
    isLoading: loading,
    error
  } = useQuery({
    queryKey: ['lessons', currentSection],
    queryFn: () => fetchLessons({sectionId: currentSection}),
    staleTime: Infinity,
    cacheTime: Infinity,
    keepPreviousData: true,
  });

  // Cluster lessons to units
  const unitsObject = lessons?.reduce((units, lesson) => {
    if (!units[lesson.unit_id]) {
      units[lesson.unit_id] = {
        unit_id: lesson.unit_id,
        unit_title: lesson.unit_title,
        unit_order: lesson.unit_order,
        lessons: []
      };
    }
    units[lesson.unit_id].lessons.push(lesson);
    return units;
  }, {});

  // Convert object to array
  const units = Object.values(unitsObject || {});

  return (
    <div>
      {loading && <p className='w-full text-center text-2xl'>We're using Free plan of Render: Free instances spin down after periods of inactivity (50 seconds Loading time needed)</p>}

      {error && <p className='w-full text-center text-2xl'>Error: {error.message}</p>}

      {/* Map through units in a section */}
      {!loading && !error && units.map((unit) => (
        <article key={unit.unit_id} className='px-4 py-0.5 flex flex-col space-y-4'>
          <Link to='sections' className='bg-bluesea io-button p-4 sticky top-4 z-20'>
            <h5>Section {currentSection} Unit {unit.unit_order}</h5>
            <h5>{unit.unit_title}</h5>
          </Link>

          {/* Map through lessons in a unit */}
          <div className='flex min-h-[50dvh] items-center overflow-scroll justify-evenly space-x-16'>
            {unit.lessons.map((lesson) => (
              <div key={`${unit.id}-${lesson.id}`} className="relative">
                <Link className="io-drop bg-bluesea" to={`/learn/lesson/${lesson.id}`}>
                  <div className="io-drop-content">Lesson {lesson.lesson_order}</div>
                </Link>
                <span className="io-drop-shadow"></span>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
};

export default Practice;
