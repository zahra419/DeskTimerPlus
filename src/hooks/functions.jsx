import { loadLocalStorageValues } from "./localStorage"
import beep from '../assets/beep.wav';
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
 export function playBeepSound(){
   const volume=toNumber(loadLocalStorageValues().volume)/100;
   let audio=new Audio(beep)
   audio.volume=volume;
   audio.play()
 }
 // Original article: http://24ways.org/2010/calculating-color-contrast
 export function getContrastYIQ(hexcolor){
  var r = parseInt(hexcolor.substring(1,3),16);
  var g = parseInt(hexcolor.substring(3,5),16);
  var b = parseInt(hexcolor.substring(5,7),16);
  var yiq = ((r*299)+(g*587)+(b*114))/1000;
  return (yiq >= 128) ? '#121212' : 'white';
}

 export const fonts= ['Orbitron-VariableFont_wght', 'LiquidCrystal-Bold','Black Ops One']
 export const colors=['#000000','#F0F4F9','#A6A6A6','#C4E7E1','#F8BBB8','#004D59','#137BB2','#546E7A']