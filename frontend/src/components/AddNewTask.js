import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddNewTask.css'; 
 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

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

    
    axios
      .post('https://v3btodo.onrender.com/tasks', taskData)
      .then(() => {
         toast.success('Task Added successfully!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, 
      });
       e.target.reset();
          setTimeout(() => {
          navigate('/');
        }, 3000);
       
      })
      .catch((error) => {
           toast.error('Something went wrong', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, 
      });
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
      
       <ToastContainer/>
    </div>
  );
};

export default AddTaskForm;
