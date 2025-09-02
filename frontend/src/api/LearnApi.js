import api from '../api/api.js'


// --------------------Vocabulary--------------------
export const getVocabulary = async ({ signal, axiosInstance, currentLesson }) => {
  const response = await axiosInstance.get(
    `/api/vocabulary?id=${currentLesson}`,
    { signal }
  );
  return response.data;
};


// --------------------Practice--------------------
export const fetchLessons = async ({ sectionId }) => {  //F etch units
  const response = await api.get(`/api/lessons?section_id=${sectionId}`);
  return response.data;
};

// Fetch-sections
export const fetchSections = async () => {
  const response = await api.get("/api/sections");
  return response.data;
};

// Fetch-single-Lesson
export const fetchLessonChallenges = async ({ lessonId, signal, axiosInstance = api }) => {
  const response = await axiosInstance.get(`/api/lessons?lesson_id=${lessonId}`, { signal });
  return response.data;
};;

// Fetch-letters-pronunciation
export const fetchLettersPronoun = async ({ signal }) => {
  const response = await api.get("/api/letters/pronunciation", { signal });
  return response.data;
};


// --------------------Grammer--------------------