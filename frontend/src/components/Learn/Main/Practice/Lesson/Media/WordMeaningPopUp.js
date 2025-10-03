const WordMeaningPopUp = ({ word, style }) => {
  if (!word) return null;

  return (
    <div style={style} className="relative z-50">
      {/* Speech bubble */}
      <div
        className=" text-center relative"
        style={{
          // Custom CSS for the tail using ::before
          // Tailwind can't do pseudo-elements directly, so we use inline style here
        }}
      >
        {/* Bubble tail using ::before */}
        <style>
          {`
            .speech-bubble::before {
              content: "";
              position: absolute;
              top: -8px;
              left: 50%;
              transform: translateX(-50%);
              border-width: 0 10px 10px 10px;
              border-style: solid;
              border-color: transparent transparent #fff transparent;
              filter: drop-shadow(0 -1px 0 #d1d5db);
              width: 0;
              height: 0;
              z-index: 1;
            }
          `}
        </style>
        <div className="speech-bubble relative bg-white border border-gray-300 rounded-2xl shadow-lg p-2">
          <div className="font-bold text-lg mb-1">{word.written_form}</div>
          {word.transliteration && (
            <div className="text-sm text-gray-500 mb-1">{word.transliteration}</div>
          )}
          {word.english_equivalent && (
            <div className="text-sm text-blue-700 mb-1">{word.english_equivalent}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordMeaningPopUp;
