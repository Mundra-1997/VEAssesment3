import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditTask.css'; 
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

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

  
    axios
      .put(`https://v3btodo.onrender.com/tasks/${taskId}`, taskData)
      .then(() => {
         toast.success('Task edited Successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Close the toast after 3 seconds
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
        console.error('Error updating task:', error);
      });
  };

  return (
    <div className="edit-task-container">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
       
        <div>
          <label className="form-label">Title:</label>
          <input type="text" ref={titleRef} required className="form-input" />
        </div>
        <div>
          <label className="form-label">Description:</label>
          <textarea ref={descriptionRef} required className="form-input" />
        </div>
        <div>
         
        </div>
        <button type="submit" className="submit-button">
          Save
        </button>
      </form>
       <ToastContainer/>
    </div>
  );
}

export default EditTaskForm;
