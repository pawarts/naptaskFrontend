import s from './CreateTaskStyle.module.css'

const ChooseColor = (props) => {

    const colorArray = ['faf3dd', 'c8d5b9', '8fc0a9', '68b0ab', '77bfa3']

    return (
        <input className={s.color_input} name='colors' type="radio" value={`${colorArray[props.color_number]}`} style={{
            background: `#${colorArray[props.color_number]}`
        }} onChange={event => props.setColorValue(event, 'Color')} />
    )
}

export default ChooseColor