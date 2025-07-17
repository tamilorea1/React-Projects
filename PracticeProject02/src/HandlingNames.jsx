
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

// This is the URL where we are getting the fake user data from
// It's a free dummy API provided by JSONPlaceholder
const BASE_URL = 'https://jsonplaceholder.typicode.com/users'
export default function HandlingNames() {

const [names, setNames] = useState(null)
//initially null to represent 'no data yet'

const [errors, setErrors] = useState(null)
//initially null to represent 'no error yet'

useEffect(() => {
    const fetchName = async () => {

       try {
    // Making the request to the API to get user data    
    const response = await fetch(`${BASE_URL}`)

    //displays the custom error message
    // If it's not OK, we throw an error and skip to the catch block
    if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

    // If the fetch is successful, we convert the response to JSON (actual data)    
    const names = await response.json()

    // Save the fetched data into 'names' state
    setNames(names)
    setErrors(null) //clears the previous error since its successful
        }
 
        catch (error) {
     // If an error happens (either fetch fails or response is not OK), we catch it
    // Store the error message into 'errors' state       
    setErrors(error.message)
}
        
    }
     // Call the function to actually fetch data
    fetchName()
}, [])

  return (
    <div>
        <ol>
            {
            errors ? <p>{errors}</p> :
            names ?  names.map((nameItem) => {
           return <li key={nameItem.id}>{nameItem.website}</li>
        }) :
        <p>Loading</p>
        }
        </ol>
        
    </div>
  )
}
