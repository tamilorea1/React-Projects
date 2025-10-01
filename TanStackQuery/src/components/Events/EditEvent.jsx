import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';

import { useMutation, useQuery } from '@tanstack/react-query';

import { fetchEvent, updateEvent , queryClient} from '../../util/http.js';
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

    onMutate: async (data) => {
      const newEvent= data.event;

      await queryClient.cancelQueries({queryKey:['events', params.id]})

      const previousEvent = queryClient.getQueryData(['events', params.id])

      queryClient.setQueryData(['events', params.id], newEvent)
    
    
      return {previousEvent}
    },

    onError: (error, data, context) => {
      queryClient.setQueryData(['events', params.id], context.previousEvent)
    },
    
    onSettled: () => {
      queryClient.invalidateQueries(['events', params.id])
    }

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
