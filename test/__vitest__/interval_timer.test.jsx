import { describe,expect,test } from "vitest";
import {screen,render,fireEvent,waitFor,vi} from '@testing-library/react'
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
        expect(state.textContent).toBe("start")
      })

    
      test('should counter to be 00 and total counter 00:00',()=>{
        const timer_value=screen.getByRole(/total_value/i)
        expect(timer_value.textContent).toBe('00:00')
        const counter=screen.getByTestId(/count/i)
        expect(counter.textContent).toBe('00')
    })
     test('progressbar should have 0 in height',()=>{
        const progressbar=document.querySelector('.progressBar')
        expect(progressbar).toBeInTheDocument()
        expect(progressbar.style.height).toBe('0%')
     })
     test('sets count should be 0/0',()=>{
      const current_set=document.querySelector('.current_set')
      expect(current_set).toBeInTheDocument()
      expect(current_set.textContent).toBe('0/0')
     })

      test('value shouldnt be updated',async()=>{
        const playButton=screen.getByAltText(/play_button/i)
        await userEvent.click(playButton)
        await new Promise((r)=> setTimeout(r,2000))
        expect(screen.queryByRole(/total_value/i).textContent).toBe("00:00")
        expect(screen.queryByTestId(/state/i).textContent).toBe("start")
        expect(screen.queryByTestId(/count/i).textContent).toBe("00")
        expect(document.querySelector('.current_set').textContent).toBe('0/0')
        expect(document.querySelector('.progressBar').style.height).toBe('0%')
      })
      test('timer shouldnt work when inputs equal 0',async()=>{
        const playButton=screen.getByAltText(/play_button/i)
        const inputSets=document.querySelector(`input[name="sets"]`)
        const inputRest=document.querySelector(`input[name="rest"]`)
        const inputWorkout=document.querySelector(`input[name="work"]`)
        fireEvent.change(inputSets,{target:{value:0}})
        fireEvent.change(inputRest,{target:{value:0}})
        fireEvent.change(inputWorkout,{target:{value:0}})
        await userEvent.click(playButton)
        await new Promise((r)=> setTimeout(r,1000))
        expect(screen.queryByRole(/total_value/i).textContent).toBe("00:00")
        expect(screen.queryByTestId(/state/i).textContent).toBe("start")
        expect(screen.queryByTestId(/count/i).textContent).toBe("00")
        expect(document.querySelector('.current_set').textContent).toBe('0/0')
        expect(document.querySelector('.progressBar').style.height).toBe('0%')
      })
      test('interval timer should work',async()=>{
        const playButton=screen.queryByAltText(/play_button/i)
        const pauseButton=screen.queryByAltText(/pause_button/i)
        const resetButton=screen.getByAltText(/reset_button/i)
        const inputSets=document.querySelector(`input[name="sets"]`)
        const inputRest=document.querySelector(`input[name="rest"]`)
        const inputWorkout=document.querySelector(`input[name="work"]`)
        fireEvent.change(inputSets,{target:{value:2}})
        fireEvent.change(inputRest,{target:{value:2}})
        fireEvent.change(inputWorkout,{target:{value:4}})
        await userEvent.click(playButton)
        await new Promise((r)=> setTimeout(r,1000))
        expect(screen.queryByAltText(/play_button/i)).not.toBeInTheDocument()
        expect(screen.queryByAltText(/pause_button/i)).toBeInTheDocument()
        expect(screen.queryByRole(/total_value/i).textContent).toBe("00:01")
        expect(screen.queryByTestId(/state/i).textContent).toBe('work')
        expect(screen.queryByTestId(/count/i).textContent).toBe("03")
        expect(document.querySelector('.current_set').textContent).toBe('1/2')
        await waitFor(()=> expect(document.querySelector('.progressBar').style.height).toBe('75%'))
        await userEvent.click(pauseButton)
        expect(screen.queryByAltText(/play_button/i)).not.toBeInTheDocument()
        expect(screen.queryByAltText(/pause_button/i)).toBeInTheDocument()
        await userEvent.click(resetButton)
        expect(screen.queryByRole(/total_value/i).textContent).toBe("00:00")
        expect(screen.queryByTestId(/state/i).textContent).toBe("start")
        expect(screen.queryByTestId(/count/i).textContent).toBe("00")
        expect(document.querySelector('.current_set').textContent).toBe('0/0')
        await waitFor(()=>expect(document.querySelector('.progressBar').style.height).toBe('0%'))
      })
     test('should update to rest timer',async()=>{
        const playButton=screen.getByAltText(/play_button/i)
        const inputSets=document.querySelector(`input[name="sets"]`)
        const inputRest=document.querySelector(`input[name="rest"]`)
        const inputWorkout=document.querySelector(`input[name="work"]`)
        fireEvent.change(inputSets,{target:{value:2}})
        fireEvent.change(inputRest,{target:{value:3}})
        fireEvent.change(inputWorkout,{target:{value:2}})
        await userEvent.click(playButton)
        await new Promise((r)=> setTimeout(r,3000))
        expect(screen.queryByRole(/total_value/i).textContent).toBe("00:02")
        expect(screen.queryByTestId(/state/i).textContent).toBe("rest")
        expect(screen.queryByTestId(/count/i).textContent).toBe("03")
        expect(document.querySelector('.current_set').textContent).toBe('2/2')
        await waitFor(()=> expect(document.querySelector('.progressBar').style.height).toBe('100%'))
      })
})