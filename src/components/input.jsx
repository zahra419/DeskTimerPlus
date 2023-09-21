import { forwardRef } from "react";
import { toNumber } from "../hooks/functions";

function Input(props,ref){
   const {name,max}=props;

   function checkValue(e){
      const newValue=toNumber(e.target.value)
      if(newValue <0){
         ref.current.value='';
         ref.current.value=0;
      }
      if(max!='' & newValue>toNumber(max) ){
         ref.current.value='';
         ref.current.value=max;
      }
    }
  
return(
     <label className="number_input_label" htmlFor={name}>{name}
     <input  className="number_input" type="number"  ref={ref}  min="0" max={max} onKeyUp={checkValue}  name={name}  placeholder="0"     />
     </label>
)
}

export default forwardRef(Input);