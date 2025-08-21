import Drop from "./Drop"

const Repetition = ({ repetition }) => {
    const lesson = repetition.lessons[0]
    return (
        <div className="">

            <Drop
                lesson={lesson}
                percentage={100/(repetition.repetition_order-1)}
            />

        </div>
    )
}

export default Repetition