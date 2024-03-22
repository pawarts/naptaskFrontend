import { useDispatch, useSelector } from 'react-redux';

import { busyTimeChange } from '../../_store/slices/viewSlice'

import FreeTimeItem from './FreeTimeItem';

import s from './BusyTime.module.css'
import { setTimeEnd, setTimeStart } from '../../_store/slices/taskFormSlice';

const BusyTime = (props) => {

    const busyViewer = useSelector(state => state.view.busyTimeView);
    const freeTimeArray = useSelector(state => state.freeTime.freeTimeArray)

    const dispatch = useDispatch()



    let timeStart, timeEnd = '';

    if (freeTimeArray[0]) {
        timeStart = freeTimeArray[0].timeStart;
        timeEnd = freeTimeArray[0].timeEnd;
    }
    const time = useSelector(state => state.freeTime.choosedTime)

    const setTime = () => {
        if (time) {
            dispatch(setTimeStart(time.timeStart));
            dispatch(setTimeEnd(time.timeEnd));

            dispatch(busyTimeChange(false))
        }
    }

    const closeWindow = () => {
        dispatch(busyTimeChange(false))
    }

    const freeTimeList = freeTimeArray.map((element, index) => (
        <div key={index}>
            <FreeTimeItem timeStart={element.timeStart} timeEnd={element.timeEnd} />
        </div>
    ))




    return (
        <div className={s.wrapper} style={{
            display: busyViewer ? 'flex' : 'none'
        }} >
            <h1 className='screen_title'>Hey, {window.localStorage.getItem('login')}</h1>

            <div className={s.warning_body}>
                <div className={s.text_wrapper}>
                    <h3 className='button_text'>Цей час вже зайнято</h3>

                    <p className={`task_font ${s.recomenation_text}`}>Можливо краще перенести, у вибраний день, є такі вікна:</p>
                </div>


                <div className={s.free_time_items}>
                    {freeTimeList}
                </div>

                <div className={s.button_wrapper}>
                    <button className='task_font' onClick={closeWindow}>No, thanks</button>
                    <button className={`task_font ${s.submit_button}`} onClick={setTime}>Change time</button>
                </div>
            </div>
        </div>
    )
}

export default BusyTime