
import Header from './components/Header/Header.jsx'

import CoreConcept from './components/CoreConcept.jsx';
import Examples from './components/Examples.jsx';

function App() {

  

  return (
    <div>
      <Header />
      <main>
            {/*Since we are calling the CORE_CONCEPTS object */}
            {/*We are able to access its key value pairs */}
            {/*As well as accessing the index of each key value pair for accuracy */}
            {/*Ex: CORE_CONCEPTS[0].title will go to the object at index 0 and retrieve its title */}
              {/* <CoreConcepts 
              title = {CORE_CONCEPTS[0].title}
              description = {CORE_CONCEPTS[0].description}
              image= {CORE_CONCEPTS[0].image}
              />

              <CoreConcepts
              title = {CORE_CONCEPTS[1].title}
              description = {CORE_CONCEPTS[1].description}
              image= {CORE_CONCEPTS[1].image}/>

              <CoreConcepts
              title = {CORE_CONCEPTS[2].title}
              description = {CORE_CONCEPTS[2].description}
              image= {CORE_CONCEPTS[2].image}/>

              <CoreConcepts
              title = {CORE_CONCEPTS[3].title}
              description = {CORE_CONCEPTS[3].description}
              image= {CORE_CONCEPTS[3].image}/> */}

             <CoreConcept/>
             <Examples /> 

        
        
      </main>
    </div>
  );
}

export default App;