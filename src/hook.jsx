import { useEffect, useRef } from 'react';

export function updateTimer(callback, delay) {
  const savedCallback = useRef(); 
  let time=Date.now(),id
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  
  useEffect(() => {
    
    function tick() {
      let drift=Date.now()-time
      id=setTimeout(tick,delay-drift)
      time=Date.now()+delay
      savedCallback.current();
      
    } 
    
   

 
  if(delay!=null){
    time=Date.now()+delay
     id=setTimeout(tick, delay)
    return ()=>clearTimeout(id)
  }
  }, [delay]);

}
export function setToString(num){
   return num.toString().padStart(2,"0")
}

export function convertTimer(num){
  if(num<60){
   return setToString(0)+":"+setToString(num)
  }else{
    return setToString(num/60 >>0)+":"+ setToString(num%60)
  }
}
export function toNumber(num){
  const parsed=parseInt(num,10)
  if(isNaN(parsed)){
    return 0
  }
  return parsed
}