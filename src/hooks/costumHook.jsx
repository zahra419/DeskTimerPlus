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

