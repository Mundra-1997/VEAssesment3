import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditTask.css'; // Import your CSS file

const EditTaskForm=()=> {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const navigate = useNavigate();
  const { taskId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
    };

    // Update an existing task
    axios
      .put(`http://localhost:5000/tasks/${taskId}`, taskData)
      .then(() => {
        navigate('/'); // Redirect to the task list after editing
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  };

  return (
    <div className="edit-task-container">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for editing */}
        <div>
          <label className="form-label">Title:</label>
          <input type="text" ref={titleRef} required className="form-input" />
        </div>
        <div>
          <label className="form-label">Description:</label>
          <textarea ref={descriptionRef} required className="form-input" />
        </div>
        <div>
          {/* Additional elements */}
        </div>
        <button type="submit" className="submit-button">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditTaskForm;
