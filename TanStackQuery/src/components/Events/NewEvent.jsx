import { Link, useNavigate } from 'react-router-dom';

//to send POST data
//also to change data in the backend
import {useMutation} from '@tanstack/react-query'

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';

import { createNewEvent, queryClient } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function NewEvent() {
  const navigate = useNavigate();

const { mutate, isPending, isError, error } =   useMutation({

    mutationFn: createNewEvent,


    //this will invalidate all queries with the key 'events
    //this also causes the query to refetch
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events']
      })
      navigate('/events')
    }
  })

  //this will send the createNewEvent (line 18), 
  // each time the handleSubmit is run
  function handleSubmit(formData) {
    mutate({event: formData})
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>

        {isPending && 'Submitting...'}
        {!isPending &&(
        <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>
      )}
        
      </EventForm>
      {isError && <ErrorBlock 
      title="Failed to create event" 
      message={
        error.info?.message || 'Failed to fetch events. Try again later'}
        />}
    </Modal>
  );
}
