import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';

import { useMutation, useQuery } from '@tanstack/react-query';

import { fetchEvent, updateEvent } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {

  const params = useParams()
  const navigate = useNavigate();
 const {data, isPending, isError, error } =  useQuery({
    queryKey: ['events', params.id],
    

    queryFn: ({ signal }) => fetchEvent({signal, id: params.id})
  })


  const {mutate} = useMutation({
    mutationFn: updateEvent,

    
  })


  function handleSubmit(formData) {
    mutate({id: params.id, event: formData})
    navigate('../')
  }

  function handleClose() {
    navigate('../');
  }

  let content;
  
    if (isPending) {
      content = <LoadingIndicator/>
    }
  
    if (isError) {
      content = (
        <>
          <ErrorBlock
          title='Failed to load'
          message={error.info?.message || 'try again' }/>
          <div>
            <Link to='../'>
            Okay</Link>
          </div>
        </>
        //error.info is gotten from http.js
        //if it is true/exists then show the message attached to it
        
      );
    }

    if (data) {
      content = (
        <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
      )
      
    }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}
