import { useContext } from "react";
import Drop from "./Drop"
import LessonContext from "../../../../context/LessonContext";

const Repetition = ({ unit, repetition }) => {
    const {
        currentUnit, currentRepetition, currentLesson
    } = useContext(LessonContext);

    let percentage;

    // Previous units (to change their color to bluasea)
    if (unit.unit_order < currentUnit.unit_order) {
        percentage = 100

        // Current unit
    } else if (unit.unit_id === currentUnit.unit_id) {

        // Previous repetitions
        if (repetition.repetition_order < currentRepetition.repetition_order) {
            percentage = 100

            // Current repetition
        } else if (repetition.repetition_id === currentRepetition.repetition_id) {
            percentage = ((currentLesson?.lesson_order - 1) / repetition.lessons.length) * 100

            // Next repetitions
        } else {
            percentage = -1
        }

        // Next units
    } else {
        percentage = 0
    }

    return (
        <div >

            <Drop
                repetition_type={repetition.repetition_type}
                percentage={percentage}
                isCurrentRepetition={repetition.repetition_id === currentRepetition.repetition_id}
            />
        </div>
    )
}

export default Repetition