import Navbar from "../../src/navigation";
import { describe, expect,test}from "vitest"
import { render, screen} from '@testing-library/react'
import'@testing-library/jest-dom'
import  userEvent  from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

describe('testing navigation',()=>{
    test('full app rendering/navigating',async()=>{
        render(<Navbar/>,{wrapper:MemoryRouter})
        expect(screen.getByTestId(/display_timer/i)).toBeInTheDocument()
        expect(screen.queryByTestId(/display_stopwatch/i)).not.toBeInTheDocument()
        expect(screen.queryByTestId(/display_w/i)).not.toBeInTheDocument()
        await userEvent.click(screen.getByText(/stopwatch/i))
        expect(screen.getByTestId(/display_stopwatch/i)).toBeInTheDocument()
        expect(screen.queryByTestId(/display_timer/i)).not.toBeInTheDocument()
        expect(screen.queryByTestId(/display_w/i)).not.toBeInTheDocument()
        await userEvent.click(screen.getByText(/interval timer/i))
        expect(screen.getByTestId(/display_w/i)).toBeInTheDocument()
        expect(screen.queryByTestId(/display_stopwatch/i)).not.toBeInTheDocument()
        expect(screen.queryByTestId(/display_timer/i)).not.toBeInTheDocument()
    })

})