import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

export default function QuestionTimer({ timeout, onTimeout, mode }) {

    // State to track the remaining time, initially set to the full `timeout` value
    const [remainingTime, setRemainingTime] = useState(timeout);

    // Effect that runs once and sets up a one-off timer that will trigger onTimeout after `timeout` ms
    useEffect(() => {
      const timer =  setTimeout(() => {
            onTimeout()       // Call the provided callback after time is up
        }, timeout)           // Run once after `timeout` milliseconds
        return () => {
            clearInterval(timer)
        }

    }, [onTimeout, timeout])  // Re-run this effect if `onTimeout` or `timeout` changes


    // Effect to decrease the remaining time continuously as a visual timer
    useEffect(() => {
        // Set up an interval that updates `remainingTime` every 100 ms
        const intervalId = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 100) 
            // Subtract 100 ms from the previous value
        }, 100)

        // Cleanup function: clear the interval when this component unmounts
        return () => {
            clearInterval(intervalId)
        } 
    }, []) // Run this effect only once when component mounts


    return (
        // Render a progress bar representing the remaining time
        // max is the full time, value is the current time left
        <progress 
        id='question-time' 
        max={timeout} 
        value={remainingTime}
        className={mode}
        />
    )
}
