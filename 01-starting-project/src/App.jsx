import Header from "./components/Header"
import ResultsTable from "./components/ResultsTable"
import UserInput from "./components/UserInput"
import { useState } from "react"

//Initial values of my labels
const USER_LABELS = {
  initialInvestment: 10000,
  annualInvestment: 100,
  expectedReturn: 3,
  duration: 10
}

function App() {

  //states for updating the UI of my website
  //Set the intial value to my object 'USER-LABEL
  //so we can access its key-value pairs easily
  const [userInput, setUserInput] = useState(USER_LABELS)

  //Check if the duration input by the user is greater than or equal to 1
  const isDurationValid = userInput.duration >= 1;
  
  //This function ensure that when we type a value in our input field, its not going to apply to all input fields
      function handleInvestmentChange(inputName, inputValue) {
        //We want to keep our original values using the spread '...' operator
        //This line '[inputName]: inputValue', states we should only change the field with the label 'inputName' to inputValue
        //if we did inputName: inputValue, it means that it would search for a key called 'inputName' and set it to inputValue
        //So we are using the inputName variable to access the key of our object
        setUserInput ((prevValue) => {
            return{
              ...prevValue,
              [inputName]: Number(inputValue),
            }
          })
      }
  

  return (
    <>
    
      <Header/>
      <UserInput handleInvestmentChange={handleInvestmentChange} userInput={userInput}/>
      {isDurationValid ? <ResultsTable userInput={userInput}/> : 
      <p className="center">Please enter a duration greater than 0</p>}
    </>
  )
}

export default App
