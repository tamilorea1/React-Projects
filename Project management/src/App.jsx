// Importing necessary hooks and components
import { useState } from "react";
import Input from "./components/Input";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SideBar from "./components/SideBar";
import SelectedProject from "./components/SelectedProject";

function App() {
  // Setting up state to manage which project is selected, and storing the list of projects
  const [projectsState, setProjectsState] = useState({
    selectedProjectId : undefined, 
    // 'undefined' means the user hasn't selected a project *and* is not currently adding a new one
    project: [] 
    // This will eventually hold all user-created projects
  })

  // This function is triggered when the user wants to add a new project
  function handleAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null, 
        // 'null' specifically tells the app: "We're in add-project mode"
      };
    });
  }


   // Called when a new project has been submitted from the NewProject component
  function handleAddedProjects(projectData) {
    setProjectsState((prevState) => {
      // Create a new project object with a randomly generated id
      const newProject = {
        ...projectData,
        id: Math.random() // placeholder for a unique project ID
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        // Add the new project to the existing project list
        project: [...prevState.project, newProject]
      };
    });
  }


  function handleCancelProject() {
      setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined, 
        // 'null' specifically tells the app: "We're in add-project mode"
      };
    });
  }


function handleSelectedProject(id) {
  setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id, 
        // 'null' specifically tells the app: "We're in add-project mode"
      };
    });
  }


  const selectedProject = projectsState.project.find(
    (project => project.id === projectsState.selectedProjectId)
  )
  // Decides what main content to display based on selectedProjectId
  let content = <SelectedProject project={selectedProject}/>;

  if (projectsState.selectedProjectId === null) {
    // If we're in add-project mode, show the NewProject component
    content = <NewProject onCancel={handleCancelProject} onAdd={handleAddedProjects}/>
  } 
  
  else if (projectsState.selectedProjectId === undefined) {
    // If nothing is selected and we're not adding, show the NoProjectSelected screen
    content = <NoProjectSelected handleAddProject={handleAddProject} />
  }

  return (
    <>
      {/* Sidebar is always shown, and gives user a way to trigger add-project mode */}
      <SideBar onSelectProject={handleSelectedProject} handleAddProject={handleAddProject} projects={projectsState.project} />
      
      {/* Display main content based on the current state */}
      {content}
    </>
  );
}

export default App;
