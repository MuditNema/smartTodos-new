import React from "react";
import User from "./User";
import react from "../assets/React.png";
import js from "../assets/JavaScript.png";
import { Link, useLocation } from "react-router-dom";

const LandingRight = () => {
    const location = useLocation();
  return (
    <div className="right-wrapper body-item">
      <User />
      <div className="extra-desc">
        <p>Use the analytics tab to reflect on your todo progress.</p>
        <p>
          Choose a productivity coach from over 100+ registered coaches to
          recieve expert guidance.
        </p>
      </div>
      <div className="btn-container">
          <div className={`sign-up landing-btns ${location.pathname === '/signup'?'hide':''}`}><Link to="/signup">Sign up</Link></div>
          <div className={`login landing-btns ${location.pathname === '/login'?'hide':''}`}><Link to="/login">Log in</Link></div>
      </div>
      <div className="developed-with">
          <h3>Developed <br/>with MERN</h3>
          <img src={react} alt="" />
          <img src={js} alt="" />
      </div>
    </div>
  );
};

export default LandingRight;
