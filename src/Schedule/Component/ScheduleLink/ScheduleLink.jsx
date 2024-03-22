import { Link } from "react-router-dom"
import WeekLinkNext from './ScheduleIcon/WeekLinkNext.svg'
import s from './ScheduleLinkStyle/ScheduleLinkIcon.module.css'
import { useDispatch } from "react-redux"
import { setActiveSchedule } from "../../../_store/slices/scheduleSlice"


const ScheduleLink = (props) => {
    const dispatch = useDispatch()
    const setSchedule = (event) => {
        //event.preventDefault();

        dispatch(setActiveSchedule(props.schedule_body))

        window.localStorage.setItem("scheduleBody", JSON.stringify(props.schedule_body))

        //window.location.pathname = '/schedule_info'
    }
    return (
        <Link className={s.scheduleLink} to={'/schedule_info'} onClick={event => setSchedule(event)}>
            <p className="button_text">{props.schedule_title}</p>
            <img src={WeekLinkNext} alt="" />
        </Link>
    )
}

export default ScheduleLink