import s from './ChatStyles/MessageStyle.module.css'

const Message = (props) => {
    const { from, message } = props.message;
    const user_login = window.localStorage.getItem('login');
    const check_author = user_login === from;

    return (
        <div className={s.wrapper} style={{
            justifyContent: check_author ? 'end' : 'start'
        }}>
            <div className={s.message} style={{
                background: check_author ? '#1C1B1F' : '#FFFFFF'
            }}>
                <p className={s.user_name} style={{
                    color: check_author ? '#FFFFFF' : '#1C1B1F'
                }}>{from}</p>
                <p className={s.message_text} style={{
                    color: check_author ? '#FFFFFF' : '#1C1B1F'
                }}>{message}</p>
            </div>
        </div>
    )
}

export default Message