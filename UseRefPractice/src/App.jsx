import { useState } from "react"
import { useRef } from "react"

function App() {
    const[isDarkMode, setIsDarkMode] = useState(false)

    function handleClick() {
      setIsDarkMode((darkMode) => !darkMode)
    }

    let mode = isDarkMode ? 'Light' : 'Dark'

  return (
    <>
      <div className={isDarkMode ? 'app black' : 'app white'}>
        <button onClick={handleClick}>{mode}</button>
      </div>
      
    </>
  )
}

export default App
