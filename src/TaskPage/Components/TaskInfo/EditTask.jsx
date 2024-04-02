import FormTask from "../../../BaseComponents/Form/FormTask"

const EditTask = (props) => {
    return (
        <div >
            <FormTask title="Edit task" button_text="Edit"
                type="edit" hide={props.hide} id={props.id} />
        </div>
    )
}

export default EditTask