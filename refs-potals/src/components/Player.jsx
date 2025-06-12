import { useState, useRef } from "react";

export default function Player() {

  const input = useRef();

  const [playerName, setPlayerName] = useState('')

  // function handlePlayerNameChange(event) {
  //   setSubmitted(false)
  //   setPlayerName(event.target.value)
  // }

  function handleClick() {
    setPlayerName(input.current.value);
    //When we click the button, the input field is cleared
    input.current.value = ''
  }

  return (
    <section id="player">
      <h2>Welcome 
         {playerName ?  playerName : ' unknown entity'}</h2>
      <p>
        <input 
        ref={input}
        type="text" 
         />

        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
