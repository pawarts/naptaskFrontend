
import s from './TaskStyles/TaskDateButton.module.css'

const TaskDateButton = (props) => {
    return (
        <img src={props.icon} className={`${props.middle_button ? s.middle_button : ""}
                                          ${s.date_button}`} alt="" onClick={props.action} />
    )
}

export default TaskDateButton