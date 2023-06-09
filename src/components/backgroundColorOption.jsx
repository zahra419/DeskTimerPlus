import { useContext } from "react";
import { StyleContext } from "../hooks/context";
import { getContrastYIQ } from "../hooks/functions";

function BackgroundColorOption({color}) {
    const [settings,updateSettings]=useContext(StyleContext)
    return (  
        <div  className="color_box" role="color_option" style={{backgroundColor:`${color}`}} onClick={()=>updateSettings({backgroundColor:color,color: getContrastYIQ(color)})}></div>
    );
}

export default BackgroundColorOption;