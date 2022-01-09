import React from 'react'
import logo from '../assets/logo.png'
import dashboard from '../assets/dashboard.png'
import analytics from '../assets/analytics.png'
import coaches from '../assets/coaches.png'
import settings from '../assets/settings.png'
import logout from '../assets/logout.png'
import as_coach from '../assets/as_coach.png'
import { useHistory } from 'react-router'
import { Usercontext } from '../UserContext/UserState'
import { useContext } from 'react'
const SideNavbar = () => {
    const history = useHistory();
    const usercontext = useContext(Usercontext)
    const {setAuthToken,setSuccess,setUserDetails} = usercontext;
    const LogOut = () => {
        setSuccess(false);
        setAuthToken('');
        setUserDetails({});
        history.push('/')
    }
    return (
        <div className="side-wrapper body-item">
            <div className="logo-container">
                <div className="logo-img"><img src={logo} alt="" /></div>
                <div className="logo-title">smart<span>Todo</span></div>
            </div>
            <div className="navbar-list">
                <button className="navbar-item">
                    <img src={dashboard} alt="" />
                    <span>Dashboard</span>
                </button>
                <button className="navbar-item">
                    <img src={analytics} alt="" />
                    <span>Analytics</span>
                </button>
                <button className="navbar-item">
                    <img src={coaches} alt="" />
                    <span>Productivity Coaches</span>
                </button>
                <button className="navbar-item">
                    <img src={as_coach} alt="" />
                    <span>Register as coach</span>
                </button>
                <button className="navbar-item">
                    <img src={settings} alt="" />
                    <span>Settings</span>
                </button>
                <button className="navbar-item">
                    <img src={logout} alt="" />
                    <span onClick={LogOut}>Log out</span>
                </button>
            </div>
        </div>
    )
}

export default SideNavbar
