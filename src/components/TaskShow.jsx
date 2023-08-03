import { useState } from "react"
import TaskCreate from "./taskCreate"


function TaskShow({ task, onDelete, onUpdate }) {

    const [showEdit, setShowEdit] = useState(false)

    const handleDelete = () => {
        onDelete(task.id);
    }

    const handleEdit = () => {
        setShowEdit(!showEdit);
    }

    const handleSubmit = (id, updatedTitle, updatedTaskDesc) => {
        setShowEdit(false);
        onUpdate(id, updatedTitle, updatedTaskDesc);
    }
    return (
        <div className="task-card">
            {showEdit ? (<TaskCreate task={task} taskFormUpdate={true} onUpdate={handleSubmit} />
            )
                : (<div className="task">
                    <h3>Göreviniz</h3>
                    <p>{task.title}</p>
                    <h3>Yapılacaklar</h3>
                    <p>{task.taskDesc}</p>
                    <div className="card-btn-box">
                        <button className="card-btn" onClick={handleDelete}>Sil</button>
                        <button className="card-btn" onClick={handleEdit}>Güncelle</button>
                    </div></div>)
            }

        </div>
    );
}

export default TaskShow;