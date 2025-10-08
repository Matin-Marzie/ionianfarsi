import { useContext } from "react";
import Drop from "./Drop"
import AuthContext from "../../../../context/AuthProvider";

const Repetition = ({ unit, repetition }) => {

    const { user } = useContext(AuthContext);

    let percentage;

    // Previous units (to change their color to bluasea)
    if (unit.unit_order < user.unit.unit_order) {
        percentage = 100

        // Current unit
    } else if (unit.unit_id === user.unit.unit_id) {

        // Previous repetitions
        if (repetition.repetition_order < user.repetition.repetition_order) {
            percentage = 100

            // Current repetition
        } else if (repetition.repetition_id === user.repetition.repetition_id) {
            percentage = ((user.lesson.lesson_order - 1) / repetition.lessons.length) * 100

            // Next repetitions
        } else {
            percentage = 0
        }

        // Next units
    } else {
        percentage = 0
    }

    return (
        <div >

            <Drop
                repetition={repetition}
                repetition_type={repetition.repetition_type}
                percentage={percentage}
                isCurrentRepetition={repetition.repetition_id === user.repetition.repetition_id}
            />
        </div>
    )
}

export default Repetition