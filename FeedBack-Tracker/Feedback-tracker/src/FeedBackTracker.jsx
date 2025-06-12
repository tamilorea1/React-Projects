

import React, { useState } from 'react'

export default function FeedBackTracker() {

    const [count, setCount] = useState(0)

    const [recentFeedback, setRecentFeedback] = useState('')

    const [goodCount, setGoodCount] = useState(0)

    function handleCount() {
        setCount(count + 1)
    }

    function handleFeedback(newFeedback){
        setRecentFeedback(newFeedback)
    }

    const goodPercent = count > 0 ? Math.round((goodCount/count)*100) : 0;
    

  return (
    <div>
        
        <button onClick={() =>

        {
                handleCount(),
                handleFeedback('Good');
                setGoodCount(goodCount + 1);
        }
    }>
            Good👍🏾
        </button>


        <button onClick={() => {
                handleCount(),
                handleFeedback('Neutral')
        }
    }>
            Neutral 😐
        </button>
        <button onClick={() => {
                handleCount(),
                handleFeedback('Bad')
        }
    }>
            Bad 👎🏾
        </button>

        <p>
            Total feedback count : {count}
        </p>

        <p>
            You selected: {recentFeedback}
        </p>

        <p>
            Good Percentage: {goodPercent} %
        </p>
    </div>
  )
}
