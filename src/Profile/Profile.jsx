import { Link } from 'react-router-dom'
import Navigation from '../BaseComponents/Navigation/Navigation'
import s from './Profile.module.css'

const Profile = (props) => {

    const exitFucntion = (event) => {
        event.preventDefault();

        window.localStorage.removeItem("user_id");
        window.location.pathname = '/login';
    }

    return (
        <div className={s.wrapper}>
            <h1 className="screen_title">Settings</h1>
            <div className={s.settings_block}>
                <h3 className='settings_title'>Account</h3>
            </div>

            <Link to='' onClick={event => exitFucntion(event)}>Exit</Link>
            <Navigation />
        </div>
    )
}

export default Profile