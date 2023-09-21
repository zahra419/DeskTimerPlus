import { useState, useEffect, createContext} from "react";
import { loadLocalStorageValues,updateLocalStorageValues } from "./localStorage";



const initialValues=loadLocalStorageValues()
export const StyleContext=createContext([initialValues,()=>{}])

export function ContextProvider(props){
    const [settings,setSettings]=useState(initialValues)
    const [style,updateStyle]=useState(initialValues)
    useEffect(()=>{
        updateLocalStorageValues(settings)
        const settingsValues=loadLocalStorageValues()
        setSettings(settingsValues)
        updateStyle({
            fontFamily:`${settingsValues.fontFamily}`,
            backgroundColor: `${settingsValues.backgroundColor}`,
            color: `${settingsValues.color}`
        })
       
    },[settings.volume,settings.fontFamily,settings.backgroundColor,settings.color,settings.notification])
    return(
        <StyleContext.Provider value={[settings,setSettings]}>
            <div className="app" style={style}>{props.children}</div>
        </StyleContext.Provider>
    )
}
