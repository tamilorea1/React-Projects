
import React, { useState } from 'react'

export default function UserInput({handleInvestmentChange, userInput}) {
    

  return (
    <section id='user-input'>

        <div className='input-group'>
            <p>
                {/*The onChange attribute looks for the object key named 'Initial' and gets the value that was input into it */}
                {/*The value attribute stores the value of the input field dedicated to the key called 'Initial' */}
                <label>Initial investment</label>
                <input type="number" 
                placeholder='Enter a number' 
                required
                onChange={(event) => handleInvestmentChange('initialInvestment', event.target.value)}   
                value={userInput.initialInvestment}
                />

            </p>

            <p>
                <label>Annual investment</label>
                <input type="number" 
                placeholder='Enter a number' 
                required   
                onChange={(event) => handleInvestmentChange('annualInvestment', event.target.value)}   
                value={userInput.annualInvestment}/>
            </p>

        </div>
        
        <div className='input-group'>
                <p>
                <label>Expected return</label>
                <input type="number" 
                placeholder='Enter a number' 
                required  
                onChange={(event) => handleInvestmentChange('expectedReturn', event.target.value)}   
                value={userInput.expectedReturn}
                />
            </p>

            
            <p>
                <label>Duration</label>
                <input type="number" 
                placeholder='Enter a number' 
                required   
                onChange={(event) => handleInvestmentChange('duration', event.target.value)}   
                value={userInput.duration}/>
            </p>
            </div>
            

    </section>
  )
}
