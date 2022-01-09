import deleteIcon from "../assets/delete.png";
import { useContext } from "react";
import { Task2Context } from "../TaskContext/Task2state";
const TodoItem = (props) => {
    const task2context = useContext(Task2Context);
    const {UpdateTask2} = task2context;
  return (
    <div className={`task ${props.todo.isDeleted === true?'hide':''} ${props.todo.isPending===false?'completed-todo':''}`}>
      <input type="checkbox" id="1234" checked={!props.todo.isPending}
            value=""
            data-check-id={props.todo._id} 
            onClick={async ()=>{
                const val = await UpdateTask2(props.todo._id,!props.todo.isPending,props.todo.isDeleted);
                console.log(val);
              }}/>
      <label for="1234">
        <span className="custom-checkbox">{props.todo.TaskName}</span>
      </label>
      <button className="delete-todo"
      onClick={async ()=>{
        const val = await UpdateTask2(props.todo._id,props.todo.isPending,!props.todo.isDeleted);
        console.log(val);
      }}><img src={deleteIcon} alt="" /></button>
    </div>
  );
};

export default TodoItem;