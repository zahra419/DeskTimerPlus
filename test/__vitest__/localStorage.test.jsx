import { loadLocalStorageValues,updateLocalStorageValues } from "../../src/hooks/localStorage"
import { vi } from "vitest"

describe('test local storage',()=>{
    afterAll('',()=>{
        vi.clearAllMocks()
    })
    it('should updateSettings work',()=>{
        const setItem=vi.spyOn(Object.getPrototypeOf(window.localStorage),'setItem')
        updateLocalStorageValues({backgroundColor:'#ffffff'})
        expect(setItem).toBeCalled()
    })
    it('should loadSettings work',()=>{
       const getItem=vi.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem')
       expect(loadLocalStorageValues()).toStrictEqual({backgroundColor:'#ffffff', color:'white',volume:'100',fontFamily:'Black Ops One',notification: true})
       loadLocalStorageValues()
       expect(getItem).toBeCalled()
    })
   
})