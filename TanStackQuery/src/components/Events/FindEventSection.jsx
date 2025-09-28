import { useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';

export default function FindEventSection() {
  const searchElement = useRef();

  const [searchTerm, setSearchTerm] = useState();

  //we use isLoading since it wont be true 
  //if the enabled property is disabled
const {data, isLoading, isError, error} = useQuery(
  {
    //passing 'events' as a key again wouldn't be ideal
    //this is because it is the same name for the NewEventsSection
    //and it would use that key instead of this one
    //so here we have to add more information
    //hence why we're using an object
    queryKey: ['events', {search: searchTerm }] ,

    queryFn: ({signal}) => fetchEvents({signal, searchTerm}),

    //we set enabled to false in the case
    //where we're opening the page for the first time
    //and no events should be loaded yet

    //if this is true do comment above (disable)
    //else if searchTerm is anything else
    // a request will be sent making it (enabled)
    enabled: searchTerm !== undefined

    //Basically when we initially open the page
    //the laoding spinner will show
    //meaning the query is currently disabled
    //but once we put something in the input field and click the search button
    //our query becomes enabled, making a request
    //even after we clear the input field and hit search
    //it will then show all events
  }
)

  function handleSubmit(event) {
    event.preventDefault();
    //searchTerm becomes our new value, only when our form is submitted
    setSearchTerm(searchElement.current.value)
  }

  let content = <p>Please enter a search term and to find events</p>

  if (isLoading) {
    content = <LoadingIndicator/>
  }

  if (isError) {
    content =
    (
    <ErrorBlock 
    title="An error occurred" 
    message={error.info?.message || 'Failed to fetch events'} />
  
  )
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
