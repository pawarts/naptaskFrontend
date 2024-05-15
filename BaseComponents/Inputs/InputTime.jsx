import s from './ComponentStyles/CreateTaskStyle.module.css'

const InputTime = (props) => {

    return (
        <div className={s.wrapper_time}>
            <h3 className='input_title'>{props.input_title}</h3>
            <input className={`${s.input_time} grey`} value={props.value}
                onChange={event => props.changeInput(event, props.input_title)}
                type={props.input_type} min={props.min} />
        </div>
    )
}

export default InputTime