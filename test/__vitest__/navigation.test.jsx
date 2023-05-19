import Navbar from "../../src/navigation";
import { describe, expect,test}from "vitest"
import { render, screen} from '@testing-library/react'
import'@testing-library/jest-dom'
import  userEvent  from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

describe('testing navigation',()=>{
    test('full app rendering/navigating',async()=>{
        render(<Navbar/>,{wrapper:MemoryRouter})
       
        expect(document.querySelector('.timer')).toBeInTheDocument()
        expect(document.querySelector('.stopwatch')).not.toBeInTheDocument()
        expect(document.querySelector('.interval')).not.toBeInTheDocument()
        await userEvent.click(screen.getByTestId(/stopwatch/i))
        expect(document.querySelector('.stopwatch')).toBeInTheDocument()
        expect(document.querySelector('.timer')).not.toBeInTheDocument()
        expect(document.querySelector('.interval')).not.toBeInTheDocument()
        await userEvent.click(screen.getByTestId(/interval/i))
        expect(document.querySelector('.interval')).toBeInTheDocument()
        expect(document.querySelector('.stopwatch')).not.toBeInTheDocument()
        expect(document.querySelector('.timer')).not.toBeInTheDocument() 
    })

})