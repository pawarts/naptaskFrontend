import s from './CollaboratorsStyle/CollaboratorsStyle.module.css';


const CollaboratorItem = (props) => {
    const {login, user_icon} = props;
    
    return (
        <div onClick={props.action} className={s.user_item}>
            {user_icon ? <img src={user_icon} className={s.user_icon} alt="" /> : <p className={s.user_icon}></p>}
            <p className='settings_title'>{login}</p>
        </div>
    )
};

export default CollaboratorItem