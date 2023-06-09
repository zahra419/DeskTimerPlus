import { forwardRef } from "react";

const  Input=forwardRef(function Input(props,ref){
    const {name,max}=props;
    return ( 
        <label className="number_input_label" htmlFor={name}>{name}
     <input className="number_input" type="number"  min="0" max={max}   name={name}  placeholder="0"  ref={ref} />
     </label>
     );

})


export default Input;