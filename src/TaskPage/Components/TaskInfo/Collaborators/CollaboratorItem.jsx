import s from './CollaboratorsStyle/CollaboratorsStyle.module.css';


const CollaboratorItem = (props) => {
    const login = props.element
    const user_icon = () => {
        return props.user_icon ? <img src={props.user_icon} className={s.user_icon} alt="" /> : <p className={s.user_icon}>{login[0]}</p>
    }
    return (
        <div onClick={props.action}>
            {user_icon()}
        </div>
    )
};

export default CollaboratorItem