import ArrowBack from './TaskInfoIcon/ArrowBack.svg'
import ContextMenu from './TaskInfoIcon/ContextMenu.svg'

import { Link } from 'react-router-dom'

import s from './TaskInfoStyle/Header.module.css'

const TaskHead = (props) => {
    return (
        <div className={s.head_wrapper}>
            <Link to="/task">
                <img src={ArrowBack} alt="" />
            </Link>
            <p className="task_font">Task details</p>
            <img src={ContextMenu} alt="" onClick={props.action} />
        </div>
    )
}

export default TaskHead