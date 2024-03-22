import { useDispatch, useSelector } from 'react-redux';
import s from './BusyTime.module.css'
import { setChoosedTime } from '../../_store/slices/freeTimeSlice';

const FreeTimeItem = (props) => {

    const timeStart = props.timeStart;
    const timeEnd = props.timeEnd;

    const timeGap = useSelector(state => state.freeTime.timeGap);
    const choseTime = useSelector(state => state.freeTime.choosedTime);

    const choseIndicator = choseTime.timeStart === timeStart;

    const dispatch = useDispatch();

    function calcTime(timeStart, gap) {
        const start = new Date('2024-01-01T' + timeStart)
        const endTime = new Date(start.getTime() + gap * 60000)

        const hour = endTime.getHours() < 10 ? `0${endTime.getHours()}` : endTime.getHours()
        const minute = endTime.getMinutes() < 10 ? `0${endTime.getMinutes()}` : endTime.getMinutes()

        return `${hour}:${minute}`
    }

    const chooseTime = () => {
        dispatch(setChoosedTime({
            timeStart: timeStart,
            timeEnd: calcTime(timeStart, timeGap)
        }))
    }
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

    return (
        <div className={s.free_time_item} style={{
            background: choseIndicator ? 'rgba(100,150,255,0.15)' : '#FFFFFF'
        }}>
            <div className={s.time_wrapper} >
                <p className={`${s.free_time_time} task_font`}>{timeValidator(timeStart)}</p>
                <p className={`${s.free_time_time} task_font`} >-</p>
                <p className={`${s.free_time_time} task_font`} >{timeValidator(timeEnd)}</p>
            </div>

            <button className={s.submit_button} onClick={chooseTime}>Choose</button>
        </div>
    )
}

export default FreeTimeItem