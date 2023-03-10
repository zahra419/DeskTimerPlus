import {setToString,updateTimer,convertTimer,toNumber} from "../../src/hook";
import {expect,describe,it}from "vitest"
import { renderHook} from "@testing-library/react";
import { vi } from "vitest";

describe("setToString",()=>{
    
    it("it returns string ",()=>{
        expect(setToString(9)).toBeTypeOf("string")
    })
    it("it should add 0 to number below 10",()=>{
        expect(setToString(10)).toBe("10")
    })
    it("it should return 00 when value equal to 0",()=>{
        expect(setToString(0)).toBe("00")
    })
})

describe("test costum hook",()=>{
    let callback=vi.fn()
    beforeEach(()=>{
        vi.useFakeTimers()
        vi.spyOn(global,'setTimeout')
    })
    afterEach(()=>{
        vi.clearAllTimers()
    })
    afterAll(()=>{
        vi.useRealTimers()
    })

    it('setInterval should function with function',()=>{
        const result=renderHook(()=>{updateTimer(callback,1000)})
        expect(callback).not.toHaveBeenCalled()
        expect(result.current).toBeUndefined()
        //test setTimeout used in hook 
        expect(setTimeout).toBeCalledTimes(1)
        expect(setTimeout).toBeCalledWith(expect.any(Function),1000)
    })
    
    it('callback function should be rendered ',()=>{
        const result=renderHook(()=>{updateTimer(callback,1000)})
        expect(callback).not.toHaveBeenCalled()
        //function shouldnt be called before 1000 seconds of delay
        vi.advanceTimersByTime(999)
        expect(callback).not.toHaveBeenCalled()
        
        vi.advanceTimersToNextTimer(1)
        expect(callback).toBeCalledTimes(1)

        vi.runOnlyPendingTimers()
       
       //number of calls after forwarding 2 times of current timer
        vi.advanceTimersToNextTimer(2)
        expect(callback).toBeCalledTimes(3)
    })
    
})
describe('test timer converter',()=>{
    it('should return converted value',()=>{
       expect(convertTimer(0)).toBe('00:00')
       expect(convertTimer(30)).toBe('00:30')
       expect(convertTimer(90)).toBe('01:30')
    })
})
describe('should return number',()=>{
    it('should return number',()=>{
        expect(toNumber('5')).toBe(5)
        expect(toNumber('')).toBe(0)
    })
})