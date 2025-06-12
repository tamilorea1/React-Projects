
import React, { useRef } from 'react'
import Input from './Input'
import Modal from './Modal'

export default function NewProject({onAdd, onCancel}) {

    const modal = useRef()

   const title = useRef()
   const description = useRef()
   const dueDate = useRef()


   function handleSave() {
        const enteredTitle = title.current.value
        const enteredDescription= description.current.value
        const enteredDueDate = dueDate.current.value

    if (enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDueDate.trim() === '') {
        
        modal.current.open()
        return;
    }

        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        })
   }

  return (
    <>
    <Modal ref={modal} buttonCaption='Close'>
        <h2>Invalid input</h2>
        <p>You forgot to enter a value</p>
        <p>Please enter values in each input field</p>
    </Modal>
        <div className='new-project-container'>
        <menu className='new-project-buttons'>
            <li><button onClick={onCancel}>Cancel</button></li>
            <li><button onClick={handleSave}>Save</button></li>
        </menu>

        <div className='form-inputs'>
            <Input type='text' ref={title} label="Title"/>
            <Input ref={description} label="Description" textarea={true}/>
            <Input type="date" ref={dueDate} label="Due Date"/>
        </div>
        
        </div>
    </>
    
  )
}
