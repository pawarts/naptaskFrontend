import { Link } from "react-router-dom"
import WeekLinkNext from './ScheduleIcon/WeekLinkNext.svg'
import s from './ScheduleLinkStyle/ScheduleLinkIcon.module.css'


const ScheduleLink = (props) => {
    const setSchedule = (event) => {
        event.preventDefault();

        window.localStorage.setItem("scheduleBody", JSON.stringify(props.schedule_body))

        window.location.pathname = '/schedule_info'
    }
    return (
        <Link className={s.scheduleLink} to={props.schedule_link} onClick={event => setSchedule(event)}>
            <p className="button_text">{props.schedule_title}</p>
            <img src={WeekLinkNext} alt="" />
        </Link>
    )
}

export default ScheduleLink