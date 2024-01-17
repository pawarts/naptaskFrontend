import s from './ContextMenu.module.css'

const ContextMenuButton = (props) => {

    const link = props.icon_link;
    const text = props.context_text;
    const action = props.action;

    return (

        <div className={`context_item
         ${props.delete_choose_button ? props.delete_choose_button : ''} ${s.context_item}
         ${props.deleteButtonClass}`}
            onClick={action} style={props.style}>
            <img className={s.context_icon} src={link} alt="" />
            <p className={`${props.task_font} ${'task_font'}`}>{text}</p>
        </div>
    )
}

export default ContextMenuButton