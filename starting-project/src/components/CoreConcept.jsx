import { CORE_CONCEPTS } from '../data.js';
import CoreConcepts from './CoreConcepts/CoreConcepts.jsx'

export default function CoreConcept() {
  return (
    <section id='core-concepts'>
          <h2>Core Concepts</h2>
          <ul>
            {CORE_CONCEPTS.map((conceptItem) => 
            <CoreConcepts key={conceptItem.title} {...conceptItem}/>)}
          </ul>
    </section>
  )
}
