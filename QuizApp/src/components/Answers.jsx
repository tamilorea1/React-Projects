//This component will be used to display the list of shuffled answers
import React from 'react'
import {  useRef } from 'react'
export default function Answers({answers, selectedAnswer, answerState, onSelect}) {

    const shuffledAnswers = useRef();

          //store and spread the answers in a new list
    //we then sort and randomize the order of the answers
    //This code is here and should run, only if we have questions to display & execute
    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5)
    }

    


  return (
    <ul id='answers'>
                {/*We're mapping through each shuffled answer from our questions file,
                so they can be displayed */}

                {/*We wrap each answerItem in a button so that 
                they become clickable */}
                {shuffledAnswers.current.map((answerItem) => {
                    const isSelected = selectedAnswer === answerItem
                    let cssClass = '';

                    if (answerState === 'answered' && isSelected) {
                        cssClass = 'selected'
                    }

                    if ((answerState === 'correct' || answerState === 'wrong')
                    && isSelected) {
                        cssClass = answerState
                    }

                    return (
                        <li key={answerItem} className='answer'>
                        <button 
                        onClick={() => onSelect(answerItem)}
                        className={cssClass}
                        disabled={answerState !== ''}
                        >{answerItem}</button>
                        </li>
                    )
                })}
            </ul>
  )
}
