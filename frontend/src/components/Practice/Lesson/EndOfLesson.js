import '../../../css/car.css'
import { Link } from 'react-router-dom'

const EndOfLesson = () => {
  const congratulationsMessages = [
    "🎉 Great job! You just unlocked a new level of Persian skills! 🚀",
    "👏 عالی! (Ali!) – That means 'Great!' in Persian, just like your progress! 🤩",
    "🥳 You did it! Now you can impress your Persian-speaking friends! 🇮🇷",
    "😎 Persian mastery loading... 80%! Keep going, language legend! 📚",
    "💡 You now know more Persian than 99% of cats! 🐱 Keep learning!",
    "🚀 Whoa! Your Persian skills just leveled up! Next stop: fluent city! 🏙️",
    "🎊 تبریک! (Tabrik!) – That means 'Congrats!' in Persian, and you totally deserve it! 🎖️",
    "🤯 You just completed a lesson! Somewhere in the world, a Persian cat is proud of you! 🐱",
    "🗣️ If Persian words were gold, you'd be rich by now! Keep going, language treasure hunter! 🏆",
    "🏅 You're officially a Persian-learning legend! The language gods are cheering for you! 📜✨"
  ];

  const randomMessage = congratulationsMessages[Math.floor(Math.random() * congratulationsMessages.length)];

  return (
    <div className='flex flex-col justify-between h-full text-2xl text-center'>

      {/* Car Animation */}
      <div className="loop-wrapper">
        <div className="mountain"></div>
        <div className="hill"></div>
        <div className="tree"></div>
        <div className="tree"></div>
        <div className="tree"></div>
        <div className="rock"></div>
        <div className="truck"></div>
        <div className="wheels"></div>
      </div>

      {/* Finish Text */}
      <p className="font-bold text-3xl mt-4">
        🎉 Finish 🏁 🎉
      </p>

      {/* Congratulations Message */}
      <p className="mt-3 px-6 text-xl text-gray-700">
        {randomMessage}
      </p>

      {/* Button to Lessons */}
      <Link to="/practice" className='io-button w-11/12 p-2 bg-[#0ca00c] mx-auto mb-6' state={{currentSection:1}}>
        Go to Lessons
      </Link>
    </div>
  )
}

export default EndOfLesson
