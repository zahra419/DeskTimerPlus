import Navbar from "../../src/navigation";
import { describe, expect,test,vi}from "vitest"
import { render, screen, waitFor} from '@testing-library/react'
import'@testing-library/jest-dom'
import  userEvent  from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";


describe('testing navigation',()=>{
    
 
    test('full app rendering/navigating',async()=>{
        
        render(<Navbar/>,{wrapper:MemoryRouter})
        const timerPage=document.querySelector('.timer')
        const stopwatchPage=document.querySelector('.stopwatch')
        const intervalTimerPage=document.querySelector('.interval')
        const settingsPage=document.querySelector('.settings_container')

        expect(timerPage).toBeInTheDocument()
        expect(stopwatchPage).not.toBeInTheDocument()
        expect(intervalTimerPage).not.toBeInTheDocument()
        expect(settingsPage).not.toBeInTheDocument()

        await userEvent.click(screen.getByTestId(/stopwatch/i))
        expect(document.querySelector('.stopwatch')).toBeInTheDocument()
        expect(timerPage).not.toBeInTheDocument()
        expect(intervalTimerPage).not.toBeInTheDocument()
        expect(settingsPage).not.toBeInTheDocument()
    
        
       await userEvent.click(screen.getByTestId(/interval/i))
        expect(document.querySelector('.interval')).toBeInTheDocument()
        expect(stopwatchPage).not.toBeInTheDocument()
        expect(timerPage).not.toBeInTheDocument() 
        expect(settingsPage).not.toBeInTheDocument()

        await userEvent.click(screen.getByTestId(/settings/i))
        expect(intervalTimerPage).not.toBeInTheDocument()
        expect(stopwatchPage).not.toBeInTheDocument()
        expect(timerPage).not.toBeInTheDocument() 
        expect(document.querySelector('.settings_container')).toBeInTheDocument()
    })

})