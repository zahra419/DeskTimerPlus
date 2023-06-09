import { useState } from "react";
import { StyleContext } from "../hooks/context";
import { useContext } from "react";
function NotificationHandler() {
    const [settings,setSettings]=useContext(StyleContext)
    const [checked,setChecked]=useState(settings.notification)
    console.log(settings.notification)
    const notificationHandler=()=>{
    
        setChecked(!checked)
        setSettings({notification:!checked})
  
    }
    return ( 
    <div className="settings_subcontainer">
     <span><b>notification</b></span>
     <div>
     <input type="checkbox" checked={checked}  onChange={notificationHandler} />
    
     </div>
    </div> );
}

export default NotificationHandler;