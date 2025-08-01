import { useContext, useEffect } from "react"
import LessonContext from "../../../../../../context/LessonContext"

const Listen_sort_sentence = ({
  setOriginItems
}) => {

  const { challenge, fisher_yates_shuffle } = useContext(LessonContext);

  useEffect(() => {
    setOriginItems(fisher_yates_shuffle(challenge.sentence_written_form.split(" ").map((word, index) => ({
      id: index + 1, // Unique ID for each word
      content: word, // The word itself
    }))))
  }, [challenge, setOriginItems, fisher_yates_shuffle])

  return (
    <div className='w-full space-y-8 caret-transparent text-center'>

      {/* Sentence */}
      <div className='flex justify-start text-left'>
        <p className="underline underline-offset-[10px] leading-loose">
          {challenge.sentence_english_equivalent}
        </p>
      </div>
      
    </div >
  )
}

export default Listen_sort_sentence