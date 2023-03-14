import { describe,expect,test } from "vitest";
import {screen,render,fireEvent} from '@testing-library/react'
import WorkoutTimer from "../../src/workout";
import '@testing-library/jest-dom'
import userEvent  from "@testing-library/user-event";

describe('testing interval timer',()=>{
    beforeEach(()=>{
        render(<WorkoutTimer/>)
    })
    test('pause button shouldnt be in dom',()=>{
        const pauseButton=screen.queryByTitle(/pause_w/i)
        expect(pauseButton).not.toBeInTheDocument()
   
      })
     test('reset button should be displayed',()=>{
       const resetButton=screen.getByTitle(/reset_w/i)
       expect(resetButton).toBeInTheDocument()
      })
       test('play button should be displayed',()=>{
       const playButton=screen.getByTitle(/play_w/i)
       expect(playButton).toBeInTheDocument()
      })
      test('check input of workout',()=>{  
        const inputWorkout=screen.getByLabelText(/workout/i)
        expect(inputWorkout).toHaveDisplayValue("")
        fireEvent.change(inputWorkout,{target:{value:10}})
        expect(inputWorkout.value).toBe("10")
      })
      test('check input of rest',()=>{
       const inputRest=screen.getByLabelText(/rest/i)
       expect(inputRest).toHaveDisplayValue("")
       fireEvent.change(inputRest,{target:{value:5}})
        expect(inputRest.value).toBe("5")
      })
      test('check input of sets',()=>{
       const inputSets=screen.getByLabelText(/sets/i)
       expect(inputSets).toHaveDisplayValue("")
       fireEvent.change(inputSets,{target:{value:5}})
       expect(inputSets.value).toBe("5")
      })
      test('workout update shouldnt be in dom',()=>{
        const state=screen.queryByTestId(/state/i)
        expect(state).toBeInTheDocument
        expect(state.textContent).toBe("Start")
      })

      test('timer should be displayed 00:00',()=>{
        const display=screen.getByTestId(/display_w/i)
        expect(display.textContent).toBe("00:00")
      })
      it('should counter to be 00',()=>{
        const counter=screen.getByTestId(/count/i)
        expect(counter.textContent).toBe('00')
    })
      test('value shouldnt be updated',async()=>{
        const playButton=screen.getByTitle(/play_w/i)
        await userEvent.click(playButton)
        await new Promise((r)=> setTimeout(r,2000))
        expect(screen.queryByTestId(/display_w/i).textContent).toBe("00:00")
        expect(screen.queryByTestId(/state/i).textContent).toBe("Start")
        expect(screen.queryByTestId(/count/i).textContent).toBe("00")
      })
      test('timer shouldnt work when inputs equal 0',async()=>{
        fireEvent.change(screen.getByLabelText(/sets/i),{target:{value:0}})
        fireEvent.change(screen.getByLabelText(/rest/i),{target:{value:0}})
        fireEvent.change(screen.getByLabelText(/workout/i),{target:{value:0}})
        await userEvent.click(screen.getByTitle(/play_w/i))
        await new Promise((r)=> setTimeout(r,1000))
        expect(screen.queryByTestId(/display_w/i).textContent).toBe("00:00")
        expect(screen.queryByTestId(/state/i).textContent).toBe("Start")
        expect(screen.queryByTestId(/count/i).textContent).toBe("00")
      })
      test('interval timer should work',async()=>{
        const playButton=screen.queryByTitle(/play_w/i)
        const pauseButton=screen.queryByTitle(/pause_w/i)
        const resetButton=screen.getByTitle(/reset_w/i)
        fireEvent.change(screen.getByLabelText(/sets/i),{target:{value:1}})
        fireEvent.change(screen.getByLabelText(/rest/i),{target:{value:2}})
        fireEvent.change(screen.getByLabelText(/workout/i),{target:{value:3}})
        await userEvent.click(playButton)
        await new Promise((r)=> setTimeout(r,1000))
        expect(screen.queryByTitle(/play_w/i)).not.toBeInTheDocument()
        expect(screen.queryByTitle(/pause_w/i)).toBeInTheDocument()
        expect(screen.queryByTestId(/display_w/i).textContent).toBe("00:01")
        expect(screen.queryByTestId(/state/i).textContent).toBe('Workout')
        expect(screen.queryByTestId(/count/i).textContent).toBe("02")
        await userEvent.click(pauseButton)
        expect(screen.queryByTitle(/play_w/i)).not.toBeInTheDocument()
        expect(screen.queryByTitle(/pause_w/i)).toBeInTheDocument()
        await userEvent.click(resetButton)
        expect(screen.queryByTestId(/display_w/i).textContent).toBe("00:00")
        expect(screen.queryByTestId(/state/i).textContent).toBe("Start")
        expect(screen.queryByTestId(/count/i).textContent).toBe("00")
        
      })
      test('should update to rest interval time',async()=>{
        const playButton=screen.queryByTitle(/play_w/i)
        fireEvent.change(screen.getByLabelText(/sets/i),{target:{value:2}})
        fireEvent.change(screen.getByLabelText(/rest/i),{target:{value:3}})
        fireEvent.change(screen.getByLabelText(/workout/i),{target:{value:2}})
        await userEvent.click(playButton)
        await new Promise((r)=> setTimeout(r,3000))
        expect(screen.queryByTestId(/display_w/i).textContent).toBe("00:03")
        expect(screen.queryByTestId(/state/i).textContent).toBe("Rest")
        expect(screen.queryByTestId(/count/i).textContent).toBe("02")
      })
})