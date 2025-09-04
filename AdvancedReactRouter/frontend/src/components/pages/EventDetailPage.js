import { useParams, Link, useLoaderData } from "react-router-dom";
import EventItem from '../EventItem'
function EventDetailPage() {

    // const params = useParams()

    const data = useLoaderData()
     
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