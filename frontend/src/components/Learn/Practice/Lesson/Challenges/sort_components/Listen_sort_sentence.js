import { useContext, useEffect } from "react"
import { ImVolumeMedium } from "react-icons/im"
import LessonContext from "../../../../../../context/LessonContext"

const Listen_sort_sentence = ({
  setOriginItems
}) => {

  const { challenge, playSound, fisher_yates_shuffle } = useContext(LessonContext);

  useEffect(() => {
    setOriginItems(fisher_yates_shuffle(challenge.sentence_written_form.split(" ").map((word, index) => ({
      id: index + 1, // Unique ID for each word
      content: word, // The word itself
    }))))
  }, [challenge, setOriginItems, fisher_yates_shuffle])

  return (
    <div className='w-full space-y-8 caret-transparent text-center'>

      <button
        className="io-button text-6xl p-8 bg-blue-500 text-white hover:bg-blue-600"
        onClick={() => playSound(challenge.sentence_audio_url)}
      >
        <ImVolumeMedium style={{ transform: "rotateZ(180deg)" }} />
      </button>

    </div >
  )
}

export default Listen_sort_sentence