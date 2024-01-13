import s from './ComponentStyles/Button.module.css'

const SubmitButton = (props) => {
    return (
        <button className={`${s.submit_button} input_title black`}
            type='submit' onClick={event => props.click(event)}>{props.button_text}</button>
    )
}

export default SubmitButton