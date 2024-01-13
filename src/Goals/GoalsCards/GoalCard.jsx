import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'

import s from './GoalsCards.module.css'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

const GoalCard = (props) => {

    const all_task = 10

    const done = 6;
    const undone = all_task - done;

    const data = {
        datasets: [{
            data: [done, undone],
            backgroundColor: ['rgb(255,255,255)', 'rgb(211,211,211)'],
            borderColor: [],
            borderWidth: 0,
            max: all_task,
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: {
                display: false,
            }
        }
    };


    return (
        <div className={`black ${s.card_wrapper}`}>
            <h3 className={`task_font white ${s.goal_title}`}>5ht</h3>

            <div className={s.goal_statistic_wrapper}>
                <p className={`task_font white ${s.goal_count}`}>{done} of {all_task}</p>

                <div className={s.diagram_wrapper}>
                    <Doughnut data={data} options={options}></Doughnut>
                </div>

            </div>
        </div>
    )
}

export default GoalCard