import { useQuery } from "@tanstack/react-query";
import { fetchLessonChallenges } from "../../../../../api/LearnApi";

const Lesson = ({ lessonId }) => {
  const { data: lessonChallenges, isLoading } = useQuery({
    queryKey: ["challenges", lessonId],
    queryFn: ({ signal }) => fetchLessonChallenges({ lessonId, signal }),
    staleTime: Infinity,
  });


  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Lesson page</h1>
      {lessonChallenges?.map((c, i) => (
        <div key={c.id || i}>{c.title}</div>
      ))}
    </div>
  );
};

export default Lesson;
