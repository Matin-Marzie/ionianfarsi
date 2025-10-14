import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchLessonChallenges } from "../../../../../api/LearnApi.js";

import LessonChallenges from "./types/LessonChallenges.js";
import LessonWatchVideo from "./types/LessonWatchVideo.js";
import { useContext, useEffect } from "react";
import LessonContext from "../../../../../context/LessonContext.js";
import Header from "./Header.js"
import EndOfLesson from "./EndOfLesson.js";


const Lesson = () => {

  const { challengeIndex, isLessonCompleted } = useContext(LessonContext);

  //  /learn/:lesson_id
  const { lesson_id } = useParams();

  // Fetch user's current lesson data
  const { data: lessonData, isLoading } = useQuery({
    queryKey: ["lesson", lesson_id],
    queryFn: ({ signal }) => fetchLessonChallenges({ lessonId: lesson_id, signal }),
    staleTime: Infinity,
  });


  // Map lesson_type to component
  const lesson_components = {
    challenges: LessonChallenges,
    watch_video: LessonWatchVideo,
  };
  // Check if lessonData is undefined because it thows error
  const LessonComponent = lessonData ? lesson_components[lessonData.lesson_type] : null;

  
    // ⚠️ Warn user before reload
    useEffect(() => {
      const handleBeforeUnload = (e) => {
        // Standard message is ignored by most browsers, but preventDefault is required
        e.preventDefault();
        e.returnValue = ''; // This triggers the confirmation dialog
        return '';
      };
  
      window.addEventListener("beforeunload", handleBeforeUnload);
  
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, []);

  // If loading, show the spinner
  if (isLoading) return (
    <p>Loading</p>
  );



  return (
    <div className="m-auto flex flex-col h-full w-full max-w-screen-md bg-white">
      <Header challnegeIndex={challengeIndex} />

      {!isLessonCompleted ?
        (
          <LessonComponent challengeIndex={challengeIndex} lesson_id={lesson_id} lessonData={lessonData} />
        )
        :
        (
          <EndOfLesson />
        )}
    </div>
  );
};

export default Lesson;
