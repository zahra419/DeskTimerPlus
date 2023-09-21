import { setToString } from "../hooks/functions";

function TimerValue({hrs,mins,secs}) {
    


    return ( 
        <p className="timer_value" data-testid="timer_value">{setToString(hrs)}:{setToString(mins)}:{setToString(secs)}</p>
     );
}

export default TimerValue;