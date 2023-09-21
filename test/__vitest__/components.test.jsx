import { describe,expect,test,vi} from "vitest";
import {screen,render,fireEvent, within,waitFor} from '@testing-library/react'
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
import ProgressBar from "../../src/components/progressBar";
import { ContextProvider} from "../../src/hooks/context";
import  userEvent  from "@testing-library/user-event";
import { loadLocalStorageValues } from "../../src/hooks/localStorage";

describe('timer value',()=>{
   const testTimerValue=()=>{
       render(
         <TimerValue hrs={0} mins={0} secs={0} />
       )
   }
   test('should display 00:00:00',()=>{
     testTimerValue();
     expect(screen.getByTestId(/timer_value/i)).toBeInTheDocument();
     expect(screen.getByTestId(/timer_value/i).textContent).toBe("00:00:00");
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
    const icon_img=document.querySelector('.icon') 
    expect(icon_img).toBeInTheDocument()
  })
})
describe('buttons',()=>{
  test('play and reset button should be displayed',()=>{
    render(
      <Buttons start={()=>{}} pause={()=>{}} reset={()=>{}} on={false} />
    )
    expect(screen.getByAltText(/play_button/i)).toBeInTheDocument()
    expect(screen.queryByAltText(/pause_button/i)).not.toBeInTheDocument()
    expect(screen.getByAltText(/reset_button/i)).toBeInTheDocument()
  })
  test('pause button should be displayed',()=>{
    render(
      <Buttons start={()=>{}} pause={()=>{}} reset={()=>{}} on={true} />
    )
    expect(screen.queryByAltText(/play_button/i)).not.toBeInTheDocument()
    expect(screen.getByAltText(/pause_button/i)).toBeInTheDocument()
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
 describe('progress bar',()=>{
   test('progress bar should work',()=>{
    render(<ProgressBar max={20} value={5}/>)
    const progressBar=document.querySelector('.progressBar')
    expect(progressBar).toHaveStyle({height:'25%'})
   })
 })

 describe('backgroundOptions list',()=>{
  test('should list of background color options be displayed',()=>{
    render(<BackgroundColorsList/>)
    const list=screen.getByRole('backgroundColors_list',{hidden:true})
    const {getAllByRole}=within(list)
    const items=getAllByRole("color_option")
    expect(items.length).toBe(8)
  })
})

describe('input',()=>{
   const testInput=()=>{
        render(
          <Input name={"hours"} max={"10"}  />
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
  test('input should be updated on keyup',()=>{

  })
 })



describe('volume handler',()=>{
  test('volume handler should be displayed',async()=>{
    const setItems=vi.spyOn(Object.getPrototypeOf(window.localStorage),'setItem')
    vi.spyOn(Object.getPrototypeOf(window.localStorage),'getItem')
     render(
      <ContextProvider><VolumeHandler/></ContextProvider>
     )
     const fontContainer=document.querySelector('.settings_subcontainer')
     expect(fontContainer).toBeInTheDocument()
     await fireEvent.change(document.querySelector('.volume_slider'),{target:{value:80}})
     expect(setItems).toBeCalled()
     expect(loadLocalStorageValues().volume).toStrictEqual('80')
     vi.clearAllMocks()
  })

})

describe('font option',()=>{
  test('font option should be displayed and updated',async()=>{
    const setItems=vi.spyOn(Object.getPrototypeOf(window.localStorage),'setItem')
    vi.spyOn(Object.getPrototypeOf(window.localStorage),'getItem')
     render(
      <ContextProvider><FontOption font={'serif'}/></ContextProvider>
     )
     const fontContainer=document.querySelector('.font_option')
     expect(fontContainer).toBeInTheDocument()
     expect(fontContainer).toHaveStyle({fontFamily:'serif'})
     await userEvent.click(fontContainer)
     expect(setItems).toBeCalled()
     expect(loadLocalStorageValues().fontFamily).toStrictEqual('serif')
     await waitFor(()=> expect(document.querySelector('.app').style.fontFamily).toBe('serif'))
     vi.clearAllMocks()
  })

})

describe('background color option',()=>{
  test('font option should be displayed and updated',async()=>{
    const setItems=vi.spyOn(Object.getPrototypeOf(window.localStorage),'setItem')
    vi.spyOn(Object.getPrototypeOf(window.localStorage),'getItem')
     render(
      <ContextProvider><BackgroundColorOption color={'#3B2763'}/></ContextProvider>
     )
     const colorContainer=document.querySelector('.color_box')
     expect(colorContainer).toBeInTheDocument()
     expect(colorContainer.style.backgroundColor).toBe('rgb(59, 39, 99)')
     await userEvent.click(colorContainer)
     expect(setItems).toBeCalled()
     expect(loadLocalStorageValues().backgroundColor).toStrictEqual('#3B2763')
     expect(loadLocalStorageValues().color).toStrictEqual('white')
     await waitFor(()=>expect(document.querySelector('.app')).toHaveStyle({backgroundColor:'#3B2763',color:'white'}))
     vi.clearAllMocks()
  })

})

describe('notification option',()=>{
  test('font option should be displayed and updated',async()=>{
    const setItems=vi.spyOn(Object.getPrototypeOf(window.localStorage),'setItem')
    vi.spyOn(Object.getPrototypeOf(window.localStorage),'getItem')
     render(
      <ContextProvider><NotificationHandler/></ContextProvider>
     )
     const checkbox=document.querySelector(`input[type='checkbox]` )
     expect(document.querySelector('.settings_subcontainer')).toBeInTheDocument()
     await userEvent.click(checkbox)
     expect(setItems).toBeCalled()
     expect(loadLocalStorageValues().notification).toStrictEqual(true)
     vi.clearAllMocks()
  })
})


//test updating context in font_option and backgroundwallpaper and notification handler