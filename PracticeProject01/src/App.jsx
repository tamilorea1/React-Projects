import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
function App() {
  
  const [toggle, setToggle] = useState(false)
  //initially true since initial mode should be light mode

  function handleToggle() {
    setToggle((prevMode) => !prevMode)
  }

  // useEffect(() => {
  //   //The code that we want to run
  //   console.log('The count is:', count)
  // }, [count]) //The dependency needs something to listen to. It could be the state change

  return (
    <>
      {/* {toggle ? <div className="lightMode">dgfdg</div> : 
      <div className="darkMode">dggd</div>}
      <button onClick={handleToggle}>
        <FontAwesomeIcon icon={faMoon} />
      </button>

      <button onClick={handleToggle}>
        <FontAwesomeIcon icon={faSun} />
      </button> */}

        <div className={toggle ? 'darkMode' : 'lightMode'}>
            {toggle ? <button onClick={handleToggle}>
                <FontAwesomeIcon icon={faSun} />
              </button> :
              
              <button onClick={handleToggle}>
                <FontAwesomeIcon icon={faMoon} />
              </button>}
              some text
        </div>
      
    </>
  )
}

export default App
