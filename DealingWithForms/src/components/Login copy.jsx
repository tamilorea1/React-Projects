import { useRef, useState } from "react";

export default function Login() {

  const [emailIsInvalid, setEmailIsInvalid] = useState(false)
  const email = useRef();
  const password = useRef();


  function handleSubmission(event){
    //need to have this when dealing with the submission of a form
    event.preventDefault();
    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value

    const emailIsValid = enteredEmail.includes('@')

    if (!emailIsValid) {
      setEmailIsInvalid(true)
      return
    }

    setEmailIsInvalid(false)

    console.log('No')
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
          ref={email}
           />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input 
          id="password" 
          type="password" 
          name="password" 
          ref={password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button 
        className="button">Login</button>
      </p>
    </form>
  );
}
