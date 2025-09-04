import { useQuery } from "@tanstack/react-query";
import { fetchLessonChallenges } from "../../../../../api/LearnApi";
import { useParams } from "react-router-dom";

const Lesson = ({ }) => {

  const { id } = useParams();

  const { data: lessonChallenges, isLoading } = useQuery({
    queryKey: ["challenges", id],
    queryFn: ({ signal }) => fetchLessonChallenges({ lessonId: id, signal }),
    staleTime: Infinity,
  });


  if (isLoading) return (
    <p>Loading</p>
  );

  console.log(lessonChallenges)

  return (
    <div>
      <h1>Lesson page</h1>
      {lessonChallenges?.map((chal) => (
        <div key={chal.challenge_order}>{chal.id} {chal.challenge_order}</div>
      ))}
    </div>
  );
};

export default Lesson;
