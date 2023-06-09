import { colors} from "../hooks/functions";
import BackgroundColorOption from "./backgroundColorOption";


function BackgroundColorsList() {
  
    return ( 
        <div className=' settings_subcontainer'>
          <span><b>background </b></span>
          <div className="backgroundColors_list" role="backgroundColors_list">
        {colors.map((color,index)=>{
          return <BackgroundColorOption key={index}  color={color} />
        })        
        }
        </div>
        </div>
    );
}

export default BackgroundColorsList;