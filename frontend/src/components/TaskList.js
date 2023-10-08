import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 import './TaskList.css'; // Import your CSS file

const TaskList=()=> {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all tasks from the backend
    axios
      .get('http://localhost:5000/tasks')
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
      .delete(`http://localhost:5000/tasks/${taskId}`)
      .then(() => {
        console.log('Task deleted successfully.');
        // Remove the deleted task from the state
        setTasks(tasks.filter((task) => task._id !== taskId));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  const handleComplete = (taskId, completed) => {
    console.log('Completing task with ID:', taskId);

    axios
      .put(`http://localhost:5000/tasks/${taskId}`, { completed: !completed })
      .then(() => {
        console.log('Task marked as completed successfully.');
        // You can update the task status in the state or fetch the updated data
        // For simplicity, you can reload the task list
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
    </div>
  );
}

export default TaskList;
