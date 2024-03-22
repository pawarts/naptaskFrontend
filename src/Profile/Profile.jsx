import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { addTask } from '../_store/slices/taskSlice'

import Navigation from '../BaseComponents/Navigation/Navigation'
import s from './Profile.module.css'
import { exitUser } from '../_store/slices/authSlice'

const Profile = (props) => {
    const dispatch = useDispatch()

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