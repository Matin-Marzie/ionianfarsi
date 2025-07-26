import { useContext, useEffect, useState } from "react";
import LessonContext from "../../../../../context/LessonContext";

import OriginDestinationContainer from "./sort_components/OriginDestinationContainer";
import ListenSortWord from "./sort_components/Listen_sort_word";
import ListenSortSentence from "./sort_components/Listen_sort_sentence";
import ReadFarsiSortEnglishEquivalentSentence from "./sort_components/Read_farsi_sort_english_equivalent_sentence";
import ReadFarsiSortWord from "./sort_components/Read_farsi_sort_word";
import ReadEnglishEquivalentSortFarsiSentence from "./sort_components/Read_english_equivalent_sort_farsi_sentence";

const ChallengeSort = () => {
  const {
    challenge,
    playSound,
    setDisplayContinue,
    displayContinue,
    setContinueText,
    setCorrectAnswer,
    nextChallengeSound,
    wrongAnswerSound,
  } = useContext(LessonContext);

  const sort_kinds = {
    listen_sort_word: ListenSortWord,
    listen_sort_sentence: ListenSortSentence,
    read_farsi_sort_english_equivalent_sentence: ReadFarsiSortEnglishEquivalentSentence,
    read_english_equivalent_sort_farsi_sentence: ReadEnglishEquivalentSortFarsiSentence,
    read_farsi_sort_word: ReadFarsiSortWord,
  };

  const [isSentence, setIsSentence] = useState(challenge.sentence_written_form !== null);
  const [originItems, setOriginItems] = useState([]);
  const [destinationItems, setDestinationItems] = useState([]);

  useEffect(() => {
    setIsSentence(challenge.sentence_written_form !== null);
    setDestinationItems([]);
  }, [challenge]);

  const handleDragStart = (e, item, source) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ item, source }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, target) => {
    e.preventDefault();
    const { item, source } = JSON.parse(e.dataTransfer.getData("text/plain"));

    if (source === target) return;

    if (target === "destination") {
      setDestinationItems((prev) => [...prev, item]);
      setOriginItems((prev) => prev.filter((i) => i.id !== item.id));
    } else {
      setOriginItems((prev) => [...prev, item]);
      setDestinationItems((prev) => prev.filter((i) => i.id !== item.id));
    }
  };

  const handleItemClick = (item) => {
    if (originItems.includes(item)) {
      setDestinationItems((prev) => [...prev, item]);
      setOriginItems((prev) => prev.filter((i) => i.id !== item.id));
    } else {
      setOriginItems((prev) => [...prev, item]);
      setDestinationItems((prev) => prev.filter((i) => i.id !== item.id));
    }
  };

  const handleCheck = () => {
    const userItem = destinationItems.map((item) => item.content).join("");
    let isAnswerCorrect;

    if (challenge.sort_type === "read_farsi_sort_english_equivalent_sentence") {
      const target = challenge.sentence_english_equivalent.replace(/\s+/g, "");
      isAnswerCorrect = userItem === target;
    } else {
      const target = isSentence
        ? challenge.sentence_written_form.replace(/\s+/g, "")
        : challenge.word_written_form;
      isAnswerCorrect = userItem === target;
    }

    if (isAnswerCorrect) {
      playSound(nextChallengeSound);
      setCorrectAnswer(true);
      setDisplayContinue(true);

      if (["listen_sort_word", "read_farsi_sort_word"].includes(challenge.sort_type)) {
        setContinueText(challenge.word_english_equivalent);
      } else if (challenge.sort_type === "listen_sort_sentence") {
        setContinueText(challenge.sentence_english_equivalent);
      }
    } else {
      playSound(wrongAnswerSound);
      setCorrectAnswer(false);
      setDisplayContinue(true);

      if (challenge.sort_type === "listen_sort_word") {
        setContinueText(challenge.word_written_form);
      } else if (challenge.sort_type === "listen_sort_sentence") {
        setContinueText(challenge.sentence_written_form);
      } else if (challenge.sort_type === "read_farsi_sort_english_equivalent_sentence") {
        setContinueText(challenge.sentence_english_equivalent);
      } else if (challenge.sort_type === "read_english_equivalent_sort_farsi_sentence") {
        setContinueText(challenge.sentence_written_form);
      } else if (challenge.sort_type === "read_farsi_sort_word") {
        setContinueText(challenge.word_written_form.split("").join(" "));
      }
    }
  };

  const ChallengeComponent = sort_kinds[challenge.sort_type];

  return (
    <div className="p-4 text-2xl h-full flex flex-col space-y-4">
      <h2 className="font-semibold">{challenge.question}</h2>
      <div className="flex flex-col flex-grow items-center justify-between">
        <ChallengeComponent
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleItemClick={handleItemClick}
          handleDragStart={handleDragStart}
          destinationItems={destinationItems}
          setOriginItems={setOriginItems}
        />

        <OriginDestinationContainer
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleDragStart={handleDragStart}
          originItems={originItems}
          handleItemClick={handleItemClick}
          destinationItems={destinationItems}
        />

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

export default ChallengeSort;
