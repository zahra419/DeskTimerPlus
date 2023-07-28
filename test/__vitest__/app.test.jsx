import App from "../../src/App";
import {beforeEach, describe, expect,test}from "vitest"
import {fireEvent, render, screen} from '@testing-library/react'
import'@testing-library/jest-dom'
import  userEvent  from "@testing-library/user-event";




describe("test component",()=>{
  
   beforeEach(()=>{
      
      render(<App/>)
     
      
   })
  
   
   test('unvalid input timer shouldnt work',async()=>{
    await userEvent.click(screen.getByAltText(/play_button/i))
    await new Promise((r)=>setTimeout(r,1000))
    expect(screen.getByTestId(/timer_value/i).textContent).toBe("00:00:00")
   })
   test('timer shouldnt work when inputs equals 0',async()=>{
   const inputHrs=document.querySelector(`input[name="hours"]`)
   const inputMins=document.querySelector(`input[name="minutes"]`)
   const inputSecs=document.querySelector(`input[name="seconds"]`)
   const playButton=screen.getByAltText(/play_button/i)
    fireEvent.change(inputHrs,{target:{value:0}})
    fireEvent.change(inputMins,{target:{value:0}})
    fireEvent.change(inputSecs,{target:{value:0}})
    await userEvent.click(playButton)
    await new Promise((r)=> setTimeout(r,1000))
    expect(screen.getByTestId(/timer_value/i).textContent).toBe("00:00:00")
   })
   test('should input , button and timer be working',async()=>{
    const inputMinutes=document.querySelector(`input[name="minutes"]`)
    const playButton=screen.getByAltText(/play_button/i)
    const timer_value=screen.getByTestId(/timer_value/i)
    const resetButton=screen.getByAltText(/reset_button/i)
    fireEvent.change(inputMinutes,{target:{value:1}})
    await userEvent.click(playButton)
    await new Promise((r)=> setTimeout(r,1000))
    expect(timer_value.textContent).toBe("00:00:59")
    expect(screen.queryByAltText(/play_button/i)).not.toBeInTheDocument()
    await userEvent.click(screen.getByAltText(/pause_button/i))
    expect(screen.queryByAltText(/play_button/i)).toBeInTheDocument()
    await userEvent.click(resetButton)
    expect(timer_value.textContent).toBe("00:00:00")
})
  
//check notification and sound
   
})  



