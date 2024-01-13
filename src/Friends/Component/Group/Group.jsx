import { Link } from "react-router-dom"
import s from './Groups.module.css'


const Group = (props) => {

    const pathname = window.location.pathname

    return (
        <Link to={`/friend/${props.group_name}`} className={`${s.group_link} task_font
            ${pathname === props.group_name ? s.active_group : ''}`}
        >{props.group_name}</Link>
    )
}

export default Group