import Title from './LoginSignupComponent/ComponentTitle'
import Input from '../BaseComponents/Inputs/Input'
import SubmitButton from '../BaseComponents/Buttons/SubmitButton'
import Footer from './LoginSignupComponent/Footer'

import s from './LoginSignup.module.css'

import { useState } from 'react'


const Signup = (props) => {

    const [loginInput, setLoginInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('')

    const setUserProfile = (event) => {
        event.preventDefault();

        const dataSet = {
            login: loginInput,
            email: emailInput,
            password: passwordInput
        }

        const queryParam = new URLSearchParams(dataSet).toString()

        console.log(queryParam)

        const domain = process.env.DOMAIN_NAME || 'http://localhost:10000'
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
                        changeInput={changeInput} />
                    <Input input_name="Email" value={emailInput}
                        changeInput={changeInput} />
                    <Input input_name="Password" value={passwordInput}
                        changeInput={changeInput} />
                </div>
                <SubmitButton button_text="Sign Up" click={setUserProfile} />
            </form>
            <Footer text="You have an account? Log In" link="login" />
        </div>
    )
}

export default Signup
