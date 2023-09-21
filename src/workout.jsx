import { useRef,useState} from "react";
import {updateTimer} from './hooks/costumHook';
import {toNumber,playBeepSound,setToString,convertTimer} from './hooks/functions';
import Input from "./components/input";
import Buttons from "./components/buttons"
import ProgressBar from "./components/progressBar";
function WorkoutTimer() {
    const [work, setWork] = useState(0);
    const [rest, setRest] = useState(0);
    const [set, setSets] = useState({currentSet:0,totalSets:0});
    const [on,setOnTo]=useState(false);
    const [time,setTime]=useState({counter:0,total:0})
    const workRef=useRef(0)
    const restRef=useRef(0)
    const setRef=useRef(0)
    const [status,setStatus]=useState("start")
    updateTimer(()=>{
        if(work==0 & set.totalSets==0){                       
          return
        }
        
          
          setTime((time)=>({counter:time.counter-1,total:time.total+1}))
          if(time.counter==1 & status=="work"){
            if(set.totalSets==set.currentSet){
              setTime((time)=>({...time,counter:0}))
                sendingNotification({ title:'Timer', body:'Time is up!'});
                setStatus("done")
                setOnTo(false)
                return     
              }
              setSets((set)=>({...set,currentSet:set.currentSet+1}))
              playBeepSound()
              if(rest==0){
                setTime((time)=>({...time,counter:work}))
              }else{
                setTime((time)=>({...time,counter:rest}))
                setStatus("rest")
              }
              
          }
        
         
          if(time.counter==1 & status=="rest"){
            setTime((time)=>({...time,counter:work}))
              playBeepSound()
              setStatus("work")
          }
         
        },on?1000:null)
    

        function start(){
          if(workRef.current.value<=1 | setRef.current.value<=0){
            return
          }
          if(status!="done" & time.total>0){
            setOnTo(true)
          }else{
            setWork(toNumber(workRef.current.value))
            setRest(toNumber(restRef.current.value))
            setSets({currentSet:1,totalSets:toNumber(setRef.current.value)})
            setTime({counter:toNumber(workRef.current.value),total:0})
            setStatus("work")
            setOnTo(true)
          }
       }
    function reset(){
      setOnTo(false)
      workRef.current.value=0 
      restRef.current.value=0
      setRef.current.value=0
      setTime({counter:0,total:0})
      setSets({currentSet:0,totalSets:0})
      setStatus("start")
    }
    function pause(){
      setOnTo(false)
    }
   
    return ( <div className="box interval">
       <div className="input_box">
        <Input name="work" max="" ref={workRef}/>
        <Input name="rest" max="" ref={restRef}/>
        <Input name="sets" max="" ref={setRef} />
   
    </div>
    
    <div className="interval_timer">
              <div className="current_time">
              <span   data-testid="count">{setToString(time.counter)}</span>
              <span  id="state" data-testid="state">{status}</span>
              </div>
              <span className="total_timer" role="total_value">{convertTimer(time.total)}</span>
              <span className="current_set">{`${set.currentSet}/${set.totalSets}`}</span>
              <ProgressBar max={status=='work'? work:status=='rest'? rest:0} value={time.counter}/>
              
           </div>
          
           <Buttons start={start} reset={reset} pause={pause} on={on}/>

    </div> );
}

export default WorkoutTimer;
