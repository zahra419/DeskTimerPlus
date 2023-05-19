import { loadSettings } from "./localStorage"

export function setToString(num){
    return num.toString().padStart(2,"0")
 }
 
 export function convertTimer(num,BASE=60){
   if(num<BASE){
    return setToString(0)+":"+setToString(num)
   }else{
     return setToString(num/BASE >>0)+":"+ setToString(num%BASE)
   }
 }
 export function toNumber(num){
   const parsed=parseInt(num,10)
   if(isNaN(parsed)){
     return 0
   }
   return parsed
 }
 export function playAudio(sound){
   const volume=loadSettings().volume/100;
   console.log(volume)
   let audio=new Audio(sound)
   audio.volume=volume;
   audio.play()
 }
