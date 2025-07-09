import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import PracticeHeader from './PracticeHeader';
import Continue from './Continue';

import MatchPictureToWritten_form from './ExerciseKinds/MatchPictureToWritten_form';
import MatchWritten_formToEnglish_equivalent from './ExerciseKinds/MatchWritten_formToEnglish_equivalent';
import MatchSoundToWritten_form from './ExerciseKinds/MatchSoundToWritten_form';

import SuccessSound from './sounds/fanfare.mp3';
import shortSuccessSound from './sounds/short-fanfare.wav';
import wrongAnswer from './sounds/wrong-answer.wav';


function Practice({ BACKEND_API_HOSTNAME }) {
    // -----This is Practice Session-----

    // ----------Function to play Sound----------
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

    // ||----------VARIABLES----------||
    // words: Fetch 6 random words from backend to exercise
    // Depict the words variable on the left bar of match exercise
    const [words, setWords] = useState([]);
    // Shuflle the right side of the match exercise
    const [shuffledWords, setShuffledWords] = useState([]);

    // In some exercises we only use some of the words and not all(6)
    // ex. In MatchPictureToWritten_form we use 3 words
    const [someWords, setSomeWords] = useState([]);
    const [someWordsShuffled, setSomeWordsShuffled] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Totaly we have 10 exercises in each practice session
    const [exerciseIndex, setExerciseIndex] = useState(1);

    // Percentage of the practice header
    const [headerLength, setHeaderLength] = useState(exerciseIndex);

    // In the end of the practice session we display Continue button and change the component to YouWin
    // It takes value 'none' and 'block'
    const [displayContinue, setDisplayContinue] = useState('none');

    const exercise_kinds = [
        { number: 1, component: MatchPictureToWritten_form },
        { number: 2, component: MatchPictureToWritten_form },
        { number: 3, component: MatchWritten_formToEnglish_equivalent },
        { number: 4, component: MatchSoundToWritten_form },
        { number: 5, component: MatchPictureToWritten_form },
        { number: 6, component: MatchPictureToWritten_form },
        { number: 7, component: MatchWritten_formToEnglish_equivalent }
    ];

    var ChoosenLesson = 1;
    const location = useLocation();
    if (location.state && location.state.ChoosenLesson !== null) {
        ChoosenLesson = location.state.ChoosenLesson;
    }

    // Fetch 6 random words from lesson
    useEffect(() => {
        const fetchWords = async () => {
            try {
                setLoading(true);
                const response = await axios.post(`${BACKEND_API_HOSTNAME}/six-random-words`, { lesson_id: ChoosenLesson });
                // Add disabled words property here, Need it when we display it as button
                const wordsWithDisabled = response.data.map(word => ({ ...word, disabled: false }));
                setWords(wordsWithDisabled);
                setShuffledWords([...wordsWithDisabled].sort(() => Math.random() - 0.5));
                setError(null);
            }
            catch (error) {
                console.log('Error Fetching words');
                setError(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchWords();
    }, [ChoosenLesson, BACKEND_API_HOSTNAME]);


    // Shuffle words when we go to the next exercise
    useEffect(() => {
        const handleShuffle = () => {
            setSomeWords([]);
            setSomeWordsShuffled([]);
            setWords((prevWords) => [...prevWords].sort(() => Math.random() - 0.5));
            setShuffledWords((prevShuffledWords) => [...prevShuffledWords].sort(() => Math.random() - 0.5));
            setLeftSelected(null);
            setRightSelected(null);
        }
        handleShuffle();
    }, [exerciseIndex]);


    // --------------------Check Matches--------------------
    const [leftSelected, setLeftSelected] = useState(null);
    const [rightSelected, setRightSelected] = useState(null);

    // When user selectes a button from left side
    const handleLeftSelect = (word) => {
        // If the same word is selected previosly and trying to select it again, we just deselect the word
        if (leftSelected?.id === word.id) {
            setLeftSelected(null);
        }
        else {
            setLeftSelected(word);
            checkMatch(word, rightSelected);
        }
    }

    // When user selectes a button from right side of the match 
    const handleRightSelect = (word) => {
        // If the same word is selected previosly and trying to select it again, we just deselect the word
        if (rightSelected?.id === word.id) {
            setRightSelected(null);
        }
        else {
            setRightSelected(word);
            checkMatch(leftSelected, word);

        }
    }

    const checkMatch = (leftSelectedWord, rightSelectedWord) => {
        // When user has choosen both from left and right side
        if (leftSelectedWord && rightSelectedWord) {
            setLeftSelected(null);
            setRightSelected(null);
            // Correct Answer
            if (leftSelectedWord.id === rightSelectedWord.id) {
                // disable both left right button
                const updatedSomeWords = someWords.map((word) => word.id === leftSelectedWord.id ? { ...word, disabled: true } : word);
                setSomeWords(updatedSomeWords);
                const updatedShuffeledWords = someWordsShuffled.map((word) => word.id === rightSelectedWord.id ? { ...word, disabled: true } : word);
                setSomeWordsShuffled(updatedShuffeledWords);

                // Check if all other words has been matched (Check if all other words disabled)
                const allOtherWordsDisabled = someWords.filter(word => word.id !== leftSelectedWord.id)
                    .every(word => word.disabled === true);
                if (allOtherWordsDisabled) {
                    if (exerciseIndex < exercise_kinds.length) {
                        // Bring the next exercise(component)
                        setExerciseIndex(exerciseIndex + 1);
                        setHeaderLength(headerLength + 1);
                        playSound(shortSuccessSound);
                    }
                    else {
                        // End the practice session
                        setHeaderLength(headerLength + 1);
                        setDisplayContinue('block');
                        playSound(SuccessSound);
                    }
                }
            }
            // Wrong answer
            else {
                playSound(wrongAnswer);
            }
        }
    }



    if (loading) return <span className='flex align-bottom'>Loading...</span>;
    if (error) return <p>{error}</p>;

    // Get the current exercise component to render
    const CurrentExercise = exercise_kinds[exerciseIndex - 1]?.component;

    return (
        <div className='practice-container'>
            <PracticeHeader percentage={headerLength} exercise_count={exercise_kinds.length} />
            {<CurrentExercise
                words={words}
                shuffledWords={shuffledWords}
                someWords={someWords}
                setSomeWords={setSomeWords}
                someWordsShuffled={someWordsShuffled}
                setSomeWordsShuffled={setSomeWordsShuffled}
                playSound={playSound}
                handleRightSelect={handleRightSelect}
                handleLeftSelect={handleLeftSelect}
                rightSelected={rightSelected}
                leftSelected={leftSelected}
            />}
            <Continue displayContinue={displayContinue} />
        </div>
    );
}

export default Practice;
