import { useState } from 'react';
import  './settings_style.css';
import { loadSettings, updateSettings } from './hooks/localStorage';

function Details(){
    const settings=loadSettings()
    const [imageUrl,setImageUrl]=useState(settings.backgroundImageUrl);
    const [volume,setVolume]=useState(settings.volume);
    const [theme,setTheme]=useState(settings.theme);
    const imageHandler=(event)=>{
        const image=URL.createObjectURL(event.target.files[0])
        setImageUrl(image);
    }
    const volumeHandler=(event)=>{
        const val=event.currentTarget.value;
        setVolume(val)        
    }
    const toggleTheme=()=>{
        const updatedTheme=theme==='dark'? 'light': 'dark';
        setTheme(updatedTheme)       
      }
    const save=()=>{
       updateSettings({theme,backgroundImageUrl:image,volume})
    }
    const cancel=()=>{
        setImageUrl(settings.backgroundImageUrl)
        setTheme(settings.theme)
        setVolume(settings.volume)
    }
    return (
       <div className='setting_page'>
       <form>
        <label htmlFor='input_image'>
            <span className='image'><img src={imageUrl} onLoad={(event)=>event.currentTarget.style.display="none"}/></span>
        </label>
        
        <input type='file'  accept='image/*' name='input_image' id='input_image' onChange={imageHandler}/>
        <div className='volume'>
        <img    src={`${volume==0 ?' mute.svg' : 'unmute.svg'}`}/>
        <input className='volume_input' type="range" id='volume_slider' min="0" max="100"onChange={volumeHandler}/>
        </div>
        <div>
        <img onClick={toggleTheme} className={`theme_icon ${theme=='dark'? 'dark_bg':'light_bg'}`} src={`${theme=='dark'? 'moon.svg':'sun.svg'}`}/>
        </div>
       </form>
       <div>
       <button onClick={save} >save</button>
       <button onClick={cancel}>cancel</button>
       </div>
       </div>
    )
}
export default Details;