import '../../../../../css/car.css'
import { useNavigate, useParams } from 'react-router-dom'
import useAuth from '../../../../../hooks/UseAuth';
import { useContext, useEffect } from 'react';
import LessonContext from '../../../../../context/LessonContext';
import { useQuery } from '@tanstack/react-query';
import { fetchLessons } from '../../../../../api/LearnApi';

const EndOfLesson = () => {
  const { user, setUser } = useAuth();
  const { playSound, lessonCompletedSound, setChallengeIndex, setIsLessonCompleted } = useContext(LessonContext);
  const navigate = useNavigate();
  const { lesson_id } = useParams();

  const currentSection = user.section.section_id;


  // Fetch all units in a section with repetitions and lessons inside of unit
  const {
    data: units,
    isLoading
  } = useQuery({
    queryKey: ['section', currentSection],
    queryFn: () => fetchLessons({ sectionId: currentSection }),
    staleTime: Infinity,
    cacheTime: Infinity,
    keepPreviousData: true
  });

  // Play lesson completed sound on component mount
  useEffect(() => {
    playSound(lessonCompletedSound);
  }, [playSound, lessonCompletedSound]);

  // reset challenges for next session
  setChallengeIndex(0);

  // 🔁 Update user to the next lesson
  useEffect(() => {
    // If practicing old lessons don't update User
    if (lesson_id !== user.lesson.lesson_id) return;
    if (!units || !user?.unit || !user?.lesson || !user?.repetition) return;

    const currentUnit = user.unit;
    const currentRepetition = user.repetition;
    const currentLesson = user.lesson;

    const repetitions = currentUnit.repetitions;
    const currentRepIndex = repetitions.findIndex(r => r.repetition_id === currentRepetition.repetition_id);
    const currentLessonIndex = currentRepetition.lessons.findIndex(l => l.lesson_id === currentLesson.lesson_id);

    let nextLesson = null;
    let nextRepetition = null;
    let nextUnit = null;

    // 1️⃣ Try next lesson in same repetition
    if (currentLessonIndex + 1 < currentRepetition.lessons.length) {
      nextLesson = currentRepetition.lessons[currentLessonIndex + 1];
      nextRepetition = currentRepetition;
      nextUnit = currentUnit;
    }
    // 2️⃣ Otherwise, try first lesson of next repetition in current unit
    else if (currentRepIndex + 1 < repetitions.length) {
      nextRepetition = repetitions[currentRepIndex + 1];
      nextLesson = nextRepetition.lessons[0];
      nextUnit = currentUnit;
    }
    // 3️⃣ Otherwise, go to the first repetition of the next unit
    else {
      const nextUnitIndex = units.findIndex(u => u.unit_id === currentUnit.unit_id) + 1;
      if (nextUnitIndex < units.length) {
        nextUnit = units[nextUnitIndex];
        nextRepetition = nextUnit.repetitions[0];
        nextLesson = nextRepetition.lessons[0];
      }
    }

    // 4️⃣ If no next lesson/unit → move to next section
    if (!nextLesson) {
      setUser({
        ...user,
        section: { section_id: user.section.section_id + 1 },
        reset_data: true,
      });
      return;
    }

    // ✅ Save updated user progress
    setUser({
      ...user,
      unit: nextUnit,
      repetition: nextRepetition,
      lesson: nextLesson,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);



  // Random congratulations message
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



  const handleGoToLessons = () => {
    // reset flags before navigating
    setIsLessonCompleted(false);
    setChallengeIndex(0);
    navigate('/learn', { state: { currentSection: user.section_id } });
  };

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
      <button
        onClick={handleGoToLessons}
        className='io-button w-11/12 p-2 bg-[#0ca00c] mx-auto mb-6'
      >
        Go to Lessons
      </button>
    </div>
  )
}

export default EndOfLesson
