import TaskHead from './TaskHead'
import timeIcon from '../Task/TaskIcon/TimeIcon.svg'

import s from './TaskInfoStyle/Header.module.css'

const TaskTitle = (props) => {
    let task_info = JSON.parse(window.localStorage.getItem("task_info"))


    return (
        <div className={s.wrapper_header} style={{
            background: `#${task_info.color}`
        }}>
            <TaskHead action={props.openContextMenu} />
            <h3 className={`screen_title ${s.screen_title}`}>{task_info.title}</h3>
            <div className={s.time_wrapper}>
                <img className={s.icon} src={timeIcon} alt="" />
                <p className='task_font grey'>{task_info.startTime} - {task_info.endTime}</p>
            </div>
        </div>
    )
}

export default TaskTitle