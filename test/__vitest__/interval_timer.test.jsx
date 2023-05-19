import { describe,expect,test } from "vitest";
import {screen,render,fireEvent} from '@testing-library/react'
import WorkoutTimer from "../../src/workout";
import '@testing-library/jest-dom'
import userEvent  from "@testing-library/user-event";

describe('testing interval timer',()=>{
    beforeEach(()=>{
        render(<WorkoutTimer/>)
    })
   
    
      test('workout update shouldnt be in dom',()=>{
        const state=screen.queryByTestId(/state/i)
        expect(state).toBeInTheDocument
        expect(state.textContent).toBe("Start")
      })

    
      it('should counter to be 00',()=>{
        const counter=screen.getByTestId(/count/i)
        expect(counter.textContent).toBe('00')
    })
      test('value shouldnt be updated',async()=>{
        const playButton=screen.getByTitle(/play_button/i)
        await userEvent.click(playButton)
        await new Promise((r)=> setTimeout(r,2000))
        expect(screen.queryByRole(/timer_value/i).textContent).toBe("00:00")
        expect(screen.queryByTestId(/state/i).textContent).toBe("Start")
        expect(screen.queryByTestId(/count/i).textContent).toBe("00")
      })
      test('timer shouldnt work when inputs equal 0',async()=>{
        const playButton=screen.getByTitle(/play_button/i)
        const inputSets=document.querySelector(`input[name="sets"]`)
        const inputRest=document.querySelector(`input[name="rest"]`)
        const inputWorkout=document.querySelector(`input[name="workout"]`)
        fireEvent.change(inputSets,{target:{value:0}})
        fireEvent.change(inputRest,{target:{value:0}})
        fireEvent.change(inputWorkout,{target:{value:0}})
        await userEvent.click(playButton)
        await new Promise((r)=> setTimeout(r,1000))
        expect(screen.queryByRole(/timer_value/i).textContent).toBe("00:00")
        expect(screen.queryByTestId(/state/i).textContent).toBe("Start")
        expect(screen.queryByTestId(/count/i).textContent).toBe("00")
      })
      test('interval timer should work',async()=>{
        const playButton=screen.queryByTitle(/play_button/i)
        const pauseButton=screen.queryByTitle(/pause_button/i)
        const resetButton=screen.getByTitle(/reset_button/i)
        const inputSets=document.querySelector(`input[name="sets"]`)
        const inputRest=document.querySelector(`input[name="rest"]`)
        const inputWorkout=document.querySelector(`input[name="workout"]`)
        fireEvent.change(inputSets,{target:{value:1}})
        fireEvent.change(inputRest,{target:{value:2}})
        fireEvent.change(inputWorkout,{target:{value:3}})
        await userEvent.click(playButton)
        await new Promise((r)=> setTimeout(r,1000))
        expect(screen.queryByTitle(/play_button/i)).not.toBeInTheDocument()
        expect(screen.queryByTitle(/pause_button/i)).toBeInTheDocument()
        expect(screen.queryByRole(/timer_value/i).textContent).toBe("00:01")
        expect(screen.queryByTestId(/state/i).textContent).toBe('Workout')
        expect(screen.queryByTestId(/count/i).textContent).toBe("02")
        await userEvent.click(pauseButton)
        expect(screen.queryByTitle(/play_button/i)).not.toBeInTheDocument()
        expect(screen.queryByTitle(/pause_button/i)).toBeInTheDocument()
        await userEvent.click(resetButton)
        expect(screen.queryByRole(/timer_value/i).textContent).toBe("00:00")
        expect(screen.queryByTestId(/state/i).textContent).toBe("Start")
        expect(screen.queryByTestId(/count/i).textContent).toBe("00")
        
      })
      test('should update to rest timer',async()=>{
        const playButton=screen.getByTitle(/play_button/i)
        const inputSets=document.querySelector(`input[name="sets"]`)
        const inputRest=document.querySelector(`input[name="rest"]`)
        const inputWorkout=document.querySelector(`input[name="workout"]`)
        fireEvent.change(inputSets,{target:{value:2}})
        fireEvent.change(inputRest,{target:{value:3}})
        fireEvent.change(inputWorkout,{target:{value:2}})
        await userEvent.click(playButton)
        await new Promise((r)=> setTimeout(r,3000))
        expect(screen.queryByRole(/timer_value/i).textContent).toBe("00:03")
        expect(screen.queryByTestId(/state/i).textContent).toBe("Rest")
        expect(screen.queryByTestId(/count/i).textContent).toBe("02")
      })
})