import React, { useEffect } from 'react';

function MatchPictureToWritten_form({
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
  // Use useEffect to update `someWords` and `someWordsShuffled` when `words` or `shuffledWords` changes
  useEffect(() => {
    const selectedWords = words.slice(0, 4); // Keep 4 words
    setSomeWords(selectedWords);
    setSomeWordsShuffled(
      shuffledWords.filter((shuffledWord) =>
        selectedWords.some((word) => word.id === shuffledWord.id)
      )
    );
  }, [words, shuffledWords, setSomeWords, setSomeWordsShuffled]);

  return (
    <div className="Match-container">
      <ul className="left-col">
        {someWords.map((word) => (
          <button
            key={word.id + '-left'}
            className={`${
              !word.disabled
                ? `io-button ${word.id === leftSelected?.id ? 'io-selected-img' : ''}`
                : 'opacity-50'
            }`}
            onClick={() => handleLeftSelect(word)}
            disabled={word.disabled}
          >
            <li>
              <img
                src={word.image_url}
                alt={word.english_equivalent}
                className="word-image"
              />
            </li>
          </button>
        ))}
      </ul>
      <ul className="right-col">
        {someWordsShuffled.map((word) => (
          <button
            key={word.id + '-right'}
            className={`match-word ${
              word.disabled
                ? ''
                : `io-button ${word.id === rightSelected?.id ? 'io-selected' : ''}`
            }`}
            onClick={() => {
              playSound(word.audio_url);
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

export default MatchPictureToWritten_form;
