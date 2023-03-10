import App from "../App";
import {beforeEach, describe, expect,test}from "vitest"
import {fireEvent, render, screen} from '@testing-library/react'
import'@testing-library/jest-dom'
import  userEvent  from "@testing-library/user-event";




describe("test component",()=>{
  
   beforeEach(()=>{
      
      render(<App/>)
   })
   test('pause button shouldnt be in dom',()=>{
     const pauseButton=screen.queryByTitle(/pause_timer/i)
     expect(pauseButton).not.toBeInTheDocument()

   })
   test('reset button should be displayed',()=>{
    const resetButton=screen.getByTitle(/reset_timer/i)
    expect(resetButton).toBeInTheDocument()
   })
   test('play button should be displayed',()=>{
    const playButton=screen.getByTitle(/play_timer/i)
    expect(playButton).toBeInTheDocument()
   })
   test('check values of inputs',async()=>{
     const inputHours=screen.getByLabelText(/hrs/i)
     expect(inputHours).toHaveDisplayValue("")
     fireEvent.change(inputHours,{target:{value:5}})
     expect(inputHours.value).toBe("5")
   })
   test('check minutes input',()=>{
    const inputMinutes=screen.getByLabelText(/mins/i)
    expect(inputMinutes).toHaveDisplayValue("")
    fireEvent.change(inputMinutes,{target:{value:5}})
     expect(inputMinutes.value).toBe("5")
   })
   test('check seconds input',()=>{
    const inputSeconds=screen.getByLabelText(/secs/i)
    expect(inputSeconds).toHaveDisplayValue("")
    fireEvent.change(inputSeconds,{target:{value:5}})
    expect(inputSeconds.value).toBe("5")
    
   })
   test('unvalid input timer shouldnt work',async()=>{
    await userEvent.click(screen.getByTestId(/play_timer/i))
    await new Promise((r)=>setTimeout(r,1000))
    expect(screen.getByTestId(/display_timer/i).textContent).toBe("00:00:00")
   })
   test('timer shouldnt work when inputs equals 0',async()=>{
    fireEvent.change(screen.getByLabelText(/hrs/i),{target:{value:0}})
    fireEvent.change(screen.getByLabelText(/mins/i),{target:{value:0}})
    fireEvent.change(screen.getByLabelText(/secs/i),{target:{value:0}})
    await userEvent.click(screen.getByTitle(/play_timer/i))
    await new Promise((r)=> setTimeout(r,1000))
    expect(screen.getByTestId(/display_timer/i).textContent).toBe("00:00:00")
   })
   test('should input , button and timer be working',async()=>{
    const inputMinutes=screen.getByLabelText(/mins/i)
    const playButton=screen.getByTitle(/play_timer/i)
    const display=screen.getByTestId(/display_timer/i)
    const resetButton=screen.getByTitle(/reset_timer/i)
    fireEvent.change(inputMinutes,{target:{value:1}})
    await userEvent.click(playButton)
    await new Promise((r)=> setTimeout(r,1000))
    expect(display.textContent).toBe("00:00:59")
    expect(screen.queryByTitle(/play_timer/i)).not.toBeInTheDocument()
    await userEvent.click(screen.getByTitle(/pause_timer/i))
    expect(screen.queryByTitle(/play_timer/i)).toBeInTheDocument()
    await userEvent.click(resetButton)
    expect(display.textContent).toBe("00:00:00")
})
  
   
})  



