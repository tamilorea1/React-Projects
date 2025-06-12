import React from 'react'


export default function Input({textarea, label, ...props}) {
    //We will be using the prop isTextarea to check if the element to be displayed should be an input field or text area
  return (
    <p className='form-group'>
        <label> {label}</label>
         {textarea ? <textarea {...props}/> : <input {...props}/>}
     </p>
  )
}
