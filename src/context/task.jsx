import { createContext } from "react";
import axios from 'axios'
import { useState } from 'react'

const TasksContext = createContext();

function Provider({ children }) {

    const [tasks, setTasks] = useState([])

    const createTask = async (title, taskDesc) => {
        const response = await axios.post('http://localhost:3000/tasks', {
            title,
            taskDesc
        });
        const createdTasks = [
            ...tasks, response.data
        ];
        setTasks(createdTasks);
    }

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:3000/tasks');
        setTasks(response.data);
    }

    const deleteTaskById = async (id) => {
        await axios.delete(`http://localhost:3000/tasks/${id}`);
        const afterDeletingTasks = tasks.filter((task) => {
            return task.id !== id
        })
        setTasks(afterDeletingTasks);
    }

    const editTaskById = async (id, updatedTitle, updatedTaskDesc) => {
        await axios.put(`http://localhost:3000/tasks/${id}`, {
            title: updatedTitle,
            taskDesc: updatedTaskDesc
        });
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return { id, title: updatedTitle, taskDesc: updatedTaskDesc }
            }
            return task;
        })
        setTasks(updatedTasks)
    };

    const sharedValues = {
        tasks,
        createTask,
        editTaskById,
        fetchTasks,
        deleteTaskById,

    };


    return (
        <TasksContext.Provider value={sharedValues}        >
            {children}
        </TasksContext.Provider>
    )
}

export { Provider }
export default TasksContext;