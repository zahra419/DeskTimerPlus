
const defaultSettings={backgroundImageUrl:'',theme:'dark',volume:100};
export function updateSettings(objects){
   
        localStorage.setItem("settings",JSON.stringify(
            Object.assign(defaultSettings,objects)
         )) 
    

}
export function loadSettings(){
    const values=localStorage.getItem("settings");
    const settings=JSON.parse(values);
    return settings || defaultSettings;
}
// how to use updateSettings({theme='light'}) 

