
import React from 'react'
import { useState } from 'react'
import Quiz from './Quiz'

//Object that stores the current phase we're in
const PHASES = {
    IntroScreen : 'Introscreen',
    EnterName: 'Entername',
    QuizBody: 'Quizbody',
    Results: 'Results'
}
export default function IntroScreen() {

    //this state handles the current phase of our webpage
    //Initially, it is set to the Intro Screen
    const [currentPhase, setCurrentPhase] = useState(PHASES.IntroScreen)

    //This state stores the entered username
    const [userName, setUserName] = useState('')

    //This ststae handles the name error
    const [nameError, setNameError] = useState('')

    //this function ensures that when clicked, the current phase should be the enter name field
    function handleButtonClick() {
        setCurrentPhase(
            PHASES.EnterName
        );
    }

    //this function ensures we get the keys typed by the user
    function handleEnteredName(e) {
        setUserName(e.target.value)
    }

    //if the input field is empty, display the error in the setter
    //Else if the input field has a value and save is pressed, go to the next phase which is the quiz body
    function handleSaveClick() {
        if (userName.trim() === '') {
            setNameError('Invalid name, try again');
            return;
        }
        setNameError('')

        setCurrentPhase(
            PHASES.QuizBody 
        )
    }


    function handlePhaseLogic() {
        return (
            <section>
                {/* Header of our webpage */}
                <h2>The Superheroes quiz 🦸🏾</h2>
                {/* If the enter name screen is true, show the input field and the save button */}
                {/* As well as pass down the necessary props */}

                {/* Else if we're at the intro screen show the tags associated with the Intro screen */}

                {/* Else if we're in the Quiz Body, then pass the name prop to be displayed */}
                {EnterNameScreen ? (
                    <div className='NameEntry'>

                        <div className='InputButtonGroup'>
                            <input 
                            type="text" 
                            placeholder='Enter your name' 
                            onChange={handleEnteredName} 
                            value={userName} 
                        />

                        <button onClick={handleSaveClick}>Save</button>
                        </div>
                            {nameError ? <p className='ErrorMessage'>{nameError}</p> : null}
                    </div>
                    
                ) : IntroScreen ? (
                    <div >
                        <p>
                            Welcome to the Quiz
                        </p>
                        <p>
                            Test your hero knowledge with 10 questions
                        </p>
                        <ul>
                            <li className='Rules'>Choose the best answer</li>
                            <li className='Rules'>If unsure you can skip questions</li>
                            <li className='Rules'>Review your results at the end</li>
                        </ul>
                        <button onClick={handleButtonClick}>Start Quiz</button>
                    </div>
                ) : QuizScreen ? (
                    <>
                        <Quiz userName={userName}/>
                    </>
                ) : null}
            </section>
        );
    }

    //If the current phase is the enter name screen store it in the variable for readability
    const EnterNameScreen = currentPhase === PHASES.EnterName

    //If the current phase is the Introm screen store it in the variable for readability
    const IntroScreen = currentPhase === PHASES.IntroScreen
    
    //If the current phase is the Quiz Body screen store it in the variable for readability
    const QuizScreen = currentPhase === PHASES.QuizBody

  return (
    <div className='IntroScreen'>
        {handlePhaseLogic()}
    </div>
  )
}
  
