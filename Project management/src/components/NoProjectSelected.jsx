
import React from 'react'
import Image from '../assets/no-projects.png'

export default function NoProjectSelected({handleAddProject}) {
  return (
    <div className='No-project-container'>
        <img className='No-project-img' src={Image} alt="Empty task" />
        <h2 className='No-project-header'>Select a project or create a new one</h2>

        <p className='No-project-btn-container'>
            <button className='No-project-btn' onClick={handleAddProject}>Create new Project</button>
        </p>
    </div>
  )
}
