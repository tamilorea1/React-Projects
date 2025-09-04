import EventForm from '../EventForm'
import {redirect} from 'react-router-dom'

function NewEventPage() {
    return  <EventForm method='post' />
        
    
}

export default NewEventPage;

