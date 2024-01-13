import Title from './LoginSignupComponent/ComponentTitle'
import Input from '../BaseComponents/Inputs/Input'
import SubmitButton from '../BaseComponents/Buttons/SubmitButton'
import Footer from './LoginSignupComponent/Footer'

import s from './LoginSignup.module.css'
import { useState } from 'react'


const Login = (props) => {

    const [loginInput, setLoginInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    console.log(window.localStorage.getItem("user_id"))

    const user_id = window.localStorage.getItem("user_id");
    const logged_checker = user_id === 'empty string' || user_id === null ? false : true
    if (logged_checker) {
        window.location.pathname = '/task'
    } else {
        console.error("You are not user")
    }


    const getUserProfile = (event) => {
        event.preventDefault();

        const dataSet = {
            login: loginInput,
            password: passwordInput
        }

        const queryParam = new URLSearchParams(dataSet).toString()

        console.log(queryParam)

        const url = `https://naptask-back.onrender.com/login`

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Вказати тип відправленого контенту
            },
            body: JSON.stringify(dataSet) // Перетворити дані в JSON-строку
        })
            .then(response => response.json())
            .then(result => {
                if (result.length > 0) {
                    localStorage.setItem("user_id", result[0]._id);
                    window.location.pathname = '/task'
                } else {
                    localStorage.setItem("user_id", "empty string");
                }
            })
            .catch(error => console.log(error))

    }

    const changeInput = (event, type) => {

        const value = event.target.value;

        switch (type) {
            case 'Login':
                setLoginInput(value)
                break;
            case 'Password':
                setPasswordInput(value)
                break;
            default:
                console.log('Type is undefined')
        }
    }

    return (
        <div className={s.wrapper}>
            <div className={s.form_wrapper}>
                <Title title="Welcome back!" subtitle="Please enter your details" />
                <div className='input_wrapper'>
                    <Input input_name="Login" value={loginInput}
                        changeInput={changeInput} />
                    <Input input_name="Password" value={passwordInput}
                        changeInput={changeInput} />
                </div>
                <SubmitButton button_text="Log In" click={getUserProfile} />
            </div>
            <Footer text="Don’t have an account? Sign up" link="signup" />
        </div>
    )
}

export default Login