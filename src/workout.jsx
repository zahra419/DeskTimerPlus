import { useRef,useState} from "react";
import {updateTimer,setToString, convertTimer,toNumber} from './hook';
import beep from './assets/beep.mp3'

function WorkoutTimer() {
    const [workout, setWorkout] = useState(0);
    const [rest, setRest] = useState(0);
    const [set, setSets] = useState(0);
    const [on,setOnTo]=useState(false);
    const [time,setTime]=useState({counter:0,total:0})
    const workoutRef=useRef(0)
    const restRef=useRef(0)
    const setRef=useRef(0)
    const [status,setStatus]=useState("Start")

    updateTimer(()=>{
        if(workout==0 & set==0){
          return
        }
       
        if(set==0){
          setStatus("Done")
          setOnTo(false)
          return
        }
          setTime((time)=>({counter:time.counter-1,total:time.total+1}))
          if(time.counter==1 & status=="Workout"){
            setSets(set-1)
              setTime((time)=>({...time,counter:workout}))
              new Audio(beep).play()
              if(rest>1){
              setTime((time)=>({...time,counter:rest}))
              setStatus("Rest")
              }
          }
         
          if(time.counter==1 & status=="Rest"){
            setTime((time)=>({...time,counter:workout}))
            new Audio(beep).play()
              setStatus("Workout")
          }
         
        },on?1000:null)
    

        function start(){
          if(workoutRef.current.value<=1 | setRef.current.value<=0){
            return
          }
          if(status!="Done" & time.total>0){
            setOnTo(true)
          }else{
            setWorkout(toNumber(workoutRef.current.value))
            setRest(toNumber(restRef.current.value))
            setSets(toNumber(setRef.current.value))
            setTime({counter:toNumber(workoutRef.current.value),total:0})
            setStatus("Workout")
            setOnTo(true)
          }
       }
    function reset(){
      setOnTo(false)
      workoutRef.current.value=0
      restRef.current.value=0
      setRef.current.value=0
      setTime({counter:0,total:0})
      setStatus("Start")
    }
    
   
    return ( <div className="box interval">
       <div className="input_box">
    <label htmlFor="workout">Workout
    <input type="number" aria-label="workout" min="0" placeholder="0s" ref={workoutRef} name="workout"></input>
    </label>
    <label htmlFor="rest">rest 
    <input type="number" aria-label="rest" min="0"  placeholder="0s" ref={restRef} name="rest"></input>
    </label>
    <label htmlFor="sets">sets
    <input type="number" aria-label="sets" min="0" placeholder="0" ref={setRef} name="sets"></input>
    </label>
    </div>
    
    <div className="interval_timer">
              <span   data-testid="count">{setToString(time.counter)}</span>
              <span  id="state" data-testid="state">{status}</span>
              <span data-testid="display_w">{convertTimer(time.total)}</span>
           </div>
          
    <div className="btn_box">
           {!on ?<img title="play_w"  onClick={start} src="playButton.png"/>
     :<img title="pause_w"onClick={()=>{setOnTo(false)}} src="pauseButton.png"/>}
     <img onClick={reset} title='reset_w'  src="replayButton.png"/>
     </div>
    </div> );
}

export default WorkoutTimer;
