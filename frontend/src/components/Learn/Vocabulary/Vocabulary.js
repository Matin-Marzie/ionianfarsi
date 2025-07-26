import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Words from './Words';
import { getVocabulary } from '../../../api/LearnApi';

function Vocabulary({ }) {
  
  const axiosPrivate = useAxiosPrivate();

  // Default value for currentLesson
  let currentLesson = 1;

  const location = useLocation();
  if (location.state && location.state.currentLesson !== null) {
    currentLesson = location.state.currentLesson;
  }

  // Fetch Lesson Data using React Query
  const { data: vocabularyData = [], isLoading, error } = useQuery({
  queryKey: ['vocabulary', currentLesson],
  queryFn: ({ signal }) =>
    getVocabulary({ signal, axiosInstance: axiosPrivate, currentLesson }),
  keepPreviousData: true,
  staleTime: Infinity,
  cacheTime: Infinity
});


  if (isLoading) return <span className='flex align-bottom'>Loading Words...<br />you may need to wait up to 50 seconds in first load</span>;
  if (error) return <p>Failed to fetch vocabulary data</p>;

  return (
    <div className="vocabulary-container">
      {vocabularyData.length > 0 ? (
        vocabularyData.map(({ letter_id, words }, i) => (
          <div key={`${letter_id}-${i}`} className='vocabulary-container-words'>
            <Words letter_id={letter_id} words={words} />
          </div>
        ))
      ) : (
        <p>No vocabulary data available for this lesson.</p>
      )}
    </div>
  );
}

export default Vocabulary;
