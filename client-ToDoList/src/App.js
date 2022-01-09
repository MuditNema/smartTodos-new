import "./App.css";
import SideNavbar from "./Components/SideNavbar";
import LandingMiddle from "./Components/LandingMiddle";
import LandingRight from "./Components/LandingRight";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { UserState } from "./UserContext/UserState";
import TodoContainer from "./Components/TodoContainer";
import { Task1State } from "./TaskContext/Task1State";
import { Task2State } from "./TaskContext/Task2state";
import CoachCard from './Components/CoachCard'

function App() {
  return (
    <UserState>
      <Task1State>
        <Task2State>
          <Router>
            <div className="body-wrapper">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
              <SideNavbar />
              <Switch>
                <Route exact path="/">
                  <LandingMiddle />
                  <LandingRight />
                </Route>
                <Route exact path="/signup">
                  <Signup />
                  <LandingRight />
                </Route>
                <Route exact path="/login">
                  <Login />
                  <LandingRight />
                </Route>
                <Route exact path="/dashboard">
                  <TodoContainer />
                </Route>
                <Route exact path="/coaches">
                  <CoachCard />
                </Route>
              </Switch>

            </div>
          </Router>
        </Task2State>
      </Task1State>
    </UserState>
  );
}

export default App;
