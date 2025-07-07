import React from 'react'
import { useState } from 'react'
import QUESTIONS from '../questions'
import QuizResults from './QuizResults'
import QuizAnswers from './QuizAnswers'
import { useEffect } from 'react'

export default function Quiz({userName}) {
    //We use the array to know how many answers have been chosen,
    //which corresponds to the current question the users on.
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState([])

    //We use the object to determine what each answer selected by the user is correct or wrong
    const [highlight, setHighlight] = useState({
        answer: null,
        type: null
    })

    //We use the state to ensure that the answers are shuffled once upon them being displayed
    const [shuffledAnswers, setShuffledAnswers] = useState([])

    //This function handles the logic for when an answer button is clicked
    //We have an argument newAnswer, which is the users clicked answer
    function handleAnswerClicked(newAnswer) {
        // Prevent multiple clicks while highlighting
        if (highlight.answer !== null) {
            return;
        }
        //we store the correct answer in a variable that will be used for comparison
        const correctAnswer = QUESTIONS[activeQuestionIndex].answers[0]

        //if the user's answer is equal to the correct answer, then the type should be correct
        //else should be wrong
        if (newAnswer === correctAnswer) {
            setHighlight({
                answer: newAnswer,
                type: 'correct'
            })
        }
        else{
            setHighlight({
                answer: newAnswer,
                type: 'wrong'
            })
        }

        //this feature ensures the user can get feedback after they've clicked an answer
        //The feedback will happen in 1.5s
        setTimeout(() => {
            setCurrentQuestionIndex((prevAnswer) => {
                return [...prevAnswer, newAnswer]
            })
            
            // Reset highlight after moving to next question
            setHighlight({
                answer: null,
                type: null
            })
        }, 2000)
    }

    //this function handles the logic for when the skip button is pressed
    function handleSkipButton() {
        // Prevent skip if currently highlighting an answer
        if (highlight.answer !== null) {
            return;
        }

        setCurrentQuestionIndex((prevAnswer) => {
        //    console.log('skip clicked')
           return [...prevAnswer, null]
        })
    }

    //We store the length of the array in a variable
    const activeQuestionIndex = currentQuestionIndex.length

    //this is the logic for if there are no more questions to be answered
    const quizComplete = activeQuestionIndex === QUESTIONS.length

    //Ensures that the shuffling is handled once - FIXED: Only shuffle when question changes
    useEffect(() => {
        // Only shuffle answers when we move to a new question (not when highlighting changes)
        if (activeQuestionIndex < QUESTIONS.length) {
            let shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]
            shuffledAnswers = shuffledAnswers.sort(() => Math.random() - 0.5)
            setShuffledAnswers(shuffledAnswers)
        }
    }, [activeQuestionIndex])

    if (quizComplete) {
        //display results screen
        return(
            <QuizResults 
            answers={currentQuestionIndex}
            QUESTIONS={QUESTIONS}
            username={userName}
            />
        )
    }

    return (
        <div>
            {/*Passing down props to respective children */}
            <p className='PlayerName'>🧙🏾Name: {userName}</p>

            <div className='QuestionText'>
                {QUESTIONS[activeQuestionIndex].text}
            </div>

            <QuizAnswers
            handleAnswerClicked={handleAnswerClicked}
            shuffledAnswers={shuffledAnswers}
            highlight={highlight}
            />

            <button 
            className='SkipBtn'
            onClick={handleSkipButton}
            disabled={highlight.answer !== null}
            >
                Skip Question
            </button>
        </div>
    )
}