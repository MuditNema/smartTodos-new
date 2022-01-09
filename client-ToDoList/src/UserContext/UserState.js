import { createContext } from "react";
import React from 'react'
import { useState } from "react";
 
const Usercontext = createContext();
const UserState = (props) => {

    const [AuthToken, setAuthToken] = useState('');
    const [Success, setSuccess] = useState(false);
    const [UserDetails, setUserDetails] = useState({});

    const LoginUser = async (email,password) => {
        const url = 'http://localhost:5000/user/loginuser';
        try {
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                  'Content-Type': 'application/json'
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({email,password}) // body data type must match "Content-Type" header
              });
              const result = await response.json();
              setSuccess(result.success);
              setAuthToken(result.authtoken);
              setUserDetails(result.user);
              return result;
        } catch (error) {
            setSuccess(false);
            return false;
        }
    }

    const CreateUser = async (username,email,password,work,numtask) => {
        const url = 'http://localhost:5000/user/createuser';
        try {
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({username,email,password,work,numtask}) // body data type must match "Content-Type" header
              });
              const result = await response.json();
              return result.success;
        } catch (error) {
            return false;
        }
    }


    return (
        <Usercontext.Provider value ={{LoginUser,setSuccess,Success,setAuthToken,AuthToken,CreateUser,UserDetails,setUserDetails}}>
            {props.children}
        </Usercontext.Provider>
    )
}

export  {Usercontext,UserState}
