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
            <Link className={s.link} to="/login" onClick={exitFucntion}>Exit</Link>
            <Navigation />
        </div>
    )
}

export default Profile