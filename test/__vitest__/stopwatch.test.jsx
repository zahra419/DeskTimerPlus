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
        const timer_value=screen.getByRole(/timer_value/i)
        const playButton=screen.getByTitle(/play_button/i)
        const restButton=screen.getByTitle(/reset_button/i)
       
        await userEvent.click(playButton)
        await new Promise((r)=> setTimeout(r,1000))
        expect(timer_value.textContent).toBe("00:00:01")
        expect (screen.queryByTitle(/pause_button/i)).toBeInTheDocument()
        expect(screen.queryByTitle(/play_button/i)).not.toBeInTheDocument()
        await userEvent.click(screen.queryByTitle(/pause_button/i))
        expect(screen.queryByTitle(/play_button/i)).toBeInTheDocument()
        expect (screen.queryByTitle(/pause_button/i)).not.toBeInTheDocument()
        await userEvent.click(restButton)
        expect(timer_value.textContent).toBe("00:00:00")
        
    })
 
})
