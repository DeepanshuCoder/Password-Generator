import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [length, setlength] = useState(6)
  const [number, setnumber] = useState(false)
  const [character, setcharacter] = useState(false)
  const [password, setpassword] = useState("")

  const passwordGenerator = useCallback(() => {
    //By using (useCallback) Hook for store the state/function into the memory/cache for optimizing 
    let pass = ""
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (number) {
      str += "0123456789"
    }
    if (character) {
      str += "!@#$%^&*()_+={}[]:\'?~`"
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setpassword(pass)
  }, [length, number, character, setpassword])// yha pr hm (setpassword) isiliye dere h bcoz agr hm password denge so 
  // ye loop me chla jaega or bar bar re-run krta rhega infinity times

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 100); //It is an method for select the range like pass ke range
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => { passwordGenerator() }, [length, number, character, passwordGenerator])
  // By using the (useEffect) Hooks for re-run the state 

  const passwordRef = useRef(null) //Default value kch bhe de skte h
  // after we can pass the Ref() in particular function
  // (useRef) hook is used for (Refrence) and for creating the inter realation between two state and function
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8
       bg-gray-700 text-orange-500'>
        <h1 className='text-center text-3xl text-white my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden my-4 bg-white'>
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password Generator'
            readOnly //only for read purpose not for write purpose
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='bg-blue-700 text-white
          py-1 px-3 shrink-0 hover:bg-green-500'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={100}
              value={length}
              id='lengthInput'
              className='cursor-pointer'
              onChange={(e) => { setlength(e.target.value) }} />
            <label htmlFor="lengthInput">Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={number}
              id='numberInput'
              onChange={() => {
                setnumber((previous) => !previous);
              }} />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={character}
              id='characterInput'
              onChange={() => {
                setcharacter((previous) => !previous);
              }} />
            <label htmlFor="characterInput">Character</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
