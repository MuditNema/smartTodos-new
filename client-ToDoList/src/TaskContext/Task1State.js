import { createContext , useContext, useState } from "react";
import React from 'react'
import { Usercontext } from "../UserContext/UserState";

const Task1Context = createContext();
    
const Task1State = (props) => {
        const usercontext = useContext(Usercontext);
        const {UserDetails} = usercontext;
        const {AuthToken} = usercontext
        const [Todos, setTodos] = useState([]);
        const FetchUserTask = async (id) => {
            console.log(id);
            const url = `http://localhost:5000/firstlist/showtask/${id}`;
            try {
                const response = await fetch(url, {
                    method: 'GET', 
                    mode: 'cors', 
                    headers: {
                    'Content-Type': 'application/json',
                    'auth-token' : AuthToken
                    },
                });
                const result = await response.json();
                console.log(result);
                setTodos(result.Tasks);
                return ({message : result.message,Tasks : result.Tasks})
            } catch (error) {
                return ({message : "Failed to fetch data"});
            }
        }
        const AddATask =  async (TaskName , TaskDescription ,  TaskDeadline) => {
            const url = 'http://localhost:5000/firstlist/addtask';
            try {
                const response = await fetch(url, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    headers: {
                    'Content-Type': 'application/json',
                    'auth-token' : AuthToken
                    },
                    body : JSON.stringify({TaskName,TaskDescription,TaskDeadline})
                });
                const result = await response.json();
                FetchUserTask(UserDetails._id);
                return ({message : "Task added successfully", AddedTask : result.AddedTask})
            } catch (error) {
                return ({message : "Failed to add task"});
            }
        }
        const UpdateTask = async (id,isPending,isDeleted) => {
            const url = `http://localhost:5000/firstlist/updatetask/${id}`;
            try {
                const response = await fetch(url,{
                    method : 'PUT',
                    mode :'cors',
                    headers : {
                        'Content-Type' : 'application/json',
                        'auth-token' : AuthToken
                    },
                    body : JSON.stringify({isPending,isDeleted})
                })
                const result = await response.json();
                FetchUserTask(UserDetails._id);
                return ({message : "Task updated succesfully" ,UpdatedTask : result.UpdatedTask})
            } catch (error) {
                return ({message : "Failed to update task"});
            }
        }
    return (
        <Task1Context.Provider value={{UpdateTask,AddATask,FetchUserTask,Todos, setTodos}}>
            {props.children}
        </Task1Context.Provider>
    )
}

export  {Task1Context,Task1State}
