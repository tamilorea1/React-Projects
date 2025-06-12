
import React from 'react'
import { useState } from 'react'

export default function UserInput() {

    const [name, setName] = useState('')
    const[comment, setComment] = useState('')
    const [rating, setRating] = useState('')
    const [submit, setSubmit] = useState(false)

    function handleName(event) {
        setName(event.target.value);
    }

    function handleComment(event) {
        setComment(event.target.value)
    }

    function handleRating(event) {
        setRating(event.target.value)
    }

    function handleSubmit() {
        if (rating >= 1 && rating <= 5) {
            setSubmit(true)
        }
        else{
            alert('Please reenter a valid rating')
        }
        
    }

    

  return (
    <section>
        {submit ?
        <div>
            <p>Thank you, {name}</p>
            <p>Your comment: {comment}</p>
            <p>Your rating: {rating}</p>
            <button onClick={() => setSubmit(false)}>Edit</button>
        </div>
        :
        <div>
            <p>
            <label>Name</label>
            <input 
            type="text" 
            placeholder='Enter your name' 
            onChange={handleName}
            value={name}
            />
        </p>

        <p>
            <label>Comment</label>
            <input 
            type="text" 
            placeholder='Enter your comment'
            onChange={handleComment}
            value={comment}
            />
        </p>

        <p>
            <label> Rating</label>
            <input 
            type="number" 
            placeholder='Enter your rating'
            onChange={handleRating}
            value={rating}
             />
        </p>
        

        <button onClick={handleSubmit}>
            Submit
        </button>
        </div>
        }
        
    </section>
  )
}
