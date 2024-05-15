import s from './ComponentStyles/Button.module.css'

const SmallSubmitButton = ({text, action}) => {
    return (
        <button className={`black ${s.small_submit_button}`} onClick={action}>{text}</button>
    )
}

export default SmallSubmitButton