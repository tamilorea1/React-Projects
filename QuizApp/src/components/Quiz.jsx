//Will control the quiz, alongside other quiz related components
//This component should show the current question
//As well when the question was answered
//And lastly switching between questions

import React from 'react'
import { useState, useRef } from 'react'
import QUESTIONS from '../questions.js'

import QuestionTimer from './QuestionTimer.jsx'
import { useCallback } from 'react'
import Answers from './Answers.jsx'
import Question from './Question.jsx'
import Summary from './Summary.jsx'

export default function Quiz() {

    // const shuffledAnswers = useRef();
    
    //This state handles the selected answer by the user.
    //The range of answers will be stored in an array
    //We also use this state to find out what the next question will be
    //Ex: if there are 2 stored answers in the list, then we should be looking at the 3rd question. which is currently unanswered
    const [userSelectedAnswer, setUserSelectedAnswer] = useState([])

    //This state handles the state on if an answer selected was correct or wrong
    //It is initially empty since no answer would've been selected
    // const [answerState, setAnswerState] = useState('')

    //We store the legnth of the user answers in the variable
    //Ex: if the array is empty, therefore the length of the list is 0
    //Meaning that is the current index of the question we are on. (Question 1)

    //If the length is 1, therefore the user has answered question 1
    //so now the variable is ready to show question 2.

    //with the addition of answerState
    //we check if an answer has been chosen
    //if none, we set the index of the question to the length of answers
    //else if an answer has been selected and is in the array, don't immediately move on to the next question
    //but stay on that question for the visual feedback
    const activeQuestionIndex = userSelectedAnswer.length
        // answerState === '' ? 
        // userSelectedAnswer.length : userSelectedAnswer.length - 1;

  
    //This is to check if we have finished all questions
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    //This is the function for handling when an answer is clicked
    //We keep track of previous answers by spreading them
    //We then append the selected answer at the front of the list.

    //In here we're setting the answered state to answered,
    //to declare an answer has been chosen and is waiting for the visual feedback
    //In the setTimeout, if the chosen answer and the first line in our list of answers match,
    //then the answer state is correct, else it false
const handleSelectedAnswer = useCallback(
    function handleSelectedAnswer(selectedAnswer) {
        // setAnswerState('answered');
        setUserSelectedAnswer((prevAnswers) => {
            return [...prevAnswers, selectedAnswer]
        })

        // setTimeout(() => {
        //     if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
        //         setAnswerState('correct');
        //     }
        //     else{
        //         setAnswerState('wrong');
        //     }

        //     setTimeout(() => {
        //         setAnswerState('')
        //     }, 2000 )
        // }, 1000)
    }, [])    


    const handleSkippedAnswer = useCallback(
        () => handleSelectedAnswer(null),[handleSelectedAnswer]
    )

    //if all questions are complete and there's none left, run this code below
    if (quizIsComplete) {
        return <Summary userSelectedAnswer={userSelectedAnswer}/>
    }


  return (
    
    <div id='quiz'>
       <Question 
       key={activeQuestionIndex}
       questionIndex={activeQuestionIndex}
       onSelectAnswer={handleSelectedAnswer}
       onSkipAnswer={handleSkippedAnswer}
       />
        
        
        
    </div>
  )
}
