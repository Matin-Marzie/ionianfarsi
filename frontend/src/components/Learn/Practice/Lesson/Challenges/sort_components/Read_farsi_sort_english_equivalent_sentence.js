import { useContext, useEffect } from "react"
import { ImVolumeMedium } from "react-icons/im"
import LessonContext from "../../../../../../context/LessonContext"

const Read_farsi_sort_english_equivalent_sentence = ({
  setOriginItems,
}) => {

  const { challenge, playSound, fisher_yates_shuffle } = useContext(LessonContext);

  useEffect(() => {
    setOriginItems(fisher_yates_shuffle(challenge.sentence_english_equivalent.split(" ").map((word, index) => ({
      id: index + 1, // Unique ID for each word
      content: word, // The word itself
    }))))
  }, [challenge, setOriginItems, fisher_yates_shuffle])

  return (
    <div className='w-full space-y-8 caret-transparent text-center'>


      {/* Sentence */}
      <div className='flex justify-end items-start text-right'>
        <p className="underline underline-offset-[10px] leading-loose">
          {challenge.sentence_written_form}
        </p>
        {/* Audio Button */}
        <button
          className="io-button text-3xl p-3 bg-blue-500 text-white hover:bg-blue-600 ml-4"
          onClick={() => playSound(challenge.sentence_audio_url)}
        >
          <ImVolumeMedium style={{ transform: "rotateZ(180deg)" }} />
        </button>
      </div>

    </div >
  )
}

export default Read_farsi_sort_english_equivalent_sentence;