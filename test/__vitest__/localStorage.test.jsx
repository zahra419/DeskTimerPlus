import { loadSettings,updateSettings } from "../../src/hooks/localStorage"
import { vi } from "vitest"

describe('test local storage',()=>{
    it('should updateSettings work',()=>{
        const setItem=vi.spyOn(Object.getPrototypeOf(window.localStorage),'setItem')
        updateSettings({theme:'light'})
        expect(setItem).toBeCalled()
    })
    it('should loadSettings work',()=>{
       const getItem=vi.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem')
       expect(loadSettings()).toStrictEqual({backgroundImageUrl:'',theme:'light',volume:100})
       loadSettings()
       expect(getItem).toBeCalled()
    })
   
})