import { useParams, Link,  useRouteLoaderData, redirect } from "react-router-dom";
import EventItem from '../EventItem'
function EventDetailPage() {

    // const params = useParams()

    const data = useRouteLoaderData('event-detail')
     
    return (<>
                <h1>The event detail page</h1>
    
                <EventItem event={data.event} />
                {/* <Link to='..' relative="path"> Back</Link> */}
            </>
        
        
    )
}

export default EventDetailPage;


export async function loader({request, params}) {

    const id = params.eventId
    
    const response =  await fetch('http://localhost:8080/events/' + id)

    if (!response.ok) {
        throw new Response(
                JSON.stringify({message: 'Could not fetch events'}),
                { status: 500 }
              )
    }
    else{
            return response

    }

}


export async function action({ params, request}) {

    const id = params.eventId
    
    const response =  await fetch('http://localhost:8080/events/' + id, {
        method: request.method
    })

    if (!response.ok) {
        throw new Response(
                JSON.stringify({message: 'Could not delete events'}),
                { status: 500 }
              )
    }
    
    return redirect('/events')

}

