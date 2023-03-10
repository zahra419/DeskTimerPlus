import { describe,expect,it} from "vitest";
import {screen,render} from '@testing-library/react'
import Stopwatch from "../../src/stopwatch";
import'@testing-library/jest-dom'
import  userEvent  from "@testing-library/user-event";

describe('testing stopwatch elements',()=>{
    beforeEach(()=>{
        render(<Stopwatch/>)
    })
    it('display initial value of timer',()=>{
        const display=screen.getByTestId(/display_stopwatch/i)
        expect(display.textContent).toBe("00:00:00")
    })
    it('play button should be in dom',()=>{
        const playButton=screen.getByTitle(/play_stopwatch/i)
        expect(playButton).toBeInTheDocument()
    })
    it('reset button should be in dom',()=>{
        const restButton=screen.getByTitle(/reset_stopwatch/i)
        expect(restButton).toBeInTheDocument()
    })
    it('pause button should not be in dom',()=>{
        const pauseButton=screen.queryByTitle(/pause_stopwatch/i)
        expect(pauseButton).not.toBeInTheDocument()
    })
    
    it('button should work and timer should be updated',async()=>{
        const display=screen.getByTestId(/display_stopwatch/i)
        const playButton=screen.getByTitle(/play_stopwatch/i)
        const restButton=screen.getByTitle(/reset_stopwatch/i)
        await userEvent.click(playButton)
        await new Promise((r)=> setTimeout(r,1000))
        expect(display.textContent).toBe("00:00:01")
        expect (screen.getByTitle(/pause_stopwatch/i)).toBeInTheDocument()
        expect(screen.queryByTitle(/play_stopwatch/i)).not.toBeInTheDocument()
        await userEvent.click(screen.getByTitle(/pause_stopwatch/i))
        expect(playButton).toBeInTheDocument()
        expect (screen.queryByTitle(/pause_stopwatch/i)).not.toBeInTheDocument()
        await userEvent.click(restButton)
        expect(display.textContent).toBe("00:00:00")
        expect()
    })
 
})
