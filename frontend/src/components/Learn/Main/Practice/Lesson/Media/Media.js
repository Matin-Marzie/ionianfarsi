import MediaDialogue from "./MediaDialogue.js"
import MediaWordSentence from "./MediaWordSentence.js"

const Media = ({ challenge }) => {

  return (
    <div className="">
      {challenge?.word || challenge?.sentence ?
        <MediaWordSentence />
        :
        <MediaDialogue dialogue={challenge?.dialogue} />
      }
    </div>
  );
}

export default Media;
