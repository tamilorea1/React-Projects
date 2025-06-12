import React from 'react'


export default function SelectedProject({project}) {

    const formattedDate = new Date(project.dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })

  return (
    <div className="selected-project-container">
        <header className="project-header">
            <div className="project-header-top">
                <h1 className="project-title">{project.title}</h1>
                <button className="delete-button">Delete</button>
            </div>
            <p className="project-date">{formattedDate}</p>
            <p className="project-description">{project.description}</p>
        </header>
        
        <section className="tasks-section">
            <h2 className="tasks-title">TASKS</h2>
            {/* Add your tasks content here */}
        </section>
    </div>
  )
}