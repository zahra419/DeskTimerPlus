
const defaultSettings={backgroundColor:'#000000',volume:'100',fontFamily:'Black Ops One',color:'white',notification:true};
const obj={}
Object.defineProperty(obj,'values',{
    value:defaultSettings,
    writable: true
})
export function updateLocalStorageValues(settingsValues){
       
        obj.values={...obj.values,...settingsValues}
        console.log(obj.values)
        localStorage.setItem("settings",JSON.stringify(
            obj.values
           
         )) 
    

}
export function loadLocalStorageValues(){
    const values=localStorage.getItem("settings");
    const settings=JSON.parse(values);
    return settings || defaultSettings;
}


