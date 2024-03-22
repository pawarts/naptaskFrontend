
import { useDispatch, useSelector } from 'react-redux'
import s from './ScheduleInfo.module.css'
import ScheduleTask from './ScheduleTask'
import { setActiveSchedule } from '../../../_store/slices/scheduleSlice'

const ScheduleInfoItem = (props) => {

    const dispatch = useDispatch()

    const days = ['Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const dayKey = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    /*props.info_item.sort((a, b) => {
        return a.timeStart > b.timeStart
    })*/



    const scheduleBody = useSelector(state => state.schedules.activeSchedule);

    const deleteTaskLocal = (index) => {

        const copyObject = JSON.parse(JSON.stringify(scheduleBody));
        const dayArray = copyObject.scheduleBody[dayKey[props.day_number]]
        const updateArray = index > 0 ? dayArray.splice(index, 1) : [];
        copyObject.scheduleBody[dayKey[props.day_number]] = updateArray


        dispatch(setActiveSchedule(copyObject))
        /* props.deleteTask(props.day_number, scheduleBody)

        window.localStorage.setItem("scheduleBody", JSON.stringify(scheduleBody)) */
    }

    const task_array = Array.isArray(props.info_item) ? props.info_item.map((element, index) => (
        <ScheduleTask key={index} element={element} index={index}
            button_wrapper_view={props.button_wrapper_view} deleteTaskLocal={deleteTaskLocal} />
    )) : ''
    return (
        <div className={s.schedule_item}>
            <h3 className={`${s.day_title} button_text`}>{days[props.day_number]}</h3>
            {task_array}
        </div>
    )
}

export default ScheduleInfoItem