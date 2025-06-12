

import React, { useState } from 'react'

export default function ColorPicker ({color, handleClick}) {

    
    const isRed = color === 'Red'

  return (
    <div  >
        <div >
            <button   onClick={() => handleClick('Red')}>
                Red
            </button>
        </div>

        <div >
            <button   onClick={() => handleClick('Blue')}>
                Blue
            </button>
        </div>

        <div className={isRed ? 'redBox' : 'blueBox'}>
            <p>Is this wokring</p>
        </div>
    </div>
  )
}
