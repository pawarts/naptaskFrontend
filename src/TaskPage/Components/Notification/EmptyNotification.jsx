import s from './NotificationStyle/EmptyNotification.module.css'

import emptyNotification from './NotificationIcon/empty_notification.svg'

const EmptyNotification = (props) => {
    return (
        <div className={s.wrapper}>
            <img src={emptyNotification} alt="" />
            <h1 className='screen_title'>Поки немає нових сповіщень</h1>
        </div>
    )
}

export default EmptyNotification