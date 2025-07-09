import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Exercise({ BACKEND_API_HOSTNAME }) {

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all 17 lessons that user can choose one to practice
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_API_HOSTNAME}/firststep/lessons`);
        setLessons(response.data);
      } catch (err) {
        setError("Failed to fetch lessons data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [BACKEND_API_HOSTNAME]);

  if (loading) return <p>Loading lessons, <br />you may need to wait up to 50 seconds in first load</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="lesson-navigator">
      <h2>Choose a Lesson</h2>
      <div className="lessons-container">
        {lessons.map((lesson) => (
          <Link
            key={lesson.number}
            to="./practice"
            state = {{ ChoosenLesson: lesson.number }}
            className="lesson-nav-card io-button"
          >
            Lesson {lesson.number}:
            {lesson.functionality}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Exercise;
