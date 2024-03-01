import Title from './LoginSignupComponent/ComponentTitle'
import Input from '../BaseComponents/Inputs/Input'
import SubmitButton from '../BaseComponents/Buttons/SubmitButton'
import Footer from './LoginSignupComponent/Footer'

import s from './LoginSignup.module.css'

import { useState } from 'react'


const Signup = (props) => {

    const [loginInput, setLoginInput] = useState('');
    const [loginInputWarning, setLoginInputWarning] = useState(false);

    const [emailInput, setEmailInput] = useState('');
    const [emailInputWarning, setEmailInputWarning] = useState(false);

    const [passwordInput, setPasswordInput] = useState('');
    const [passwordInputWarning, setPasswordInputWarning] = useState(false);

    const setUserProfile = (event) => {
        event.preventDefault();

        const stringValidator = (string, maxLength, type) => {
            if (type === 'email') {
                return string === '' || string.length > maxLength || string.includes(' ') || !string.includes('@') || !string.includes('.')
            }

            return string === '' || string.length > maxLength || string.includes(' ')
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

        if (stringValidator(emailInput, 30, 'email')) {
            setEmailInputWarning(true)
        } else {
            setEmailInputWarning(false)
        }

        if (!(loginInputWarning && passwordInputWarning && emailInputWarning) && !(stringValidator(passwordInput, 12) && stringValidator(loginInput, 20) && stringValidator(emailInput, 30))) {
            const dataSet = {
                login: loginInput.split(' ')[0],
                email: emailInput.split(' ')[0],
                password: passwordInput.split(' ')[0]
            }

            const domain = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:10000'
            const url = `${domain}/signup`

            console.log(url)

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Вказати тип відправленого контенту
                },
                body: JSON.stringify(dataSet) // Перетворити дані в JSON-строку
            })
                .then(response => response.json())
                .then((result) => {
                    window.location.pathname = '/login'
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
            case 'Email':
                setEmailInput(value)
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
            <form action="" className={s.form_wrapper}>
                <Title title="Create account" subtitle="Please enter your details" />
                <div className='input_wrapper'>
                    <Input input_name="Login" value={loginInput}
                        changeInput={changeInput} maxLength={30}
                        warning_text="Check your login" visibility={loginInputWarning} />
                    <Input input_name="Email" type="email" value={emailInput}
                        changeInput={changeInput} maxLength={50}
                        warning_text="Check your mail" visibility={emailInputWarning} />
                    <Input input_name="Password" value={passwordInput}
                        changeInput={changeInput} type="password" maxLength={12}
                        warning_text="Check your password" visibility={passwordInputWarning} />
                </div>
                <SubmitButton button_text="Sign Up" click={setUserProfile} />
            </form>
            <Footer text="You have an account? Log In" link="login" />
        </div>
    )
}

export default Signup
