import { useState } from "react"
import ColorPicker from "./ColorPicker"


function App() {
  
  const [color, setColor] = useState('white')

    function handleClick(selectedColor){
    setColor(selectedColor);

    }


  return (
    <>
      <ColorPicker color={color} handleClick={handleClick} />
    </>
  )
}

export default App
