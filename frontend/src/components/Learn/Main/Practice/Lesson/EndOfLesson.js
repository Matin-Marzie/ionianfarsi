import '../../../../../css/car.css'
import { useNavigate, useParams } from 'react-router-dom'
import useAuth from '../../../../../hooks/UseAuth';
import { useCallback, useContext, useEffect } from 'react';
import LessonContext from '../../../../../context/LessonContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchLessonChallenges, fetchLessons } from '../../../../../api/LearnApi';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import { updateUser } from '../../../../../api/UserApi';


// Constants for XP and coins if practicing old lessons
const LESSON_COIN = 4
const OLD_LESSON_COIN = 1
const OLD_LESSON_XP = 5

const EndOfLesson = () => {

  const axiosPrivate = useAxiosPrivate();
  const { user, setUser, isLoggedIn } = useAuth();
  const { playSound, lessonCompletedSound, setChallengeIndex, setIsLessonCompleted } = useContext(LessonContext);
  const navigate = useNavigate();
  const { lesson_id: lesson_id_param } = useParams();

  const currentSection = user.section.section_id;


  // Fetch all units in a section with repetitions and lessons inside of unit
  const {
    data: units,
    unitsLoading,
  } = useQuery({
    queryKey: ['section', currentSection],
    queryFn: () => fetchLessons({ sectionId: currentSection }),
    staleTime: Infinity,
    cacheTime: Infinity,
    keepPreviousData: true
  });

  // Fetch user's current lesson data
  const { data: lessonData, lessonLoading } = useQuery({
    queryKey: ["lesson", lesson_id_param],
    queryFn: ({ signal }) => fetchLessonChallenges({ lessonId: lesson_id_param, signal }),
    staleTime: Infinity,
  });

  // Play lesson completed sound on component mount
  useEffect(() => {
    playSound(lessonCompletedSound);
  }, [playSound, lessonCompletedSound]);


  // ⚙️ Helper: Find next lesson path (unit/repetition/lesson)
  const findNextLessonPath = useCallback(() => {
    if (!units || !user?.unit || !user?.lesson || !user?.repetition) return;

    const { unit, repetition, lesson } = user
    const repetitions = unit.repetitions
    const repIndex = repetitions.findIndex(r => r.repetition_id === repetition.repetition_id)
    const lessonIndex = repetition.lessons.findIndex(l => l.lesson_id === lesson.lesson_id)

    // 1️⃣ Next lesson in same repetition
    if (lessonIndex + 1 < repetition.lessons.length) {
      return { nextUnit: unit, nextRepetition: repetition, nextLesson: repetition.lessons[lessonIndex + 1] }
    }
    // 2️⃣ First lesson of next repetition
    if (repIndex + 1 < repetitions.length) {
      const nextRep = repetitions[repIndex + 1]
      return { nextUnit: unit, nextRepetition: nextRep, nextLesson: nextRep.lessons[0] }
    }
    // 3️⃣ First lesson of next unit
    const unitIndex = units.findIndex(u => u.unit_id === unit.unit_id)
    if (unitIndex + 1 < units.length) {
      const nextUnit = units[unitIndex + 1]
      const nextRep = nextUnit.repetitions[0]
      const nextLesson = nextRep.lessons[0]
      return { nextUnit, nextRepetition: nextRep, nextLesson }
    }
    // 🛑 No more lessons in section
    return "next section"
  }, [units, user])


  // ✅ Use React Query mutation for backend sync
  const updateUserMutation = useMutation({
    mutationFn: (updates) => updateUser(axiosPrivate, updates)
  })


  // 🎵 Play completion sound when entering
  useEffect(() => {
    playSound(lessonCompletedSound)
  }, [playSound, lessonCompletedSound])



  // 🎓 Main user progression logic
  useEffect(() => {
    if (unitsLoading || lessonLoading || !lessonData) return;

    const { experience, coin, ...other } = user;
    const xpGain = lessonData?.challenges?.length || OLD_LESSON_XP; // XP based on number of challenges

    // Check if user is on the current lesson in their path
    const isCurrentLessonInPath = Number(lesson_id_param) === user.lesson.lesson_id

    if (isCurrentLessonInPath) {

      const nextPath = findNextLessonPath()
      if (!nextPath) return;

      if (nextPath && user.unit.unit_id === units[units.length - 1]) {// Finished all lessons → next section

        const updatedUser = {
          ...other,
          experience: experience + xpGain,
          coin: coin + LESSON_COIN,
          // section: { section_id: user.section.section_id + 1 }, // don't go to next section for now
          // reset_data: true,
        }

        setUser(updatedUser)

        // sync backend
        if (isLoggedIn) {
          updateUserMutation.mutate({
            experience: updatedUser.experience,
            coin: updatedUser.coin,
            // section_id: updatedUser.section.section_id
          })
        }
        return;
      }

      // Normal progress to next lesson in path
      const { nextUnit, nextRepetition, nextLesson } = nextPath

      const updatedUser = {
        ...other,
        experience: experience + xpGain,
        coin: coin + LESSON_COIN,
        unit: nextUnit,
        repetition: nextRepetition,
        lesson: nextLesson,
      }

      setUser(updatedUser) // update

      if (isLoggedIn) {
        updateUserMutation.mutate({ // Backend sync
          experience: updatedUser.experience,
          coin: updatedUser.coin,
          unit_id: nextUnit.unit_id,
          repetition_id: nextRepetition.repetition_id,
          lesson_id: nextLesson.lesson_id,
        })
      }

    } else {
      // Practiced an old lesson
      const updatedUser = {
        ...other,
        experience: experience + OLD_LESSON_XP,
        coin: coin + OLD_LESSON_COIN,
      }

      setUser(updatedUser)

      if (isLoggedIn) {
        updateUserMutation.mutate({
          experience: updatedUser.experience,
          coin: updatedUser.coin,
        })
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitsLoading, lessonLoading, lessonData, lesson_id_param]);



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


  // Button action
  const handleGoToLessons = () => {
    setIsLessonCompleted(false);
    setChallengeIndex(0);
    navigate('/learn', { state: { currentSection: user.section.section_id } });
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
      <p className="font-bold text-3xl mt-4">🎉 Finish 🏁 🎉</p>
      <p className="mt-3 px-6 text-xl text-gray-700">{randomMessage}</p>

      {/* Gained */}
      {/*||     XP     ||     COINS     ||*/}
      {/* Under Developement */}

      {/* Button */}
      <button onClick={handleGoToLessons} className='io-button w-11/12 p-2 bg-[#0ca00c] mx-auto mb-6'>
        Go to Lessons
      </button>
    </div>
  )
}

export default EndOfLesson
