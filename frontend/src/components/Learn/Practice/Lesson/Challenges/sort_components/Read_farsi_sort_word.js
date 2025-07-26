import { useEffect } from "react"
import { ImVolumeMedium } from "react-icons/im"

const Read_farsi_sort_word = ({
  challenge,
  playSound,
  setContinueText,
  handleDragOver,
  handleDrop,
  handleItemClick,
  handleDragStart,
  destinationItems,
  setOriginItems,
  fisher_yates_shuffle
}) => {

  useEffect(() => {
    setOriginItems(fisher_yates_shuffle(challenge.word_written_form.split("").map((letter, index) => ({
      id: index + 1, // Unique ID for each letter
      content: letter, // The letter itself
    }))))
  }, [challenge, setOriginItems, fisher_yates_shuffle])


  return (
    <div className='w-full space-y-4 caret-transparent'>

      <div className="h-[25dvh] w-auto flex items-center justify-center">
        {challenge.word_image_url ? (
          <img
            src={challenge.word_image_url}
            alt={challenge.word_written_form}
            className="io-button max-h-full w-auto cursor-pointer rounded-[18px]"
            onClick={() => playSound(challenge.word_audio_url)}
          />
        ) : (
          <button
            className="io-button text-6xl p-8 bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center"
            onClick={() => playSound(challenge.word_audio_url)}
          >
            <ImVolumeMedium style={{ transform: "rotateZ(180deg)" }} />
          </button>
        )}
      </div>

      {/* Display concatinated word */}
      <div className="w-full text-center min-h-[6.5dvh]">
        {challenge.word_written_form}
      </div>
    </div >
  )
}

export default Read_farsi_sort_word