import PerfomanceDiagram from "./PerfomanceDiagram";

import s from './PerfomanceStyles/Perfomance.module.css'

const Perfomance = (props) => {
    return (
        <div className={s.header_wrapper}>
            <p className={`${s.perfomance_text} grey`}>Today</p>

            <div className={s.style}>
                <PerfomanceDiagram howManyTask={props.howManyTask} />
                <p className={`${s.perfomance_text} grey`}>task</p>
            </div>
        </div>
    )
}

export default Perfomance