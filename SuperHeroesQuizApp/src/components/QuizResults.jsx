import React from 'react'

/**
 * QuizResults Component - Displays the final results of the quiz
 * 
 * This component renders a comprehensive results screen showing:
 * - Individual question results with status indicators
 * - Overall statistics (correct, wrong, skipped percentages)
 * - User's answers compared to correct answers
 * 
 * @param {Array} answers - Array of user's answers (null for skipped questions)
 * @param {Array} QUESTIONS - Array of question objects with text and answer options
 */
export default function QuizResults({answers, QUESTIONS, username}) {
  
    // Guard clause: Ensure required data is available before rendering
    // This prevents errors if the component renders before data is loaded
    if (!answers || !QUESTIONS) {
        return <div>Loading results...</div>
    }

    // Initialize counters for tracking different answer types
    // These will be incremented as we process each question
    let skipCount = 0;      // Questions the user skipped
    let correctCount = 0;   // Questions answered correctly
    let wrongCount = 0;     // Questions answered incorrectly
    
    // Store total number of questions for percentage calculations
    const totalQuestions = QUESTIONS.length

    return (
        <section>
            {/* Main results header */}
            <p>Here are your results</p>

            <div>
                <ul>
                    {/* 
                    Map through each question to display individual results
                    We use QUESTIONS array to ensure we show all questions in order
                    */}
                    {QUESTIONS.map((question, index) => {
                        // Get the user's answer for this question (by index position)
                        const userAnswer = answers[index]
                        
                        // Get the correct answer (always stored as first option in answers array)
                        const correctAnswer = question.answers[0]

                        // Variable to store the status of this question
                        let status;
                        
                        // Determine the status and increment appropriate counter
                        if (userAnswer === null) {
                            // User skipped this question
                            status = 'Skipped'
                            skipCount += 1
                        }
                        else if (userAnswer === correctAnswer) {
                            // User answered correctly
                            status = 'Correct'
                            correctCount += 1
                        }
                        else {
                            // User answered incorrectly
                            status = 'Wrong'
                            wrongCount += 1
                        }

                        // Render individual question result
                        return(
                            <div key={question.id} className="ResultItem">
                                {/* Question number (1-based index for user display) */}
                                <p className="QuestionNumber">{index + 1}</p>
                                
                                {/* Display the question text */}
                                <p className="QuestionText">{question.text}</p>
                                
                                {/* 
                                Display user's answer or "No answer" for skipped questions
                                Uses logical OR operator for fallback text
                                */}
                                <p className="UserAnswer">{userAnswer || "No answer"}</p>
                                
                                {/* 
                                Status indicator with dynamic CSS class
                                - Uses template literal to combine base class with status-specific class
                                - toLowerCase() ensures CSS class names are consistent
                                */}
                                <p className={`AnswerStatus ${status.toLowerCase()}`}>{status}</p>
                            </div>
                        )
                    })}
                </ul>

                {/* 
                Overall Statistics Section
                Calculate and display percentages for each category
                Math.round() ensures clean percentage display without decimals
                */}
                
                {/* Skipped questions percentage */}
                <p className="StatSkipped">
                    Questions Skipped: {Math.round((skipCount/totalQuestions) * 100)}%
                </p>

                {/* Correct answers percentage */}
                <p className="StatCorrect">
                    Questions Correct: {Math.round((correctCount/totalQuestions) * 100)}%
                </p>

                {/* Wrong answers percentage */}
                <p className="StatWrong">
                    Questions Wrong: {Math.round((wrongCount/totalQuestions) * 100)}%
                </p>
            </div>
        </section>
    )
}