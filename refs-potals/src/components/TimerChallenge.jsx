import React, { useState, useRef } from 'react'
import ResultModal from './ResultModal';

export default function TimerChallenge({title, targetTime}) {

    //initially false since timer hasn't expired
    // const [timerExpired, setTimerExpired] = useState(false)

    // const [timerStarted, setTimerStarted] = useState(false)

    const [timeRemaining, setTimeRemaining] =useState(targetTime * 1000)

    const timer = useRef();
    const dialog = useRef();

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime *1000

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        setTimeRemaining(targetTime * 1000)

    }

    function handleStart() {
        // setTimerStarted(true)

        timer.current = setInterval(() => {
            // setTimerExpired(true);
            // dialog.current.showModal();
            setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10)
        }, 10);
    }

    function handleStop() {
        //To get the timer from handleStart, we need a ref(useRef)
        clearInterval(timer.current);
    }

  return (
    <>
        <ResultModal ref={dialog} targetTime={targetTime} result='lost' />       
        <section className='challenge'>
        <h2>
            {title}
        </h2>
        {timerExpired ? <p>You lost</p> : ''}
        <p className='challenge-time'>
                {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>

        <p>
            <button onClick={timerIsActive ? handleStop : handleStart}>
                {timerIsActive ? 'Stop' : 'Start'} Challenge
            </button>
        </p>

        <p className={timerIsActive ? 'active' : undefined}>

            {timerIsActive ? 'Time is running...' : 'Timer inactive' } 
        </p>
    </section>
    </>
    
  )
}
