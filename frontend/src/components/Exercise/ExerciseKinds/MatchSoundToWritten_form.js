import React, { useEffect } from 'react';
import { GiSoundWaves } from "react-icons/gi";

function MatchSoundToWritten_form({
  words,
  shuffledWords,
  playSound,
  handleLeftSelect,
  handleRightSelect,
  rightSelected,
  leftSelected,
  someWords,
  setSomeWords,
  someWordsShuffled,
  setSomeWordsShuffled,
}) {
  // UseEffect to update state when words or shuffledWords change
  useEffect(() => {
    setSomeWords(words);
    setSomeWordsShuffled(shuffledWords);
  }, [words, shuffledWords, setSomeWords, setSomeWordsShuffled]);

  return (
    <div className="Match-container">
      <ul className="left-col">
        {someWords.map((word) => (
          <button
            key={word.id + '-left'}
            className={`match-word ${
              word.disabled ? '' : `io-button ${word.id === leftSelected?.id ? 'io-selected' : ''}`
            }`}
            onClick={() => {
              playSound(word.audio_url);
              handleLeftSelect(word);
            }}
            // Disable the button when the item has been matched
            disabled={word.disabled}
          >
            <li>
              <GiSoundWaves style={{ fontSize: '3rem' }} />
            </li>
          </button>
        ))}
      </ul>
      <ul className="right-col">
        {someWordsShuffled.map((word) => (
          <button
            key={word.id + '-right'}
            className={`match-word ${
              word.disabled ? '' : `io-button ${word.id === rightSelected?.id ? 'io-selected' : ''}`
            }`}
            onClick={() => {
              handleRightSelect(word);
            }}
            disabled={word.disabled}
          >
            <li>
              <span>{word.written_form}</span>
            </li>
          </button>
        ))}
      </ul>
    </div>
  );
}

export default MatchSoundToWritten_form;
