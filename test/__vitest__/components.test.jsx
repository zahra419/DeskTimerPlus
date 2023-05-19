import { describe,expect,it} from "vitest";
import {screen,render,fireEvent} from '@testing-library/react'
import Buttons from "../../src/components/buttons";
import Input from "../../src/components/input";
import Icon from "../../src/components/icon";
import TimerValue 
 from "../../src/components/timerValue";
import'@testing-library/jest-dom'


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
  const testButtons=(on)=>{
    render(
      <Buttons start={()=>{}} pause={()=>{}} reset={()=>{}} on={on} />
    )
  }
  test('play and reset button should be displayed',()=>{
    testButtons(false)
    expect(screen.getByTitle(/play_button/i)).toBeInTheDocument()
    expect(screen.queryByTitle(/pause_button/i)).not.toBeInTheDocument()
    expect(screen.getByTitle(/reset_button/i)).toBeInTheDocument()
  })
  test('pause button should be displayed',()=>{
    testButtons(true)
    expect(screen.queryByTitle(/play_button/i)).not.toBeInTheDocument()
    expect(screen.getByTitle(/pause_button/i)).toBeInTheDocument()
  })
})
