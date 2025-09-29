import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@tanstack/react-query';

import Header from '../Header.jsx';

import { fetchEvent, deleteEvent, queryClient } from '../../util/http.js';
import { useState } from 'react';
import Modal from '../UI/Modal.jsx'

export default function EventDetails() {

  //this is for the case where we accidentally click the 
  // delete button. It will show a prompt
  const [isDeleting, setIsDeleting] = useState(false)

  const params = useParams()
  const navigate = useNavigate()
  const { data, isPending, isError, error  } = useQuery({
    queryKey: ['events', {id: params.id} ] , 
    queryFn: ({signal}) => fetchEvent({signal, id: params.id})
  })

  //we give isPending, isError, and error new names
  //we do this since it would clash with the useQuery 
  //objects
  const {
    mutate, 
    isPending: isPendingDeletion, 
    isError: isErrorDeleting, 
    error: deleteError} = useMutation({

    mutationFn: deleteEvent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],

        refetchType: 'none'
      })

      navigate('/events')
    }
  })

  function handleStartDelete() {
    setIsDeleting(true)
  }

  function handleStopDelete() {
    setIsDeleting(false)
  }

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
            <button onClick={handleStartDelete}>Delete</button>
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
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure?</h2>
          <p>Do you really want to delete this event?</p>
          <div className='form-actions'>
            {isPendingDeletion && <p>Deleting, please wait...</p>}
            {!isPendingDeletion && (
              <>
                <button onClick={handleStopDelete}>Cancel</button>
                <button onClick={handleDelete}>Delete</button>
              </>
            )}
            
          </div>
          {isErrorDeleting && <ErrorBlock
          title='Failed to delete event'
          message= {deleteError.info?.message || 'failed to delete try again'}
          />}
      </Modal>
      )}
      
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
