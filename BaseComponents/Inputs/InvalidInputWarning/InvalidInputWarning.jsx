import s from './InvalidInputWarning.module.css'

const InvalidInputWarning = (props) => {
    const visibility = props.visibility
    return (
        <div className={s.warning_wrapper} style={{
            display: visibility ? "flex" : "none",
        }}>
            <p className={s.warning_text}>{props.warning_text || "Props empty"}</p>
        </div>
    )
}

export default InvalidInputWarning