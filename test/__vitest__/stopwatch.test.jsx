import { describe,expect,it} from "vitest";
import {screen,render} from '@testing-library/react'
import Stopwatch from "../../src/stopwatch";
import'@testing-library/jest-dom'
import  userEvent  from "@testing-library/user-event";

describe('testing stopwatch elements',()=>{
    beforeEach(()=>{
        render(<Stopwatch/>)
    })
   
    
    
    it('button should work and timer should be updated',async()=>{
        const timer_value=screen.getByTestId(/timer_value/i)
        const playButton=screen.getByAltText(/play_button/i)
        const restButton=screen.getByAltText(/reset_button/i)
       
        await userEvent.click(playButton)
        await new Promise((r)=> setTimeout(r,1000))
        expect(timer_value.textContent).toBe("00:00:01")
        expect (screen.queryByAltText(/pause_button/i)).toBeInTheDocument()
        expect(screen.queryByAltText(/play_button/i)).not.toBeInTheDocument()
        await userEvent.click(screen.queryByAltText(/pause_button/i))
        expect(screen.queryByAltText(/play_button/i)).toBeInTheDocument()
        expect (screen.queryByAltText(/pause_button/i)).not.toBeInTheDocument()
        await userEvent.click(restButton)
        expect(timer_value.textContent).toBe("00:00:00")
        
    })
 
})
