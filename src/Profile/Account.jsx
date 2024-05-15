import s from './ProfileStyles/Account.module.css'
import SettingsTitle from './SettingsTitle'

const Account = (props) => {

    const {user_icon} = props;

    const login = window.localStorage.getItem('login')


    return (
        <div className={s.wrapper}>
            <SettingsTitle title="Account"/>

            <div className={s.account_wrapper}>
                {user_icon ? <img src={user_icon} className={s.user_icon}/> : <p className={s.user_icon}></p>}

                <div>
                    <h5 className='button_text'>{login}</h5>
                    <h6 className='page_subtitle'>Bio</h6>
                </div>
            </div>
        </div>
    )
}

export default Account