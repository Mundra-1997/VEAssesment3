import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TaskDetails.css'; // Import your CSS file

const TaskDetails=()=> {
  const [task, setTask] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    
    axios
      .get(`https://v3btodo.onrender.com/tasks/${id}`)
      .then((response) => {
        setTask(response.data);
      })
      .catch((error) => {
        console.error('Error fetching task details:', error);
      });
  }, [id]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="task-details-container">
      <h2 className="task-title">Task Details</h2>
      <h3 className="task-title">Title: {task.title}</h3>
      <p className="task-description">Description: {task.description}</p>
      <p className="task-status">
        Status: {task.completed ? 'Completed' : 'Pending'}
      </p>
    </div>
  );
}

export default TaskDetails;
