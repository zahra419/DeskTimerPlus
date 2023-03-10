import { useState } from "react";
import { updateTimer, setToString } from "./hook";

function Stopwatch() {
  const [secs, setSeconds] = useState(0)
  const [mins, setMinutes] = useState(0)
  const [hrs, setHours] = useState(0)
  const [on, setOnTo] = useState(0)
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
  return (
    <div className="box stopwatch">


      <p className="display" data-testid="display_stopwatch">{setToString(hrs)}:{setToString(mins)}:{setToString(secs)}</p>
      <div className="btn_box">
        {!on ? <img title="play_stopwatch" onClick={() => { setOnTo(true) }} src="/src/assets/playButton.svg" />
          : <img title="pause_stopwatch" onClick={() => { setOnTo(false) }} src="/src/assets/pauseButton.svg" />}
        <img title="reset_stopwatch" onClick={reset} src="/src/assets/replayButton.svg" />
      </div>
    </div>
  );
}

export default Stopwatch;