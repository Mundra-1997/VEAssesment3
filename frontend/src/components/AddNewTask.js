import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddNewTask.css'; // Import your CSS file

const AddTaskForm = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
    };

    // Create a new task
    axios
      .post('http://localhost:5000/tasks', taskData)
      .then(() => {
        navigate('/'); // Redirect to the task list after adding
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });
  };

  return (
    <div className="add-task-container">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Title:</label>
          <input
            type="text"
            ref={titleRef}
            required
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Description:</label>
          <textarea
            ref={descriptionRef}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
