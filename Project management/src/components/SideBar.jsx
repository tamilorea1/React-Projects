import '../SideBar.css'
import React, { useState } from 'react'

export default function SideBar({
    handleAddProject, projects, onSelectProject, selectedProjectId}) {

    
  return (
    <aside className='sidebar-container'>
        <h2 className='sidebar-title'>Your Projects</h2>

        <div className='sidebarBtn-container'>
            <button className='sidebar-button' onClick={handleAddProject}>+ Add Project</button>
        </div>

        <ul>
            {projects.map((item) => {


                return (
                    <li key={item.id} className='project-item'>
                        <button onClick={() => onSelectProject(item.id)} className='project-button' >
                            {item.title}
                        </button>
                    </li>
                )
            })}
        </ul>
       
    </aside>
  )
}