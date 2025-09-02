import { Link } from "react-router-dom"
import Repetition from "./Repetition"

const Unit = ({ unit, currentSection}) => {

    return (
        <article
            id={`unit-${unit.unit_id}`}
            className="px-2 flex flex-col bg-white"
        >
            <Link to='sections' className='bg-bluesea io-button p-4 sticky top-0 z-20'>
                <h5>Section {currentSection} — Unit {unit.unit_order}</h5>
                <h5>{unit.unit_title}</h5>
            </Link>

            {/* Repetitions */}
            <div className={`grid grid-cols-12 items-start pt-10 mb-8 h-full min-h-[calc(100dvh-246px)] flex-grow gap-y-0`}>
                {unit.repetitions.map((rep, i) => {
                    let colClass = "";
                    switch (i) {
                        case 0: colClass = "col-start-5 col-span-4"; break;     
                        case 1: colClass = "col-start-7 col-span-4"; break;     
                        case 2: colClass = "col-start-8 col-span-4 mt-10 mb-10"; break;
                        case 3: colClass = "col-start-7 col-span-4"; break;     
                        case 4: colClass = "col-start-5 col-span-4"; break;     
                        case 5: colClass = "col-start-3 col-span-4"; break;     
                        case 6: colClass = "col-start-2 col-span-4 mt-10 mb-10"; break;
                        case 7: colClass = "col-start-3 col-span-4"; break;     
                        case 8: colClass = "col-start-5 col-span-4"; break;     
                        case 9: colClass = "col-start-7 col-span-4"; break;
                        default: colClass = "";                      
                    }

                    return (
                        <div key={rep.repetition_id} className={`${colClass}`}>
                            <Repetition unit={unit} repetition={rep} unit_order={unit.unit_order} />
                        </div>
                    );
                })}
            </div>



        </article>
    )
}

export default Unit