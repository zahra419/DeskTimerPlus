import { describe,expect,it} from "vitest";
import {screen,render,fireEvent, within} from '@testing-library/react'
import Buttons from "../../src/components/buttons";
import Input from "../../src/components/input";
import Icon from "../../src/components/icon";
import TimerValue from "../../src/components/timerValue";
import'@testing-library/jest-dom'
import VolumeHandler from "../../src/components/volumeHandler";
import NotificationHandler from "../../src/components/notificationHandler";
import FontOption from "../../src/components/fontOption";
import FontList from "../../src/components/fontList";
import BackgroundColorOption from "../../src/components/backgroundColorOption";
import BackgroundColorsList from "../../src/components/backgroundColorsList";

describe('timer value',()=>{
   const testTimerValue=()=>{
       render(
         <TimerValue hrs={0} mins={0} secs={0} />
       )
   }
   test('should display 00:00:00',()=>{
     testTimerValue();
     expect(screen.getByRole(/timer_value/i)).toBeInTheDocument();
     expect(screen.getByRole(/timer_value/i).textContent).toBe("00:00:00");
   })
})

describe('input',()=>{
    const testInput=()=>{
        render(
          <Input name={"hours"} max={10}  />
        )
    }
    test('input should be working',()=>{
      testInput();
      const label= document.querySelector('label')
      const input=document.querySelector('input')
      expect(input).toBeInTheDocument()
      expect(input).toHaveDisplayValue("")
      fireEvent.change(input,{target:{value:5}})
      expect(input.value).toBe("5")
      expect(label.textContent).toBe("hours")
    })
 })

describe('icon',()=>{
  const testIcon=()=>{
    render(
    <Icon icon="" />
    )
  }
  test('should icon be displayed',()=>{
    testIcon()
    const icon_img=document.querySelector('img') 
    expect(icon_img).toBeInTheDocument()
  })
})

describe('buttons',()=>{
  test('play and reset button should be displayed',()=>{
    render(
      <Buttons start={()=>{}} pause={()=>{}} reset={()=>{}} on={false} />
    )
    expect(screen.getByTitle(/play_button/i)).toBeInTheDocument()
    expect(screen.queryByTitle(/pause_button/i)).not.toBeInTheDocument()
    expect(screen.getByTitle(/reset_button/i)).toBeInTheDocument()
  })
  test('pause button should be displayed',()=>{
    render(
      <Buttons start={()=>{}} pause={()=>{}} reset={()=>{}} on={true} />
    )
    expect(screen.queryByTitle(/play_button/i)).not.toBeInTheDocument()
    expect(screen.getByTitle(/pause_button/i)).toBeInTheDocument()
  })
})
describe('background wallpaper',()=>{
 
   test('background wallpaper container should be displayed',()=>{
    render(
         <BackgroundColorOption color={'blue'}/>
      );
    const wallpaper=document.querySelector('.wallpaper')
    expect(wallpaper).toBeInTheDocument()
    expect(wallpaper.style.backgroundColor).toBe('blue')
  })
})
describe('font option ',()=>{
  beforeAll('',()=>{
    render(<FontOption font={font}/>)
  })
  test('font container should be displayed',()=>{
    
    const fontContainer=document.querySelector('.font_option')
    expect(fontContainer).toBeInTheDocument()
    expect(fontContainer.style.fontFamily).toBe('serif')
  })
})
describe('volume handler',()=>{
  beforeAll('',()=>{
    render(<VolumeHandler/>)
  })
  test('volume handler should be displayed',()=>{
     const container=document.querySelector('.settings_subcontainer')
     expect(container).toBeInTheDocument()
  })
})
describe('notification handler',()=>{
  beforeAll('',()=>{
    render(<NotificationHandler/>)
  })
   test('notification handler componenet should be displayed',()=>{
    const container=document.querySelector('.settings_subcontainer')
    expect(container).toBeInTheDocument()
   })
})
describe('backgroundOptions',()=>{
  test('should list of background color options be displayed',()=>{
    render(<BackgroundColorsList/>)
    const list=screen.getByRole('backgroundColors_list',{hidden:true})
    const {getAllByRole}=within(list)
    const items=getAllByRole("color_option")
    expect(items.length).toBe(8)
  })
 
  
})
describe('font list',()=>{
  test('should list of font options be displayed',()=>{
    render(<FontList/>)
    const list=screen.getByRole('font_list', {hidden:true})
    const {getAllByRole}=within(list)
    const items=getAllByRole("font_option")
    expect(items.length).toBe(3)
  })
 })
//test updating context in font_option and backgroundwallpaper and notification handler