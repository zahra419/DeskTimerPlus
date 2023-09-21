import { useEffect, useState } from "react"

function ProgressBar({max,value}){
    const [progress,setProgress]=useState(0)
    useEffect(()=>{
      const progressValue=max==0?0:value/max
      setProgress(progressValue*100)
    },[value])
    return (
        <div className="progressBar_container" >
            <div className="progressBar" style={{height:`${progress}%`}}></div>
        </div>
    )
}
export default ProgressBar