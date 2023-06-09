import { useRef,useState} from "react";
import {updateTimer} from './hooks/costumHook';
import {toNumber,playAudio,setToString,convertTimer} from './hooks/functions';
import beep from './assets/beep.mp3'
import Input from "./components/input";
import Buttons from "./components/buttons"
import { notification } from "./components/notification";
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
          //notification({title:'Timer',body:'Time is up ! Well done!'})
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
              //notification({title:'Timer',body:'Time to Rest'})
              setStatus("Rest")
              }
          }
         
          if(time.counter==1 & status=="Rest"){
            setTime((time)=>({...time,counter:workout}))
            //notification({title:'Timer',body:'Time to START'})
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
    function pause(){
      setOnTo(false)
    }
   
    return ( <div className="box interval">
       <div className="input_box">
        <Input name="workout" max="" ref={workoutRef}/>
        <Input name="rest" max="" ref={restRef}/>
        <Input name="sets" max="" ref={setRef} />
   
    </div>
    
    <div className="interval_timer">
              <span   data-testid="count">{setToString(time.counter)}</span>
              <span  id="state" data-testid="state">{status}</span>
              <span role="timer_value">{convertTimer(time.total)}</span>
           </div>
          
           <Buttons start={start} reset={reset} pause={pause} on={on}/>

    </div> );
}

export default WorkoutTimer;
