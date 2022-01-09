import react, { useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router";
import { Usercontext } from "../UserContext/UserState";
const Signup = () => {
  
    const [UserCreds, setUserCreds] = useState({email : '', password : '',username : '',numtask : '',work : ''});
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [username, setusername] = useState('')
    const [numtask, setnumtask] = useState('')
    const [work, setwork] = useState('');


    const usercontext = useContext(Usercontext);
    const {CreateUser} = usercontext;
    const history = useHistory();
    const HandleSubmit = async(e) => {
      e.preventDefault();
      const val = await CreateUser(UserCreds.username,UserCreds.email,UserCreds.password,UserCreds.work,UserCreds.numtask);
      if(val){
        history.push('/login');
      }
    }
    const HandleValue = (e) => {
      if(e.target.name === 'username') {setusername(e.target.value)}
      if(e.target.name === 'work') {setwork(e.target.value)}
      if(e.target.name === 'email') {setemail(e.target.value)}
      if(e.target.name === 'password') {setpassword(e.target.value)}
      if(e.target.name === 'numtask') {setnumtask(e.target.value)}
      setUserCreds({...UserCreds,[e.target.name] : e.target.value})
    }
    return ( 
        <div className="middle-wrapper body-item">
            <div className="app-motto login-motto">
                <h1>Let us know you more.</h1>
                <h1>Get started!</h1>
        </div>
      <form class="signup-form" onSubmit={HandleSubmit}>
        <div className="mb-3 form-field">
          <label htmlFor="email" className="form-label ">
            Email address
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={email}
            onChange={HandleValue}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3 form-field">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={HandleValue}
          />
        </div>
        <div className="mb-3 form-field">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            name="username"
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={HandleValue}
          />
        </div>
        <div className="option-wrapper">
        <div className="mb-3 form-field">
            <label htmlFor="numtask">Number of tasks</label><br/>
          <select name="numtask" id="numtask" value={numtask} onChange={HandleValue}>
              <option value="0-7">0 to 7 tasks per day</option>
              <option value="7-15">7 to 15 tasks per day</option>
              <option value="15">15+ tasks per day</option>
          </select>
        </div>
        <div className="mb-3 form-field">
            <label htmlFor="work">Profession</label><br/>
          <select name="work" id="work" value={work} onChange={HandleValue}>
              <option value="business">Business professional</option>
              <option value="student">Student</option>
              <option value="job">Job professional</option>
              <option value="others">Others</option>
          </select>
        </div>
        </div>
        
        <button type="submit" className="btn btn-primary submit-btn">
          Sign up
        </button>
      </form>
        </div>
    );
}
 
export default Signup;