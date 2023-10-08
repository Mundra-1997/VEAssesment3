import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 import './TaskList.css'; 
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const TaskList=()=> {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  
    axios
      .get('https://v3btodo.onrender.com/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleDelete = (taskId) => {
    console.log('Deleting task with ID:', taskId);

    axios
      .delete(`https://v3btodo.onrender.com/tasks/${taskId}`)
      .then(() => {
           toast.success('Task Deleted successfully!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, 
      });
        console.log('Task deleted successfully.');
       
        setTasks(tasks.filter((task) => task._id !== taskId));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  const handleComplete = (taskId, completed) => {
    console.log('Completing task with ID:', taskId);

    axios
      .put(`https://v3btodo.onrender.com/tasks/${taskId}`, { completed: !completed })
      .then(() => {
        console.log('Task marked as completed successfully.');
        
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error marking task as completed:', error);
      });
  };

  return (
    <div className="task-list-container">
      <h2 className='heading'>Task List</h2>
      <button onClick={() => navigate('/addNewTask')} className='task-button'>Add New Task</button>
      {tasks.map((task) => (
        <div key={task._id} className="task-item">
          <span
            onClick={() => navigate(`/${task._id}`)}
            className={`task-title ${task.completed ? 'completed' : ''}`}
          >
            {task.title}
          </span>
          <button className='task-button' onClick={() => navigate(`/editTask/${task._id}`) }>Edit</button>
          <button  className='task-button' onClick={() => handleDelete(task._id)}>Delete</button>
          <button  className='task-button' onClick={() => handleComplete(task._id, task.completed)}>
            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
        </div>
      ))}
      <ToastContainer/>
    </div>
  );
}

export default TaskList;
