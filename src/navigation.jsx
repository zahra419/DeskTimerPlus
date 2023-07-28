import App from "./App";
import WorkoutTimer from "./workout";
import Stopwatch from "./stopwatch";
import {Route, NavLink, Routes } from 'react-router-dom';
import Icon from "./components/icon";
import { ContextProvider } from "./hooks/context";
import SettingsPage from "./settingsPage";

function Navbar() {
  
    return (
        <ContextProvider >
            
                <div className="menu">
                 
                      <NavLink to="/" data-testid="timer" ><Icon icon="timer.svg"/></NavLink>
                
                      <NavLink to="/stopwatch" data-testid="stopwatch"><Icon icon="stopwatch.svg"/></NavLink>
                  
                      <NavLink to="/interval" data-testid="interval"><Icon icon="interval.svg"/></NavLink>
            
                      <NavLink to={"/settings"} data-testid="settings"><Icon icon="settings.svg"/></NavLink>
                 
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
                  <Route exact path='/settings'
                      element={<SettingsPage/>}>
                  </Route>

                </Routes>
          
            </ContextProvider>
    );
}

export default Navbar;