import react from "react";
import { useState,useContext } from "react";
import { useHistory } from "react-router";
import { Usercontext } from "../UserContext/UserState";


const Login = () => {

  const [UserCreds, setUserCreds] = useState({email : '', password : ''});
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    
    const usercontext = useContext(Usercontext);
    const {LoginUser} = usercontext;
    const history = useHistory();
    const HandleSubmit = async(e) => {
      e.preventDefault();
      const val = await LoginUser(UserCreds.email,UserCreds.password);
      if(val){
        history.push('/dashboard');
      }
    }
    const HandleValue = (e) => {
      if(e.target.name === 'email') {setemail(e.target.value)}
      if(e.target.name === 'password') {setpassword(e.target.value)}
      setUserCreds({...UserCreds,[e.target.name] : e.target.value})
    }

  return (
    <div className="middle-wrapper body-item login-container">
        <div className="app-motto login-motto">
                <h1>Login to navigate to your dashboard</h1>
        </div>
      <form onSubmit={HandleSubmit}>
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
            id="password"
            value={password}
            onChange={HandleValue}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
