import { useQuery } from "@tanstack/react-query";
import { fetchLessonChallenges } from "../../../../../api/LearnApi";
import { useParams } from "react-router-dom";

// Type-specific components
import LessonChallenges from "./types/LessonChallenges.js";
import LessonWatchVideo from "./types/LessonWatchVideo.js";
import { useContext } from "react";
import LessonContext from "../../../../../context/LessonContext.js";
import Header from "./Header.js"
import EndOfLesson from "./EndOfLesson.js";


const Lesson = () => {

  const { challengeIndex } = useContext(LessonContext);

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

  
  // If loading, show the spinner
  if (isLoading) return (
    <p>Loading</p>
  );


  return (
    <div className="m-auto flex flex-col h-full w-full max-w-screen-md bg-white">
      <Header challnegeIndex={challengeIndex}/>

      {lessonData?.challenges[challengeIndex] ?
      (
        <LessonComponent lessonData={lessonData} challengeIndex={challengeIndex} lesson_id={lesson_id}/>
      )
      :
      (
        <EndOfLesson />
      )}
    </div>
  );
};

export default Lesson;
