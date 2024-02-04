import s from './ContextMenu.module.css'

const ContextMenuButton = (props) => {

    const link = props.icon_link;
    const text = props.context_text;
    const action = props.action;

    return (

        <div className={s.context_item} onClick={action}>
            <img className={s.context_icon} src={link} alt="" />
            <p className='task_font'>{text}</p>
        </div>
    )
}

export default ContextMenuButton