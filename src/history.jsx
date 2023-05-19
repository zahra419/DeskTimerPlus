import { useState } from "react";

function History() {
  const [visible, setVisibility]=useState(false);
    const toggleTable=()=>{
        setVisibility(!visible);
    }
    return ( 
      <>
      <div className="history_toggle"><img id='chevron' onClick={toggleTable} src={`${visible ? 'chevron_down.svg':'chevron_up.svg'}`}/></div>
      { visible && 
    <table  className="timer_history">
      <tr><td>hrrgfdl</td></tr>
      <tr><td>ldjfls</td></tr>

    </table>
      }
     </>);
}

export default History;