import { useState } from "react";

export default function Login() {

  const [enteredEmail, setEnteredEmail] = useState('')

  const [enteredPassword, setEnteredPassword] = useState('')

  const [didEdit, setDidEdit] = useState(false)

  const [IsInvalid, setIsInvalid] = useState(false)
  //this checks if the user edited/typed anything in the input field
  //and if it does NOT include an @
  //Then emailIsInvalid is true
  //This method evaluates the input field by each keystroke
  //which shows the error a bit early
  //It shows it early the moment a person types a character in the input field

  const emailIsInvalid = didEdit && !enteredEmail.includes('@')
  

  function handleSubmission(event){
    //need to have this when dealing with the submission of a form
    event.preventDefault();
    
    if (emailIsInvalid) {
      setIsInvalid(true)
      return

    }

    setIsInvalid(false)

    console.log('user email:'  + enteredEmail, 'user password:' + enteredPassword)
  }


  function handleEmailChange(event){
    setEnteredEmail(event.target.value)
    setDidEdit(false) //ensures that while typing its not editing
    setIsInvalid(false)
  }

  function handlePasswordChange(event) {
    setEnteredPassword(event.target.value)
  }

  function handleReset(){
    setEnteredEmail('')
    setEnteredPassword('')
  }

  function handleEmailBlur() {
    setDidEdit(true)
  }

  return (
    //don't put a onclick event on the login button
    //rather make an onsubmit event for the form itself 
    <form onSubmit={handleSubmission}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input 
          id="email" 
          type="email" 
          name="email"
          //if the user clicks off the input field it loses focus
          //which could show the error
          onBlur={handleEmailBlur} 
          onChange={handleEmailChange}
          value={enteredEmail} />

            <div className="control-error">
                {IsInvalid && <p>Invalid email, try again</p>}
            </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input 
          id="password" 
          type="password" 
          name="password" 
          onChange={handlePasswordChange}
          value={enteredPassword}
          />
        </div>
      </div>

      <p className="form-actions">
        <button onClick={handleReset} className="button button-flat">Reset</button>
        <button 
        className="button">Login</button>
      </p>
    </form>
  );
}
