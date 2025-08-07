import {isEmail, isNotEmpty, isEqualToOtherValue, hasMinLength} from '../util/validation'
import { useActionState } from 'react'

export default function Signup() {

  //formData is given to us by react so we can use it to access
  //the 'name' associated with an input field
  //Again having a name assigned to an input field give it a key
  //allowing us access to the information.
  function signupAction(prevFormState,formData) {
    const enteredEmail = formData.get('email')
    console.log(enteredEmail)
    //Note: using the 'action' attribute, clears the input field after 
    //the form has been submitted (Signup button is pressed).

    const password = formData.get('password')

    const confirmedPassword = formData.get('confirm-password')

    const firstName = formData.get('first-name')

    const lastName = formData.get('last-name')

    const role = formData.get('role')

    const acquisitionChannel = formData.getAll('acquisition')

    const terms = formData.get('terms')

    let errors = []

    if (!isEmail(enteredEmail)) {
      errors.push('Invalid email address')
    }

    if (!isNotEmpty(password) || !hasMinLength(password, 8)) {
      errors.push('Peovide a valid password with at least 8 characters .')
    }

    if (!isEqualToOtherValue(password, confirmedPassword)) {
      errors.push('Please make sure your passwords match.')
    }

    if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
      errors.push('Please provide your first and last name')
    }

    if (!isNotEmpty(role)) {
      errors.push('Please select a role.')
    }

    if (!terms) {
      errors.push('You must agree to the terms & conditions')
    }

    if (acquisitionChannel.length === 0) {
      errors.push('Please select at least one acquisition channel')
    }

    if (errors.length > 0) {
      //this is the key value pair {errors: errors}
      //but since theyre the same name, it can be shortened
      //the 'value' is the errors array
      return {errors, 
              enteredValues: {
                    enteredEmail,
                    password,
                    confirmedPassword,
                    firstName,
                    lastName,
                    role,
                    acquisitionChannel,
                    terms
                  }};
    }

    return {errors: null}
  }

  //This state takes an action function as its first value
  //the second value would be the initial state
  //and in our case we set this to null
  //since this would be active since the function hasn't been executed.
  
  //we set it to null since initially we don't want to display any errors
  //since nothing has been submitted and values aren't inserted yet.

  //useActionState has 3 things in its array
  //the formState is the current state of the form
  //the formAction is basically our signupAction just enhanced.
  //pending which is true or false but we dont need currently.
  const [formState, formAction] = useActionState(signupAction, 
    {errors: null})

  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input 
        id="email" 
        type="email" 
        name="email" 
        //This here keeps the email in the input field after
        //sign up button has been pressed
        defaultValue={formState.enteredValues?.enteredEmail} />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password"
          defaultValue={formState.enteredValues?.password}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.enteredValues?.confirmedPassword}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name"
          defaultValue={formState.enteredValues?.firstName}
          />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name"
          defaultValue={formState.enteredValues?.lastName}
          />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role"
        defaultValue={formState.enteredValues?.role}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes('google')}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes('friend')}

          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other"
          defaultChecked={formState.enteredValues?.acquisitionChannel.includes('other')}

          />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms"
          defaultChecked={formState.enteredValues?.terms}
          />I
          agree to the terms and conditions
        </label>
      </div>

      {formState.errors && <ul className='error'>
        {
          formState.errors.map(error => <li key={error}>
            {error}
          </li>)
        }
        </ul>}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
