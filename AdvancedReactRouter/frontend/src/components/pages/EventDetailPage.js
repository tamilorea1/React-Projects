import { useParams, Link } from "react-router-dom";

function EventDetailPage() {

    const params = useParams()
    return (<>
                <h1>The event detail page</h1>
    
                <p>{params.eventId}</p>
                <Link to='..' relative="path"> Back</Link>
            </>
        
        
    )
}

export default EventDetailPage;