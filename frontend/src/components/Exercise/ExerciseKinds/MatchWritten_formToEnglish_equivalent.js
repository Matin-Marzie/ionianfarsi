import React, { useEffect } from 'react';

function MatchWritten_formToEnglish_equivalent({
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

  
  // Update `someWords` and `someWordsShuffled` when `words` or `shuffledWords` changes
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
            disabled={word.disabled}
          >
            <li>
              <span>{word.written_form}</span>
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
              <span>{word.english_equivalent}</span>
            </li>
          </button>
        ))}
      </ul>
    </div>
  );
}

export default MatchWritten_formToEnglish_equivalent;
