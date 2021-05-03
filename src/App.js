import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercises.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import Login from "./components/login.component";
import LoginFirst from "./components/loginfirst.component";
import PickyFinderHome from "./components/pickyfinderhome.component";
import AddEvent from "./components/addevent.component";


function App() {
  return (
    <Router>
      <div className="container">

        <br/>
        <Route path="/" exact component={ExercisesList} />
        <Route path="edit/:id" compnent={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
        <Route path="/login" component={Login} />
        <Route path="/loginfirst" component={LoginFirst} />
        <Route path="/pickyfinderhome" component={PickyFinderHome} />
        <Route path="/addevent" component={AddEvent} />
        </div>
    </Router>
  );
}

export default App;
