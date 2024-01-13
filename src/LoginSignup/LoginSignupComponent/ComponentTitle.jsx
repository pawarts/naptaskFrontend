import s from './ComponentStyles/ComponentTitle.module.css'

const ComponentTitle = (props) => {
    return (
        <div className={s.title_wrapper}>
            <h1 className={`page_title`}>{props.title}</h1>
            <h2 className={`page_subtitle`}>{props.subtitle}</h2>
        </div>
    )
}

export default ComponentTitle