import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';

import { fetchEvents } from '../../util/http.js'; //import the fetch logic

export default function NewEventsSection() {
  //useQuery should be stored in an object
  //we will then use object destructuring, to pull out important information.
  //isPending lets us know if we got a response, or we're in the process of doing so
  //isError will be true if we get back an error response
  //but to ensure isError is true, in our fetchEvents(http.js)
  //we have to ensure an error is thrown (line 12)
  //error stores the error message
  const { data, isPending, isError, error} = useQuery({

     //this is our identifier
    //this will be used to cache the data
    //cache meaning, storing data so that it could be reused later
    //values are stored in arrays
    //can also be different value types like strings, properties, or nested arrays
    queryKey: ['events'],

    //this stores a promise
    //this is our function
    queryFn: fetchEvents

   
  });


  // const [data, setData] = useState();
  // const [error, setError] = useState();
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
   

  //   fetchEvents()
  //     .then((events) => {
  //       setData(events);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      //error.info is gotten from http.js
      //if it is true/exists then show the message attached to it
      <ErrorBlock title="An error occurred" message={error.info?.message || 'Failed to fetch events'} />
    );
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
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
