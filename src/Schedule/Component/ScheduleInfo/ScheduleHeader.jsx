import { Link } from 'react-router-dom'

import backIcon from './Icon/ArrowBack.svg'
import editIcon from './Icon/Edit.svg'

import s from './ScheduleInfo.module.css'

const ScheduleHeader = (props) => {
    return (
        <header className={s.schedule_header}>
            <Link to="/schedule"><img src={backIcon} alt="" /></Link>
            <button onClick={props.openEditWindow}>
                <img src={editIcon} alt="" />
            </button>
        </header>
    )
}

export default ScheduleHeader