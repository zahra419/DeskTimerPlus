import App from "./App";
import WorkoutTimer from "./workout";
import Stopwatch from "./stopwatch";
import {Route, NavLink, Routes } from 'react-router-dom';



function Navbar() {
    return (
        
  
            <div className="App">
                <div className="menu">
                 
                      <NavLink to="/" >Timer</NavLink>
                
                      <NavLink to="/stopwatch" >Stopwatch</NavLink>
                  
                      <NavLink to="/interval" >Interval Timer</NavLink>
                 
                </div>
                <Routes>
                  <Route exact path='/'
                      element={<App/>}>
                  </Route>
                  <Route exact path='/stopwatch'
                      element={<Stopwatch/>}>
                  </Route>
                  <Route exact path='/interval'
                      element={<WorkoutTimer/>}>
                  </Route>
                </Routes>
            </div>
    
            
    );
}

export default Navbar;