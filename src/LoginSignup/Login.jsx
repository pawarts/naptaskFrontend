import Title from './LoginSignupComponent/ComponentTitle'
import Input from '../BaseComponents/Inputs/Input'
import SubmitButton from '../BaseComponents/Buttons/SubmitButton'
import Footer from './LoginSignupComponent/Footer'

import s from './LoginSignup.module.css'
import { useState } from 'react'


const Login = (props) => {

    const [loginInput, setLoginInput] = useState('');
    const [loginInputWarning, setLoginInputWarning] = useState(false);

    const [passwordInput, setPasswordInput] = useState('')
    const [passwordInputWarning, setPasswordInputWarning] = useState(false)

    const [logiing, setLogiing] = useState(false);

    //console.log(window.localStorage.getItem("user_id"))

    const user_id = window.localStorage.getItem("user_id");
    const logged_checker = user_id === 'empty string' || user_id === null ? false : true
    if (logged_checker) {
        window.location.pathname = '/task'
    }


    const getUserProfile = (event) => {
        event.preventDefault();

        const stringValidator = (string, maxLength) => {
            return string === '' || string.length < 1 || string.length > maxLength
        }

        if (stringValidator(loginInput, 20)) {
            setLoginInputWarning(true)
        } else {
            setLoginInputWarning(false)
        }

        if (stringValidator(passwordInput, 12)) {
            setPasswordInputWarning(true)
        } else {
            setPasswordInputWarning(false)
        }

        if (!(loginInputWarning && passwordInputWarning) && !(stringValidator(passwordInput, 12) || stringValidator(loginInput, 20))) {
            const dataSet = {
                login: loginInput,
                password: passwordInput
            }

            const domain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000'
            const url = `${domain}/login`

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Вказати тип відправленого контенту
                },
                body: JSON.stringify(dataSet) // Перетворити дані в JSON-строку
            })
                .then(response => response.json())
                .then(result => {
                    setLogiing(true)
                    console.log(result)
                    if (result.length > 0) {
                        localStorage.setItem("user_id", result[0]._id);
                        localStorage.setItem("login", result[0].login);
                        window.location.pathname = '/task'
                    } else {
                        localStorage.setItem("user_id", "empty string");
                        setLoginInputWarning(true);
                        setPasswordInputWarning(true);
                        setLogiing(false)
                    }
                })
                .catch(error => console.log(error))
        }

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
                        changeInput={changeInput} maxLength={20}
                        warning_text="Please check your login" visibility={loginInputWarning} />
                    <Input input_name="Password" value={passwordInput}
                        changeInput={changeInput} type="password" maxLength={12}
                        warning_text="Please check you password" visibility={passwordInputWarning} />
                </div>
                <SubmitButton button_text={logiing ? "Wait..." : "Log In"} click={getUserProfile} />
            </div>
            <Footer text="Don’t have an account? Sign up" link="signup" />
        </div>
    )
}

export default Login