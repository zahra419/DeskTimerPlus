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
    await userEvent.click(screen.getByTitle(/play_button/i))
    await new Promise((r)=>setTimeout(r,1000))
    expect(screen.getByRole(/timer_value/i).textContent).toBe("00:00:00")
   })
   test('timer shouldnt work when inputs equals 0',async()=>{
   const inputHrs=document.querySelector(`input[name="hours"]`)
   const inputMins=document.querySelector(`input[name="minutes"]`)
   const inputSecs=document.querySelector(`input[name="seconds"]`)
   const playButton=screen.getByTitle(/play_button/i)
    fireEvent.change(inputHrs,{target:{value:0}})
    fireEvent.change(inputMins,{target:{value:0}})
    fireEvent.change(inputSecs,{target:{value:0}})
    await userEvent.click(playButton)
    await new Promise((r)=> setTimeout(r,1000))
    expect(screen.getByRole(/timer_value/i).textContent).toBe("00:00:00")
   })
   test('should input , button and timer be working',async()=>{
    const inputMinutes=document.querySelector(`input[name="minutes"]`)
    const playButton=screen.getByTitle(/play_button/i)
    const timer_value=screen.getByRole(/timer_value/i)
    const resetButton=screen.getByTitle(/reset_button/i)
    fireEvent.change(inputMinutes,{target:{value:1}})
    await userEvent.click(playButton)
    await new Promise((r)=> setTimeout(r,1000))
    expect(timer_value.textContent).toBe("00:00:59")
    expect(screen.queryByTitle(/play_button/i)).not.toBeInTheDocument()
    await userEvent.click(screen.getByTitle(/pause_button/i))
    expect(screen.queryByTitle(/play_button/i)).toBeInTheDocument()
    await userEvent.click(resetButton)
    expect(timer_value.textContent).toBe("00:00:00")
})
  
   
})  



