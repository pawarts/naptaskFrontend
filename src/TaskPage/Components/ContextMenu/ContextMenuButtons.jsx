import { Link } from 'react-router-dom';
import s from './ContextMenu.module.css'

const ContextMenuButton = (props) => {

    const link = props.icon_link;
    const text = props.context_text;
    const action = props.action;

    return (

        <Link to={props.link} className={s.context_item} onClick={event => action(event)}>
            <img className={s.context_icon} src={link} alt="" />
            <p className='task_font'>{text}</p>
        </Link>
    )
}

export default ContextMenuButton