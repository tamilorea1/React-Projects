import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@tanstack/react-query';

import Header from '../Header.jsx';

import { fetchEvent, deleteEvent, queryClient } from '../../util/http.js';

export default function EventDetails() {

  const params = useParams()
  const navigate = useNavigate()
  const { data, isPending, isError, error  } = useQuery({
    queryKey: ['events', {id: params.id} ] , 
    queryFn: ({signal}) => fetchEvent({signal, id: params.id})
  })

  const {mutate} = useMutation({

    mutationFn: deleteEvent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],

        refetchType: 'none'
      })

      navigate('/events')
    }
  })

  function handleDelete() {
    //we're getting the id object name from the 
    // deleteEvent function. That is its parameter
    //we set its value to params.id since it contains the page id

    mutate({ id: params.id})
  }

  let content;
  
    if (isPending) {
      content = <p>Page is loading</p>
    }
  
    if (isError) {
      content =
      (
      <ErrorBlock 
      title="Failed to load event" 
      message={error.info?.message || 'Failed to fetch events'} />)

    }

    if(data){
      content = 
      (
        <>
          <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>

        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">EVENT LOCATION</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{data.date} @ {data.time}</time>
            </div>
            <p id="event-details-description">{data.description }</p>
          </div>
        </div>

        </>
      )
    }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        {content}
      </article>
    </>
  );
}
