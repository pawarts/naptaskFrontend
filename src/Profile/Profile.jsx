import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { addTask } from '../_store/slices/taskSlice'

import Navigation from '../BaseComponents/Navigation/Navigation'
import s from './ProfileStyles/Profile.module.css'
import { exitUser } from '../_store/slices/authSlice'
import { useState } from 'react'
import Account from './Account'

const Profile = (props) => {
    const dispatch = useDispatch()

    const [img, setImg] = useState('')

    const exitFucntion = (event) => {
        event.preventDefault();

        window.localStorage.removeItem("user_id");

        window.location.pathname = '/login';
    }

    const downloadFile = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader()

        reader
            .readAsText(file)

        reader.onload = function () {
            setImg(reader.result)
        }
    }



    return (
        <div className={s.wrapper}>
            <h1 className="screen_title">Settings</h1>
            <div>
                <div className={s.settings_block}>
                    <Account />
                </div>
                <div className={s.settings_block}>
                    <Account />
                </div>
            </div>
            <img src={img} alt="" />

            <Link to='' onClick={event => exitFucntion(event)}>Exit</Link>
            <Navigation />
        </div>
    )
}

export default Profile