import { useContext ,useState} from "react";
import { StyleContext } from "../hooks/context";

function VolumeHandler() {
    const [settings,updateSettings]=useContext(StyleContext)
    const [volume,setVolume]=useState(settings.volume);
    const volumeHandler=(event)=>{
        const vol=event.currentTarget.value;
        setVolume(vol)  
        updateSettings({volume:vol})      
    }
    return ( 
        <div className='settings_subcontainer'>
            <span><b>volume</b></span>
        <input className='volume_slider' type="range"  min="0" max="100"onChange={volumeHandler} defaultValue={volume}/>
        </div>
     );
}

export default VolumeHandler;