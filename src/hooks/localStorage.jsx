
const defaultSettings={backgroundColor:'#000000',volume:'100',fontFamily:'serif',color:'white',notification:true};
export function updateLocalStorageValues(settingsValues){
   
        localStorage.setItem("settings",JSON.stringify(
            Object.assign(defaultSettings,settingsValues)
         )) 
    

}
export function loadLocalStorageValues(){
    const values=localStorage.getItem("settings");
    const settings=JSON.parse(values);
    return settings || defaultSettings;
}
// how to use updateSettings({theme='light'}) 

