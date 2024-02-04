import s from './ComponentStyles/Button.module.css'

const SubmitButton = (props) => {
    return (
        <button className={`${s.submit_button} input_title black`}>{props.button_text}</button>
    )
}

export default SubmitButton