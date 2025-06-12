

import React, { useState } from 'react'

export default function FeedBackTracker() {

    const [count, setCount] = useState(0)

    const [recentFeedback, setRecentFeedback] = useState('')

    function handleCount() {
        setCount(count + 1)
    }

    function handleFeedback(newFeedback){
        setRecentFeedback(newFeedback)
    }


    

  return (
    <div>
        
        <button onClick={() => {
                handleCount(),
                handleFeedback('Good')
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
    </div>
  )
}
