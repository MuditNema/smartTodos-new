import { useEffect , useContext } from "react";
import deleteIcon from "../assets/delete.png";
import { Task1Context } from "../TaskContext/Task1State";
const TodoCard = (props) => {
    let deadline;
    function extractDate(raw){
      let day = raw[8] + raw[9];
      let month = raw[5] + raw[6];
      deadline = day + "/" + month;
      console.log(deadline);
    }
    extractDate(props.todo.TaskDeadline);
    const task1context = useContext(Task1Context);
    const {UpdateTask} = task1context;
    return ( 
        <div className={`todo-card ${props.todo.isDeleted === true?'hide':''} ${props.todo.isPending===false?'completed-task':''}`}>
          <input
            type="checkbox"
            checked={!props.todo.isPending}
            value=""
            data-check-id={props.todo._id}
            onClick={async ()=>{
              const val = await UpdateTask(props.todo._id,!props.todo.isPending,props.todo.isDeleted);
              console.log(val);
            }}
          />
          <h1 className="todo-title">
            {props.todo.TaskName}
          </h1>
          <p className="todo-desc">
            {props.todo.TaskDescription}
          </p>
          <div className="todo-footer">
            <div className="deadline-indicator">
              <span>{deadline}</span>
            </div>
            <button className="delete-btn" onClick={async ()=>{
              const val = await UpdateTask(props.todo._id,props.todo.isPending,!props.todo.isDeleted);
              console.log(val);
            }}>
              <img src={deleteIcon} alt="" />
            </button>
          </div>
        </div>
     );
}
 
export default TodoCard;