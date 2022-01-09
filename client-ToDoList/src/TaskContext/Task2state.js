import { createContext , useContext, useState } from "react";
import React from 'react'
import { Usercontext } from "../UserContext/UserState";

const Task2Context = createContext();
    
const Task2State = (props) => {
        const usercontext = useContext(Usercontext);
        const {UserDetails} = usercontext;
        const {AuthToken} = usercontext
        const [Todos2, setTodos2] = useState([]);

        const FetchUserTask2 = async (id) => {
            console.log(id);
            const url = `http://localhost:5000/secondlist/showtask/${id}`;
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
                setTodos2(result.Tasks);
                return ({message : result.message,Tasks : result.Tasks})
            } catch (error) {
                return ({message : "Failed to fetch data"});
            }
        }
        const AddATask2 =  async (TaskName) => {
            const url = 'http://localhost:5000/secondlist/addtask';
            try {
                const response = await fetch(url, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    headers: {
                    'Content-Type': 'application/json',
                    'auth-token' : AuthToken
                    },
                    body : JSON.stringify({TaskName})
                });
                const result = await response.json();
                FetchUserTask2(UserDetails._id);
                return ({message : "Task added successfully", AddedTask : result.AddedTask})
            } catch (error) {
                return ({message : "Failed to add task"});
            }
        }
        const UpdateTask2 = async (id,isPending,isDeleted) => {
            const url = `http://localhost:5000/secondlist/updatetask/${id}`;
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
                FetchUserTask2(UserDetails._id);
                return ({message : "Task updated succesfully" ,UpdatedTask : result.UpdatedTask})
            } catch (error) {
                return ({message : "Failed to update task"});
            }
        }
    return (
        <Task2Context.Provider value={{UpdateTask2,AddATask2,FetchUserTask2,Todos2, setTodos2}}>
            {props.children}
        </Task2Context.Provider>
    )
}

export  {Task2Context,Task2State}
