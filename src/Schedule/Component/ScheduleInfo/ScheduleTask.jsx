import s from './ScheduleInfo.module.css'
const ScheduleTask = (props) => {

    const element = props.element;
    const index = props.index;
    const deleteTaskLocal = props.deleteTaskLocal

    const timeValidator = (time) => {
        const timeArray = time.split(":");
        const hour = Number(timeArray[0]);
        const minute = timeArray[1];

        if (hour > 12 && hour !== 0) {
            return `${hour - 12 < 10 ? `0${hour - 12}` : hour - 12}:${minute} pm`
        } else if (hour === 12) {
            return `12:${minute}pm`
        }
        return `${hour < 10 ? `0${hour}` : hour}:${minute} am`
    }

    return (<div className={s.schedule_info_item_wrapper} key={(index * 10 - 25) * 35}>
        <div className={s.schedule_info_item} style={{ background: `#${element.color}` }}>
            <div className={s.time_wrapper}>
                <span className=''>{timeValidator(element.timeStart)}</span>
                <span className={s.line} ></span>
                <span className=''>{timeValidator(element.timeEnd)}</span>
            </div>
            <span className='' >{element.title}</span>
        </div>
        <div className={s.button_wrapper} style={{
            display: props.button_wrapper_view ? 'flex' : 'none'
        }}>
            <button className={`${s.button_text} black`}
                onClick={() => deleteTaskLocal(index)}>Delete</button>
        </div>
    </div>)
}

export default ScheduleTask