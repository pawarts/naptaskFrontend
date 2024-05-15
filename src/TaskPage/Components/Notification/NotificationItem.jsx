import { useSelector } from 'react-redux';
import SmallSubmitButton from '../../../BaseComponents/Buttons/SmallSubmitButton';
import s from './NotificationStyle/NotificationItem.module.css'


const NotificationItem = (props) => {

    const { id, type, title, task_id, date, startTime, user_creator } = props.element;
    const login = window.localStorage.getItem('login')
    //const task_id = JSON.parse(localStorage.getItem('task_info')).id;

    const day = new Date(date)

    const month = useSelector(state => state.date.monthShortForm)

    //console.log(_id)

    const typeMessage = () => {
        if (type === 'invite') {

            const confirmInvite = () => {
                console.log('Click')

                const send_body = { id, login: [login], task_id }

                const domain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000'

                fetch(`${domain}/updateCollaborators`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json', // Вказати тип відправленого контенту
                    },
                    body: JSON.stringify(send_body)
                })
                    .then(response => response.json())
                    .catch(error => console.error(error))
            }

            return (
                <div className={`${s.task_invite} ${s.message_wrapper}`}>
                    <div className={s.task_list}>
                        <span className='settings_title'>{user_creator} </span>відмітив Вас у завдані <span className='settings_title'>{title}</span>, яке відбудеться {day.getDate()} {month[day.getMonth()]}, о {startTime}
                    </div>
                    <SmallSubmitButton text='Погодитись' action={confirmInvite} />
                </div>
            )

        } else if (type === 'new messages') {
            return (
                <div className={`${s.message_wrapper}`}>
                    <p className={s.task_list}></p>
                </div>
            )
        } else {
            return (
                <div>
                    <p>Somthing going wrong</p>
                </div>
            )
        }
    }

    return (
        <div className={s.wrapper}>
            {typeMessage()}
        </div>
    )
}

export default NotificationItem