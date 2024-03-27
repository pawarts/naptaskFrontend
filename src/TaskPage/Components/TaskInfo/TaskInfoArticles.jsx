import s from './TaskInfoStyle/TaskInfoArticle.module.css'


const TaskInfoArticles = (props) => {
    const type = props.type

    let taskData = ''

    let task_info = JSON.parse(window.localStorage.getItem("task_info"))
    switch (type) {
        case 'details':
            taskData = {
                title: 'Task details:',
                content: task_info.taskDescription
            }
            break
        default:
            console.log('Undefined')
    }

    return (
        <div className={s.wrapper} style={{
            display: !props.editMenu ? 'inline-block' : 'none'
        }}>
            <h4 className={`settings_title ${s.title}`}>{taskData.title}</h4>
            <p className={`${s.content_text} task_font`}>{/* {taskData.content} */}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</p>
        </div>
    )
}

export default TaskInfoArticles