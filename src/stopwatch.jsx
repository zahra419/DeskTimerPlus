import { useState } from "react";
import { updateTimer } from "./hooks/costumHook";
import TimerValue from "./components/timerValue";
import Buttons from './components/buttons'
function Stopwatch() {
  const [timer,setTimer]=useState({hrs:0,mins:0,secs:0})

  const [on, setOnTo] = useState(false)
  updateTimer(() => {
      
      setTimer((timer)=>({...timer,secs:timer.secs+1}))
      if (timer.secs == 59) {
    
        setTimer((timer)=>({...timer,mins:timer.mins+1,secs:0}))
      }
      if (timer.mins == 59) {
      
        setTimer((timer)=>({...timer,hrs:timer.hrs+1,mins:0}))
      }
    
  }, on ? 1000 : null)
  
  function reset() {
    setOnTo(false)
    setTimer({hrs:0,mins:0,secs:0})
  }
  function start(){
    setOnTo(true);
  }
  function pause(){
    setOnTo(false)
  }
  return (
    <div className="box stopwatch">
      <TimerValue hrs={timer.hrs} mins={timer.mins} secs={timer.secs} />
      <Buttons start={start} reset={reset} pause={pause} on={on}/>
    </div>
  );
}

export default Stopwatch;