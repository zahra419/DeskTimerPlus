import { forwardRef } from "react";

const  Input=forwardRef(function Input(props,ref){
    const {name,max}=props;
    return ( 
        <label htmlFor={name}>{name}
     <input type="number"  min="0" max={max}   name={name}  placeholder="0"  ref={ref} />
     </label>
     );

})


export default Input;