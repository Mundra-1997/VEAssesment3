import logo from './logo.svg';
import './App.css';
import TaskList from './components/TaskList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskDetails from './components/TaskDetails';
import AddTaskForm from './components/AddNewTask';
import EditTaskForm from './components/EditTask';
function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<TaskList/>}/>
      <Route path='/:id' element={<TaskDetails/>}/>
      <Route path='/addNewTask' element={<AddTaskForm/>}/>
     <Route path="/editTask/:taskId" element={<EditTaskForm />} />

      

    </Routes>
   </Router>
  );
}

export default App;
