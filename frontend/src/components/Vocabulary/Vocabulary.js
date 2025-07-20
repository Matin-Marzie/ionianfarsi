import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Words from './Words';

function Vocabulary({ BACKEND_API_HOSTNAME }) {

  const axiosPrivate = useAxiosPrivate();

  const [vocabularyData, setVocabularyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default value for currentLesson
  var currentLesson = 1;

  const location = useLocation();
  if (location.state && location.state.currentLesson !== null) {
    currentLesson = location.state.currentLesson;
  }

  // Fetch Lesson Data
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchVocabulary = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(`${BACKEND_API_HOSTNAME}/vocabulary?id=${currentLesson}`,
          { signal: controller.signal }
        );
        isMounted && setVocabularyData(response.data);
      }
      catch (err) {
        setError("Failed to fetch vocabulary data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVocabulary();
    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [currentLesson, BACKEND_API_HOSTNAME, axiosPrivate]);


  if (loading) return <span className='flex align-bottom'>Loading Words...<br />you may need to wait up to 50 seconds in first load</span>;
  if (error) return <p>{error}</p>;

  return (
    <div className="vocabulary-container">
      <h2 className='choose-lesson'>
        <Link
          className='a io-button'
          to="/vocabulary/choose-lesson"
        >
          Lesson {currentLesson}
        </Link>
      </h2>
      {vocabularyData.length > 0 ? (
        vocabularyData.map(({ letter_id, words }, i) => (
          <div key={i} className='vocabulary-container-words'>
            <Words letter_id={letter_id} words={words} />
          </div>
        ))
      ) : (
        <p>No vocabulary data available for this lesson.</p>
      )}
      <br /><br /><br />
    </div>
  );
}

export default Vocabulary;



// TESTIN UPLOADING FILES
// const [file, setFile] = useState();

// const handleFile = (e) => {
//   setFile(e.target.files[0])
// }

// const handleUpload = () => {
//   const formData = new FormData();
//   formData.append('image', file);
//   axios.post('http://localhost:8081/upload', formData)
//     .then(res => console.log(res))
//     .catch(err => console.log(err));
// }

// return (
//   <div className='container'>
//     <input type="file" onChange={handleFile} />
//     <button onClick={handleUpload} >upload</button>
//   </div>
// )