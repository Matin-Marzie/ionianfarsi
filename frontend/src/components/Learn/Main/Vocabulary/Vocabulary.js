import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { getVocabulary } from '../../../../api/LearnApi';
import Words from './Words';
import { useContext } from 'react';
import LessonContext from '../../../../context/LessonContext';
import { FaArrowRight } from 'react-icons/fa';


function Vocabulary() {
  
  const { setLearnPageIndex, setLearnPageScrollDirection } = useContext(LessonContext);
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
    <div className="vocabulary-container bg-white h-full px-2">
      <div className="w-full m-x-auto sticky top-0 z-20 flex">

        {/* Button to sections page overview */}
        <div to='sections' className='io-button-not-rounded bg-bluesea p-1 flex-grow border-r-[1px] flex flex-col text-center'>
          <h5>MY</h5>
          <h5>Vocabulary</h5>
        </div>

        {/* ➡️ */}
        <div className="io-button-not-rounded bg-bluesea rounded-tr-2xl rounded-br-2xl px-2 flex items-center"
          onClick={() => {
              setLearnPageScrollDirection(1)
              setLearnPageIndex((prev => prev + 1))
          }}>
          <FaArrowRight />
        </div>
      </div>


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
