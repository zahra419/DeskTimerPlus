import { useRef, useState } from "react";
import {updateTimer} from './hooks/costumHook';
import {toNumber,playAudio} from './hooks/functions';
import beep from './assets/beep.mp3'
import "./style.css";
import TimerValue from "./components/timerValue";
import Input from "./components/input";
import Buttons from "./components/buttons"

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
  playAudio(beep)
}
  },on?1000:null)


  function reset(){
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
  function pause(){
    setOnTo(false)
  }
  return (
    <div className="box timer">
     
      <div className="input_box">
      <Input aria-label="hrs" max="99" name="hours"  ref={hrRef}/>
      <Input max="59" name="minutes" ref={minRef} />
      <Input max="59" name="seconds" ref={secRef} />
    
     </div>
     <TimerValue hrs={timer.hrs} mins={timer.mins} secs={timer.secs} />
     
     <Buttons start={start} reset={reset} pause={pause} on={on}/>

   
    </div>
  );
}


