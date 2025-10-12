import { useContext, useEffect, useState, useCallback } from "react";
import LessonContext from "../../../../../../context/LessonContext";
import { MdOutlineSwipeUp } from "react-icons/md";

import OriginDestinationContainer from "./sort_components/OriginDestinationContainer";

const ChallengeSort = () => {
  const {
    challenge,
    playSound,
    setDisplayAnswer,
    setAnswerText,
    setCorrectAnswer,
    wrongAnswerSound,
    hasSwiped,
    destinationItems,
    setDestinationItems,
    fisher_yates_shuffle,
  } = useContext(LessonContext);

  const [originItems, setOriginItems] = useState([]);

  useEffect(() => {
    setDestinationItems([]);

    // Set originItems based on the challenge type, shuffled
    if (challenge) {
      if (challenge.content.sort_type === "letters" || challenge.content.sort_type === "letters_with_audio") {
        // split the word into letters and shuffle
        setOriginItems(
          fisher_yates_shuffle(
            challenge.content.word.written_form.split("").map((letter, i) => ({
              id: i,
              content: letter
            }))
          )
        );
      }
      else if (challenge.content.sort_type === "english_equivalent") {
        // split the english_equivalent into words and shuffle
        setOriginItems(
          fisher_yates_shuffle(
            (challenge.content.sentence?.english_equivalent || "").split(" ").map((word, i) => ({
              id: i,
              content: word
            }))
          )
        );
      } else if (challenge.content.sort_type === "words") {
        // use the sentence_words array Farsi words and shuffle
        setOriginItems(
          fisher_yates_shuffle(
            challenge.content.sentence_words.map((word) => ({
              id: word.id,
              content: word.written_form,
              audio_url: word.audio_url
            }))
          )
        );
      } else {
        setOriginItems([]);
      }
    } else {
      setOriginItems([]);
    }

  }, [challenge, setDestinationItems, fisher_yates_shuffle]);

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


  const check_Sort = useCallback(() => {
    let isAnswerCorrect = false;
    let target = "";

    if (challenge?.content?.sort_type === "letters" || challenge?.content?.sort_type === "letters_with_audio") {
      // Join letters and compare to word written_form
      target = challenge.content.word.written_form;
      let userItem = destinationItems.map((item) => item.content).join("");
      isAnswerCorrect = userItem === target;
    } else if (challenge?.content?.sort_type === "words") {
      // Join words and compare to sentence.written_form (no stripping)
      target = challenge.content.sentence?.written_form || "";
      let userItem = destinationItems.map((item) => item.content).join(" ");
      isAnswerCorrect = userItem === target;
    } else if (challenge?.content?.sort_type === "english_equivalent") {
      // Join and compare to english_equivalent, compare as words, reversed (no stripping)
      target = challenge.content.sentence.english_equivalent || "";
      const userItems = destinationItems.map((item) => item.content).join(" ");
      isAnswerCorrect = userItems === target;
    }

    setDisplayAnswer(true);
    if (isAnswerCorrect) {
      setCorrectAnswer(true);
      setAnswerText(target);
    } else {
      playSound(wrongAnswerSound);
      setCorrectAnswer(false);
      setAnswerText(target);
    }
  }, [challenge, destinationItems, playSound, setAnswerText, setCorrectAnswer, setDisplayAnswer, wrongAnswerSound]);



  useEffect(() => {
    if (hasSwiped) check_Sort();
  }, [hasSwiped, check_Sort])


  return (
    <div className="px-4 text-2xl h-full flex flex-col space-y-4 w-full justify-end">
      
      {/* <h2 className="font-semibold">{challenge.question}</h2> */}

      {/* Display concatinated word */}
      { ["letters", "letters_with_audio"].includes(challenge?.content?.sort_type) &&
        <div className="w-full text-center min-h-[dvh] grow flex items-end justify-center mb-">
          {destinationItems.map((item) => item.content).join("")}
        </div>
      }

      <div className="flex flex-col items-center">
        <OriginDestinationContainer
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleDragStart={handleDragStart}
          originItems={originItems}
          handleItemClick={handleItemClick}
          destinationItems={destinationItems}
        />

        <p
          className={`mt-6 mb-2 rounded-lg font-bold flex gap-x-4 mx-auto ${!destinationItems.length === 0
            ? 'text-bluesea'
            : 'opacity-40 pointer-events-none'
            }`}
        >
          <span>Swipe Up</span> <MdOutlineSwipeUp className="text-4xl" />
        </p>
      </div>
    </div>
  );
};

export default ChallengeSort;
