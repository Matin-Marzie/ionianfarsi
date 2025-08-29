import React, { useState } from 'react';
import { IoVolumeMedium } from "react-icons/io5";
import { FaRotate } from "react-icons/fa6";


function Words({ letter_id, words }) {

  // To play Sound
  const [currentAudio, setCurrentAudio] = useState(null);
  const playSound = (sound) => {
    // Stop the currently playing sound
    if (currentAudio && currentAudio.currentTime > 0) {
      currentAudio.pause();
    }
    // Create and play the new audio
    const newAudio = new Audio(sound);
    setCurrentAudio(newAudio); // Set the new audio as the current one
    newAudio.play();

    // Remove the reference when the sound finishes
    newAudio.onended = () => setCurrentAudio(null);
  };

  // Function to flipp the card
  const [flippedCards, setFlippedCards] = useState({});
  const handleFlip = (wordId) => {
    setFlippedCards((prev) => ({
      ...prev,
      [wordId]: !prev[wordId],
    }));
  }


  return (
    <div className='word-container'>
      <h5>Letter ID: {letter_id}</h5>
      <div key={letter_id} className='card-container'>
        {words && words.map(word => (

          <div className={`card ${flippedCards[word.id] ? 'card-flipped-true' : ''}`}>
            {/* FRONT */}
              <button onClick={() => playSound(word.audio_url)} className='io-button'>
                {<img src={word.image_url} alt={word.written_form} className='img' />}
                <div className='description'>
                  <strong>
                    {word.written_form}
                  </strong>
                  <IoVolumeMedium className='svg' />
                </div>
              </button>
              <button className='io-button flip-button' onClick={() => handleFlip(word.id)}>
                <FaRotate />
              </button>

            {/* BACK */}
            <div className="back">
              <button className='io-button flip-button' onClick={() => handleFlip(word.id)}>
                <FaRotate />
              </button>
              <p className='flex grow justify-center items-center'>
                {word.english_equivalent}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Words;
