function Continue({
    handleContinue,
    displayContinue,
    continueText,
    continueButtonText,
    correctAnswer
}) {

    return (
        <div className={`w-full fixed flex flex-col justify-between max-w-screen-md bg-continueBG bottom-0 text-2xl opacity-90 p-5 font-bold space-y-3
            ${displayContinue ? 'animate-displayContinue' : 'hidden'}
            ${correctAnswer ? 'bg-green-300' : 'bg-red-400'}
        `}>
            <div className='whitespace-pre-line'>
                {correctAnswer ? '✅ Excellent!' : '❌ Try again later'}
                <div className='font-medium leading-10'>{continueText}</div>
            </div>
            <button onClick={() => {handleContinue()}}
                className={`io-button w-full p-2 m-auto
                ${correctAnswer ? 'bg-[#0ca00c]' : 'bg-red-600'}`
                }>
                    {continueButtonText && correctAnswer ? 'Continue' : "Got it"}
            </button>
        </div>
    )
}

export default Continue