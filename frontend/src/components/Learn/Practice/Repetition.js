import useAuth from "../../../hooks/UseAuth"
import Drop from "./Drop"

const Repetition = ({ unit, repetition }) => {
    const { auth } = useAuth();
    const user = auth?.user;

    const lesson = repetition.lessons.find(
        (lesson) => lesson.lesson_order === user.current_lesson
    );

    let percentage;

    // Previous units
    if (unit.unit_order < user.current_unit) {
        percentage = 100

        // Current unit
    } else if (unit.unit_order === user.current_unit) {

        // Previous repetitions
        if (repetition.repetition_order < user.current_repetition) {
            percentage = 100

            // Current repetition
        } else if (repetition.repetition_order === user.current_repetition) {
            percentage = ((lesson.lesson_order - 1) / repetition.lessons.length) * 100

            // Next repetitions
        } else {
            percentage = 0
        }

        // Next units
    } else {
        percentage = 0
    }

    return (
        <div className="">

            <Drop
                lesson={lesson}
                percentage={percentage}
            />
            {/*  */}
        </div>
    )
}

export default Repetition