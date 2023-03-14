import { useRef, useState } from "react";
import {updateTimer,setToString,toNumber} from './hook';
import beep from './assets/beep.mp3'
import "./style.css";



export default function App() {
  const [timer,setTimer]=useState({hrs:0,mins:0,secs:0})
  const [on,setOnTo]=useState(false);
  const hrRef=useRef(0)
  const minRef=useRef(0)
  const secRef=useRef(0)
 


  updateTimer(()=>{
  if(timer.hrs==0 & timer.mins==0 & timer.secs==0){
    setOnTo(false)
    return
}
  if(timer.secs==0){
    if(timer.hrs!=0 && timer.mins==0){
       setTimer((timer)=>({...timer,hrs:timer.hrs-1,mins:59}))
        
    }
    if(timer.mins!=0){
      setTimer((timer)=>({...timer,mins:timer.mins-1,secs:59}))
       
    }
}
if(timer.secs > 0){
  setTimer((timer)=>({...timer,secs:timer.secs-1}))
}

if(timer.mins==0 & timer.hrs==0 & timer.secs==1){
  new Audio(beep).play()
}
  },on?1000:null)


  function clear(){
    setOnTo(false)
    hrRef.current.value=0
    minRef.current.value=0
    secRef.current.value=0
    setTimer({hrs:0,mins:0,secs:0})
  }
  
  function start(){
    if(timer.hrs!=0 | timer.mins!=0 | timer.secs!=0){
      setOnTo(true)
    }else
    if(hrRef.current.value!=0 | minRef.current.value!=0 | secRef.current.value!=0){
      setTimer({hrs:toNumber(hrRef.current.value),mins:toNumber(minRef.current.value),secs:toNumber(secRef.current.value)})
      setOnTo(true)

    }
    
    
  }
  return (
    <div className="box timer">
     
      <div className="input_box">
      <label htmlFor="hrs">Hours
     <input type="number" aria-label="hrs" min="0" max="99"   name="hrs"  placeholder="0"  ref={hrRef} ></input>
     </label>
     <label  htmlFor="mins">Minutes
     <input type="number" aria-label="mins" min="0" max="59" name="mins" placeholder="0" ref={minRef}></input>
     </label>
     <label  htmlFor="secs">Seconds
     <input type="number"  aria-label="secs" min="0" max="59" name="secs" placeholder="0" ref={secRef}></input>
     </label>
     </div>
     <p className="display" data-testid="display_timer">{setToString(timer.hrs)}:{setToString(timer.mins)}:{setToString(timer.secs)}</p>
     <div className="btn_box">
     {!on ? <img title="play_timer"  onClick={start} src="playButton.png"  /> :
      <img title="pause_timer" onClick={()=>setOnTo(false)} src="pauseButton.png"/>
     }
     <img title="reset_timer" onClick={clear} src="replayButton.png"/> 
    
     </div>
   
    </div>
  );
}


