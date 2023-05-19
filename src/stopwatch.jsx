import { useState } from "react";
import { updateTimer } from "./hooks/costumHook";
import TimerValue from "./components/timerValue";
import Buttons from './components/buttons'
function Stopwatch() {
  const [secs, setSeconds] = useState(0)
  const [mins, setMinutes] = useState(0)
  const [hrs, setHours] = useState(0)
  const [on, setOnTo] = useState(false)
  updateTimer(() => {
      setSeconds(secs + 1)
      if (secs == 59) {
        setMinutes(mins + 1)
        setSeconds(0)
      }
      if (mins == 59) {
        setHours(hrs + 1)
        setMinutes(0)
      }
    
  }, on ? 1000 : null)
  
  function reset() {
    setOnTo(false)
    setHours(0)
    setMinutes(0)
    setSeconds(0)
  }
  function start(){
    setOnTo(true);
  }
  function pause(){
    setOnTo(false)
  }
  return (
    <div className="box stopwatch">
      <TimerValue hrs={hrs} mins={mins} secs={secs} />
      <Buttons start={start} reset={reset} pause={pause} on={on}/>
    </div>
  );
}

export default Stopwatch;