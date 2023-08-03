import { useState } from "react";

function TaskCreate({ onCreate, task, taskFormUpdate, onUpdate }) {
    const [title, setTitle] = useState(task ? task.title : '')
    const [taskDesc, setTaskDesc] = useState(task ? task.taskDesc : '')

    const handleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleTaskChange = (e) => {
        setTaskDesc(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (taskFormUpdate) {
            onUpdate(task.id, title, taskDesc)
        } else {
            onCreate(title, taskDesc);
        }
        setTitle('');
        setTaskDesc('');
    }

    return (

        <div>{taskFormUpdate ? (<div className="task-update">
            <h3 className="header">Lütfen Taskı Düzenleyiniz!</h3>
            <form className="create-form">
                <label> Başlığı Güncelle </label>
                <input value={title} onChange={handleChange} type="text" />
                <label> Yapılacak Görevi Güncelle</label>
                <textarea value={taskDesc} onChange={handleTaskChange} rows={7} />
                <button className="btn-create btn-update" onClick={handleSubmit}> Task Düzenle </button>
            </form>
        </div>) : (<div className="task-create">
            <h3 className="header">Lütfen Task Ekleyiniz!</h3>
            <form className="create-form">
                <label> Başlık Giriniz </label>
                <input value={title} onChange={handleChange} type="text" />
                <label> Yapılacak Görevi Giriniz</label>
                <textarea value={taskDesc} onChange={handleTaskChange} rows={7} />
                <button className="btn-create " onClick={handleSubmit}> Taskı Oluştur </button>
            </form>
        </div>)}</div>

    );
}

export default TaskCreate;