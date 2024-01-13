import s from './FriendStyle.module.css'

const FriendItem = (props) => {
    return (
        <div className={s.user_wrapper}>
            <img src="" alt="" className={s.user_image} />

            <div className={s.user_info}>
                <p className='settings_title'>Name Surname</p>
                <p className='task_font grey'>Personal info</p>
            </div>
        </div>
    )
}

export default FriendItem