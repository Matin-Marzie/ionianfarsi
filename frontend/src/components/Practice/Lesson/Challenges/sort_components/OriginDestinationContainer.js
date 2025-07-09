import React, { useState } from 'react'
import api from '../../../../../api/api';
import { useEffect } from 'react';

const OriginDestinationContainer = ({
  handleDragOver,
  handleDrop,
  handleDragStart,
  originItems,
  handleItemClick,
  destinationItems,
  challenge,
  playSound,
}) => {


  const [fetched_letters_pronounciation, setlettersAudio] = useState([]);
    // ----------------------Fetch-Letter-pronounciations----------------------
    useEffect(() => {
      const fetchChanllenges = async () => {
        try {
          const response = await api.get(`/letters/pronounciation`);
          setlettersAudio(response.data);
        } catch (err) {
        }
      };
      fetchChanllenges();
    }, [challenge]);



  return (
    <div className='w-full'>
      {/* Destination Container */}
      <div
        className="min-h-[20dvh] border-2 border-dashed border-gray-500 p-2 rounded mb-4 flex gap-2 justify-center items-start flex-wrap flex-row-reverse"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "destination")}
      >
        {destinationItems?.map((item) => (
          <div
            key={item.id}
            className="io-button cursor-pointer bg-bluesea text-white px-4 py-1 rounded"
            draggable
            onDragStart={(e) => handleDragStart(e, item, "destination")}
            onClick={() => {

              const word_pronounciation = challenge.sentence_words?.find((word) => {
                return word.audio_url && word.written_form === item.content;
              })
              if(word_pronounciation){
                playSound(word_pronounciation.audio_url)
              }


              const letter_pronounciation = fetched_letters_pronounciation?.find((letter) => {
                return letter.written_form === item.content;
              })
              if(letter_pronounciation){
                playSound(letter_pronounciation.audio_url)
                console.log(letter_pronounciation)
              }

              handleItemClick(item)
            }
            }
          >
            {item.content}
          </div>
        ))}
      </div>
      <div
        className="w-full border-4 border-gray-300 p-2 rounded flex flex-wrap gap-2 justify-center items-center min-h-[15dvh]"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "origin")}
      >
        {originItems.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer bg-bluesea text-white px-3 py-2 rounded shadow-md io-button"
            draggable
            onDragStart={(e) => handleDragStart(e, item, "origin")}
            onClick={() => {

              const word_pronounciation = challenge.sentence_words?.find((word) => {
                return word.audio_url && word.written_form === item.content;
              })
              if(word_pronounciation){
                playSound(word_pronounciation.audio_url)
              }


              const letter_pronounciation = fetched_letters_pronounciation?.find((letter) => {
                return letter.written_form === item.content;
              })
              if(letter_pronounciation){
                playSound(letter_pronounciation.audio_url)
              }

              handleItemClick(item)
            }
            }
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default OriginDestinationContainer