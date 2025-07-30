import { useContext } from "react";
import LessonContext from "../../../../../../context/LessonContext";
import { fetchLettersPronoun } from "../../../../../../api/LearnApi";
import { useQuery } from '@tanstack/react-query';

const OriginDestinationContainer = ({
  handleDragOver,
  handleDrop,
  handleDragStart,
  originItems,
  handleItemClick,
  destinationItems
}) => {

  const { challenge, playSound, hasSwiped } = useContext(LessonContext);

  // ----------------------Fetch-Letter-pronounciations----------------------
const { data: lettersAudio } = useQuery({
  queryKey: ["lettersAudio", challenge],
  queryFn: ({ signal }) => fetchLettersPronoun({ signal }),
  enabled: !!challenge, // prevents running if challenge is null/undefined
});

  return (
    <div className="w-full">
      {/* Destination Container */}
      <div
        className="min-h-[20dvh] border-2 border-dashed border-gray-500 p-2 rounded mb-4 flex gap-2 justify-center items-start flex-wrap flex-row-reverse"
        onDragOver={(e) => {if(hasSwiped) return; handleDragOver(e)}}
        onDrop={(e) => handleDrop(e, "destination")}
      >
        {destinationItems?.map((item) => (
          <div
            key={item.id}
            className={`io-button cursor-pointer bg-bluesea text-white px-4 py-1 rounded`}
            draggable={!hasSwiped}
            onDragStart={(e) =>{ if(hasSwiped) return; handleDragStart(e, item, "destination")}}
            onClick={() => {
              if(hasSwiped) return;
              const word_pronounciation = challenge.sentence_words?.find(
                (word) => {
                  return word.audio_url && word.written_form === item.content;
                }
              );
              if (word_pronounciation) {
                playSound(word_pronounciation.audio_url);
              }

              const letter_pronounciation =
                lettersAudio?.find((letter) => {
                  return letter.written_form === item.content;
                });
              if (letter_pronounciation) {
                playSound(letter_pronounciation.audio_url);
                console.log(letter_pronounciation);
              }

              handleItemClick(item);
            }}
          >
            {item.content}
          </div>
        ))}
      </div>

      {/* ORIGIN */}
      <div
        className="w-full border-4 border-gray-300 p-2 rounded flex flex-wrap gap-2 justify-center items-center min-h-[15dvh]"
        onDragOver={(e) => {if(hasSwiped) return; handleDragOver(e)}}
        onDrop={(e) => handleDrop(e, "origin")}
      >
        {originItems.map((item) => (
          <div
            key={item.id}
            disabled
            className="cursor-pointer bg-bluesea text-white px-3 py-2 rounded shadow-md io-button"
            draggable
            onDragStart={(e) =>{ if(hasSwiped) return; handleDragStart(e, item, "origin")}}
            onClick={() => {
              if(hasSwiped) return;
              const word_pronounciation = challenge.sentence_words?.find(
                (word) => {
                  return word.audio_url && word.written_form === item.content;
                }
              );
              if (word_pronounciation) {
                playSound(word_pronounciation.audio_url);
              }

              const letter_pronounciation =
                lettersAudio?.find((letter) => {
                  return letter.written_form === item.content;
                });
              if (letter_pronounciation) {
                playSound(letter_pronounciation.audio_url);
              }

              handleItemClick(item);
            }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OriginDestinationContainer;
