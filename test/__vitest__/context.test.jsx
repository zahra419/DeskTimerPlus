import { useContext } from "react";
import { StyleContext,ContextProvider } from "../../src/hooks/context";
import { render } from "@testing-library/react";


const testingComponent=()=>{
    const [defaultSettings,setDefaultSettings]=useContext(StyleContext)
    return (
        <>
        <span data-testid="value" style={{backgroundColor:defaultSettings.backgroundColor,fontFamily:settings.fontFamily,color:settings.color}}>testing value</span>
        <input data-testid="volume" type="range" defaultValue={defaultSettings.volume} />
        <input data-testid="notification" type="checkbox" checked={defaultSettings.notification} />
        </>
    )
}

describe('testing context provider',()=>{
    test('',()=>{
       const defaultSettings={
        backgroundColor: 'black',
        color: 'white',
        fontFamily:'cursive',
        volume: '50',
        notification: true
       }
        const {getByTestId}= render(
            <ContextProvider {...[defaultSettings,setDefaultSettings]}>
                <testingComponent/>
            </ContextProvider>
          )
        expect(getByTestId('volume')).toBeTruthy()
    })
 
})