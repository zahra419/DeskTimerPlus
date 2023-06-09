import { useContext } from "react";
import { StyleContext } from "../hooks/context";

function FontOption({font}) {
    const [settings,updateSettings]=useContext(StyleContext)

    return ( 
        <span className="font_option" role="font_option" style={{fontFamily:`${font}`}} onClick={()=>{updateSettings({fontFamily:font})}}>0123456789</span>
     );
}

export default FontOption;