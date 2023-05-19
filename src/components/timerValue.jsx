import { setToString } from "../hooks/functions";

function TimerValue({hrs,mins,secs}) {
    


    return ( 
        <p className="display" role="timer_value">{setToString(hrs)}:{setToString(mins)}:{setToString(secs)}</p>
     );
}

export default TimerValue;