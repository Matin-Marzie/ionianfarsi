import { useEffect } from "react";
import { useContext } from "react"
import LessonContext from "../../../../../context/LessonContext.js"

function Answer() {

    const {
        displayAnswer,
        answerText,
        correctAnswer,
        playSound,
        nextChallengeSound
    } = useContext(LessonContext);


    useEffect(() => {
        if (correctAnswer) {
            playSound(nextChallengeSound);
        }
    }, [correctAnswer, playSound, nextChallengeSound]);


    return (
        <div className={`w-full fixed flex flex-col justify-between max-w-screen-md bg-continueBG bottom-0 text-2xl p-5 font-bold space-y-3 bg-opacity-60
            ${displayAnswer ? 'animate-displayAnswer' : 'hidden'}
            ${correctAnswer ? 'bg-green-300' : 'bg-red-400'}
        `}>
            <div className='whitespace-pre-line'>
                {correctAnswer ? '✅ Excellent!' : '❌ Try again later'}
                <div className='font-medium leading-10'>{answerText}</div>
            </div>
        </div>
    )
}

export default Answer