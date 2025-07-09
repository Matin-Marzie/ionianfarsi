import { useEffect, useState } from "react";
import OriginDestinationContainer from "./sort_components/OriginDestinationContainer";
import ListenSortWord from './sort_components/Listen_sort_word';
import ListenSortSentence from './sort_components/Listen_sort_sentence';
import ReadFarsiSortEnglishEquivalentSentence from './sort_components/Read_farsi_sort_english_equivalent_sentence';
import ReadFarsiSortWord from './sort_components/Read_farsi_sort_word';
import ReadEnglishEquivalentSortFarsiSentence from './sort_components/Read_english_equivalent_sort_farsi_sentence';

const Challenge_sort = ({
  playSound,
  nextChallengeSound,
  wrongAnswerSound,
  setDisplayContinue,
  displayContinue,
  setContinueButtonText,
  setContinueText,
  setChallengeIndex,
  challenge,
  setChallenge,
  fisher_yates_shuffle,
  setCorrectAnswer,
}) => {
  const sort_kinds = {
    listen_sort_word: ListenSortWord,
    listen_sort_sentence: ListenSortSentence,
    read_farsi_sort_english_equivalent_sentence: ReadFarsiSortEnglishEquivalentSentence,
    read_english_equivalent_sort_farsi_sentence: ReadEnglishEquivalentSortFarsiSentence,
    read_farsi_sort_word: ReadFarsiSortWord,
  };


  // Generate initial items (words or letters) dynamically from the challenge

  // Determine if it's a sentence or word challenge
  const [isSentence, setIsSentence] = useState(challenge.sentence_written_form !== null);
  const [originItems, setOriginItems] = useState([]);
  const [destinationItems, setDestinationItems] = useState([]);


  useEffect(() => {
    setIsSentence(challenge.sentence_written_form !== null)
    setDestinationItems([])
  }, [setIsSentence, challenge])

  // Handle drag start
  const handleDragStart = (e, item, source) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ item, source }));
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  // Handle drop
  const handleDrop = (e, target) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    const { item, source } = data;

    // Prevent dropping within the same container
    if (source === target) {
      return;
    }

    if (target === "destination") {
      // Move item from origin to destination
      setDestinationItems((prev) => [...prev, item]);
      setOriginItems((prev) => prev.filter((i) => i.id !== item.id));
    } else if (target === "origin") {
      // Move item from destination to origin
      setOriginItems((prev) => [...prev, item]);
      setDestinationItems((prev) => prev.filter((i) => i.id !== item.id));
    }
  };

  // Handle click to move item
  const handleItemClick = (item) => {
    if (originItems.includes(item)) {
      // Move item from origin to destination
      setDestinationItems((prev) => [...prev, item]);
      setOriginItems((prev) => prev.filter((i) => i.id !== item.id));
    } else {
      // Move item from destination to origin
      setOriginItems((prev) => [...prev, item]);
      setDestinationItems((prev) => prev.filter((i) => i.id !== item.id));
    }
  };

  // Check if the item is correct
  const handleCheck = () => {
    const userItem = destinationItems.map((item) => item.content).join("");

    let isAnswerCorrect;
    if (challenge.sort_type === 'read_farsi_sort_english_equivalent_sentence') {
      const targetItem_english_sentence = challenge.sentence_english_equivalent.replace(/\s+/g, "");
      isAnswerCorrect = userItem === targetItem_english_sentence;
    }
    else {
      const targetItem_farsi = isSentence
        ? challenge.sentence_written_form.replace(/\s+/g, "") // Remove spaces for comparison
        : challenge.word_written_form;

      isAnswerCorrect = userItem === targetItem_farsi;
      console.log()
    }


    if (isAnswerCorrect) {
      playSound(nextChallengeSound);
      setCorrectAnswer(true);
      setDisplayContinue(true);

      if (challenge.sort_type === 'listen_sort_word') {
        setContinueText(`${challenge.word_english_equivalent}`)
      }
      else if (challenge.sort_type === 'listen_sort_sentence') {
        setContinueText(`${challenge.sentence_english_equivalent}`)
      }
      else if (challenge.sort_type === 'read_farsi_sort_word') {
        setContinueText(`${challenge.word_english_equivalent}`)
      }
      

    }
    else {
      playSound(wrongAnswerSound);
      setCorrectAnswer(false);
      setDisplayContinue(true);

      if (challenge.sort_type === 'listen_sort_word') {
        setContinueText(`${challenge.word_written_form}`)
      }
      else if (challenge.sort_type === 'listen_sort_sentence') {
        setContinueText(`${challenge.sentence_written_form}`)
      }
      else if (challenge.sort_type === 'read_farsi_sort_english_equivalent_sentence') {
        setContinueText(`${challenge.sentence_english_equivalent}`)
      }
      else if(challenge.sort_type === 'read_english_equivalent_sort_farsi_sentence'){
        setContinueText(`${challenge.sentence_written_form}`)
      }
      else if (challenge.sort_type === 'read_farsi_sort_word') {
        setContinueText(`${challenge.word_written_form.split("").join(" ")}`)
      }
    }
  };

  const ChallengeComponent = sort_kinds[challenge.sort_type];

  return (
    <div className="p-4 text-2xl h-full flex flex-col space-y-4">
      <h2 className="font-semibold">{challenge.question}</h2>
      <div className="flex flex-col flex-grow items-center justify-between">
        {/* Render the appropriate challenge component */}
        <ChallengeComponent
          challenge={challenge}
          playSound={playSound}
          setContinueText={setContinueText}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleItemClick={handleItemClick}
          handleDragStart={handleDragStart}
          destinationItems={destinationItems}
          setOriginItems={setOriginItems}
          fisher_yates_shuffle={fisher_yates_shuffle}
        />

        {/* Origin Container */}
        <OriginDestinationContainer
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleDragStart={handleDragStart}
          originItems={originItems}
          handleItemClick={handleItemClick}
          destinationItems={destinationItems}
          challenge={challenge}
          playSound={playSound}
        />

        {/* Check Button */}
        <button
          onClick={handleCheck}
          disabled={displayContinue || destinationItems.length === 0}
          className="p-2 bg-green-500 text-white font-bold rounded-lg w-full"
        >
          Check
        </button>

      </div>
    </div>
  );
};

export default Challenge_sort;