import React from 'react'
import { useState } from 'react'


export default function SearchAPI() {
    const [searchedItem, setSearchedItem] = useState('')

    const [currentItem, setCurrentItem] = useState('')

    const [errors, setErrors] = useState(null)

    const handleSearch = async () => {
        // Step 1: First, we check if the user didn't type anything (just pressed search without writing).
        if (searchedItem.trim() === '' ) {
            setErrors('Please enter a name to be searched')
        }
        // Step 2: If they did type something, we continue with the search.
        else{
            try {
            // This line goes to GitHub's search system, adding whatever the person typed at the end of the link.
            const response = await fetch(`https://api.github.com/search/users?q=${searchedItem}`)

            // If something goes wrong with getting information from GitHub (like bad internet), this catches the problem.
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
            }

            // Step 3: Convert the reply we get back into readable data (JSON format).
            const data = await response.json()

            // Step 4: Save the user information we got into our "currentItem" state to display it later.
            setCurrentItem(data)

            console.log(data)

            // If everything worked, clear out any old error messages.
            setErrors(null)

            // Step 5: Check if no users were found with that name, and show a message for it. 
            if (data.items.length === 0) {
                setErrors('Profile not found')
            }

        } catch (error) {
            setErrors(error.message)
        }
        }
        
        
    }

    

  return (
    <div>
        {/* Input box where users type the name they want to search */}
        <input 
        type="text" placeholder='Enter a name'
         onChange={(e) => setSearchedItem(e.target.value)}
         value={searchedItem}/>
        <button onClick={handleSearch}>Search</button>

        <div>
            {/* If there are any errors (like empty box or profile not found), it shows them */}
            {errors ? <p>{errors}</p> :
            <ol>
                {/* "currentItem && currentItem.items" checks if we have search results before trying to show them */}
                {currentItem && currentItem.items ?   currentItem.items.map((Item) => {
                    
                   return <li key={Item.id}>
                            {/* This shows the username */}
                            {Item.login}

                            {/* This shows the user's profile picture */}
                            <img src={Item.avatar_url} alt="" />

                            {/* This shows a clickable link that takes you to the user's GitHub profile */}
                            <a href={Item.html_url}>Github Profile</a>
                        </li>
                        
                }) : null}
            </ol>
            }
            
        </div>
    </div>
  )
}
