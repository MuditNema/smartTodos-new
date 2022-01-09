import { useContext , useEffect , useState } from "react";
import { Task1Context } from "../TaskContext/Task1State";
import { Task2Context } from "../TaskContext/Task2state";
import {Usercontext} from "../UserContext/UserState"
import TodoCard from "./TodoCard";
import TodoItem from './TodoItem';
import User from './User'
const TodoContainer = () => {
    const usercontext = useContext(Usercontext);
    const {UserDetails,Success} = usercontext;
    const task1context = useContext(Task1Context);
    const {Todos,FetchUserTask,AddATask} = task1context;
    const task2context = useContext(Task2Context);
    const {Todos2,FetchUserTask2,AddATask2} = task2context;

    const [Task1Creds, setTask1Creds] = useState({taskname1 : '',taskdescription : '',taskdeadline : ''});
    const [taskname1, settaskname1] = useState('');
    const [taskdescription, settaskdescription] = useState('');
    const [taskdeadline, settaskdeadline] = useState('');

    const [Task2Creds, setTask2Creds] = useState({taskname2 : ''});
    const [taskname2, settaskname2] = useState('');
    

    useEffect(() => {
      if(UserDetails.numtask==="0-7"){
        const Run = async() =>{
          const val = await FetchUserTask(UserDetails._id);
          console.log(val);
        }
        Run();

      }
      else{
      const Run2 = async() =>{
        const val = await FetchUserTask2(UserDetails._id);
        console.log(val);
      }
      Run2();
      }
    }, [])

    const HandleSubmit1 = async (e) => {
      e.preventDefault();
      let val = await AddATask(Task1Creds.taskname1 , Task1Creds.taskdescription , Task1Creds.taskdeadline)
      settaskname1('');
      settaskdescription('');
      settaskdeadline('');
      console.log(val);
    }
    const HandleValue1 = async (e) => {
      if(e.target.name === 'taskname1') {settaskname1(e.target.value)}
      if(e.target.name === 'taskdescription') {settaskdescription(e.target.value)}
      if(e.target.name === 'taskdeadline') {settaskdeadline(e.target.value)}
      setTask1Creds({...Task1Creds,[e.target.name] : e.target.value})
    }

    const HandleSubmit2 = async (e) => {
      e.preventDefault();
      let val = await AddATask2(Task2Creds.taskname2)
      settaskname2('');
      console.log(val);
    }
    const HandleValue2 = async (e) => {
      if(e.target.name === 'taskname2') {settaskname2(e.target.value)}
      setTask2Creds({...Task2Creds,[e.target.name] : e.target.value})
    }

  return (


    <div className="dashboard-container">
      <div className="dashboard-header">
          <div className="dashboard-title">{`${UserDetails.username}'s Workspace`}</div>
          <User />
      </div>
      {UserDetails.numtask==="0-7"?
      <>
      <div className="todo-container">
      {Todos.map((todo) => {
          return(
              <TodoCard todo={todo}/>
          )
      })}
    </div>
    <form onSubmit = {HandleSubmit1}>
      <div className="form-wrapper">
    <div className="mb-3 form-field">
      <label htmlFor="taskname1" className="form-label ">
        Task Name
      </label>
      <input
        name="taskname1"
        type="text"
        className="form-control"
        id="taskname1"
        value={taskname1}
        onChange = {HandleValue1}
      />
    </div>
    <div className="mb-3 form-field">
      <label htmlFor="taskdescription" className="form-label">
        Task Description
      </label>
      <input
        name="taskdescription"
        type="text"
        className="form-control"
        id="taskdescription"
        value={taskdescription}
        onChange = {HandleValue1}
      />
    </div>
    </div>
    <div className="form-wrapper">
    <div className="mb-3 form-field">
      <label htmlFor="taskdeadline" className="form-label">
        Deadline
      </label>
      <input
        name="taskdeadline"
        type="date"
        className="form-control"
        id="taskdeadline"
        value={taskdeadline}
        onChange = {HandleValue1}
      />
    </div>
    <button type="submit" className="btn btn-primary submit-btn">
      Add new task
    </button>
    </div>
  </form>
  </>
     :
     <>
     <div className="todo-list-container">
      {Todos2.map((todo) => {
            return(
                <TodoItem todo={todo}/>
            )
        })}
      </div>
      <form onSubmit={HandleSubmit2}>
    <div className="mb-3 form-field">
      <label htmlFor="taskname2" className="form-label ">
        Task Name
      </label>
      <input
        name="taskname2"
        type="text"
        className="form-control"
        id="taskname2"
        value={taskname2}
        onChange={HandleValue2}
      />
    </div>
    <button type="submit" className="btn btn-primary submit-btn">
      Add new task
    </button>
    </form>
      </>
      }
     
      
      
    </div>

  );
};

export default TodoContainer;
