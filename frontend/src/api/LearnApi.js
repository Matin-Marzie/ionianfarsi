import api from '../api/api.js'


// --------------------Vocabulary--------------------
export const getVocabulary = async ({ signal, axiosInstance, currentLesson }) => {
    const response = await axiosInstance.get(
        `/vocabulary?id=${currentLesson}`,
        { signal }
    );
    return response.data;
};


// --------------------Practice--------------------
export const fetchLessons = async ({ sectionId }) => { // Fetch all lessons in a section
    const response = await api.get(`/lessons?section_id=${sectionId}`);
    return response.data;
};

// -----Fetch-single-Lesson-----
export const fetchLessonChallenges = async ({ lessonId, signal, axiosInstance }) => {
  const response = await axiosInstance.get(`/lesson?lesson_id=${lessonId}`, { signal });
  return response.data;
};;


// --------------------Grammer--------------------