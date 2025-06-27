
import React from 'react'
import { useState } from 'react'

export default function IntroScreen() {

    //this state handles if the input field of the player name is to be shown.
    const [enterPlayerName, setEnterPlayerName] = useState(false)

    function handleButtonClick() {
        setEnterPlayerName((prevPlayerName) => !prevPlayerName);
    }


  return (
    <div>
        <h2>The Superheroes quiz</h2>
        {enterPlayerName ? <input type="text" placeholder='Enter your name' /> :
         
         <div>
            <p>
                Welcome to the Quiz
            </p>

            <p>
                Test your hero knowledge with 10 questions
            </p>

            <ul>
                <li>Choose the best answer</li>
                <li>If unsure you can skip questions</li>
                <li>Review your results at the end</li>
            </ul>

            <button onClick={handleButtonClick}>Start Quiz</button>
        </div>
         
         }
            
    </div>
  )
}
