import FontOption from "./fontOption";
import { fonts } from "../hooks/functions";

function FontsList() {
    return ( 
      <div className="settings_subcontainer">
        <span><b>Fonts</b></span>
        <div className="fonts_list" role="font_list">
        {fonts.map((font,index)=>{
          return <FontOption Key={index} font={font}/>
        })}
       </div>
       </div>
     );
}

export default FontsList;