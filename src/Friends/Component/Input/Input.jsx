import s from './Input.module.css'

const Input = (props) => {
    return (
        <input className={s.search_input} type="text" placeholder='Search' />
    )
}

export default Input