import React from 'react'

export default function QuizAnswers({ 
  handleAnswerClicked,
  shuffledAnswers,
  highlight
}) {

  return (
    <div className="AnswersContainer">
      <ul className="AnswerList">
        {/*We iterate through each shuffled answer */}
        
        {shuffledAnswers.map((answerItem) => {
            // More robust highlight checking
            const highlightAnswer = highlight.answer && answerItem === highlight.answer;

            //it will search for the className either 'highlight-correct' or 'highlight-wrong'
            const highlightClass = highlightAnswer ? `highlight-${highlight.type}` : '';

            return (
              <li key={answerItem} className="AnswerItem">
                <button 
                  onClick={() => handleAnswerClicked(answerItem)} 
                  className={`AnswerButton ${highlightClass}`}
                  // Disable button during highlight to prevent multiple clicks
                  disabled={highlight.answer !== null}
                >
                  {answerItem}
                </button>
              </li>
            );
        })}
      </ul>
    </div>
  );
}
