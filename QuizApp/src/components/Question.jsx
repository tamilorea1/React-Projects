import { useState } from 'react'
import Answers from './Answers.jsx'
import QuestionTimer from './QuestionTimer.jsx'
import React from 'react'
import QUESTIONS from '../questions.js'

export default function Question({
    
    onSelectAnswer, 
    onSkipAnswer,
    questionIndex
 }) {

 const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    let timer = 10000;

        if (answer.selectedAnswer) {
            timer = 1000;
        }

        if (answer.isCorrect !== null) {
            timer = 2000
        }

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer : answer,
            isCorrect: null
        })

        

        setTimeout(() => {
            setAnswer({
            selectedAnswer : answer,
            isCorrect: QUESTIONS[questionIndex].answers[0] === answer
        })

        setTimeout(() => {
            onSelectAnswer(answer)
            }, 2000)
        }, 1000)
    }

let answerState = ''

if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong'
}
else if (answer.selectedAnswer) {
    answerState = 'answered'
}

  return (
     
    <div id='question'>
        {/*here we're using activeQuestionIndex as the index number 
        (Ex: QUESTIONS[0]),
        and we're accessing the 'text' key-value. Which stores the
        current question  */}
            {/*We're calling the other component and sending props to it */}
            {/* setting the key prop to the question index allows our app 
            to reset the progress bar once a new question appears */}
            {/* Think of it as, after the question at index 1 is complete,
            we discard the its componnent and reset for the next question*/}
            <QuestionTimer 
            key={timer}
            mode={answerState}
            timeout={timer} 
            onTimeout={ answer.selectedAnswer === '' ? onSkipAnswer : null }/>
            <h2>{QUESTIONS[questionIndex].text}</h2>
        
            <Answers  
            answers={QUESTIONS[questionIndex].answers}
            selectedAnswer={ answer.selectedAnswer}
            answerState={answerState}
            onSelect={handleSelectAnswer }
            />
        
    </div>
  )
}
