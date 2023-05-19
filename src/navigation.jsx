import App from "./App";
import WorkoutTimer from "./workout";
import Stopwatch from "./stopwatch";
import History from "./history";
import {Route, NavLink, Routes } from 'react-router-dom';
import { invoke } from "@tauri-apps/api";
import { loadSettings } from "./hooks/localStorage";
import Icon from "./components/icon";
import Details from "./setting_details";
import { useState } from "react";


function Navbar() {
   const [settings,setSettings]=useState(loadSettings())
   //onClick={()=>invoke('open_settings_window')}
    return (
        
            <div className={ `app  ${settings.theme}`} style={{backgroundImage:`url(${settings.backgroundImageUrl})`}} >
                <div className="menu">
                 
                      <NavLink to="/" data-testid="timer" ><Icon icon="timer.svg"/></NavLink>
                
                      <NavLink to="/stopwatch" data-testid="stopwatch"><Icon icon="stopwatch.svg"/></NavLink>
                  
                      <NavLink to="/interval" data-testid="interval"><Icon icon="interval.svg"/></NavLink>
            
                      <NavLink to={{pathname:"/settings" }}><Icon icon="settings.svg"/></NavLink>
                 
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
                      element={<Details/>}>
                  </Route>

                </Routes>

    
                   <History />

            </div>
            
    );
}

export default Navbar;