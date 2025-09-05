import Media from '../Media/Media.js'
import Challenge from "../Challenges/Challenge.js"

const LessonChallenges = ({lessonData, challengeIndex, lesson_id}) => {


  return (
    <div className="flex-grow">
      <Media challenge={lessonData?.challenges[challengeIndex]}/>
      <Challenge />
    </div>
  )
}

export default LessonChallenges
