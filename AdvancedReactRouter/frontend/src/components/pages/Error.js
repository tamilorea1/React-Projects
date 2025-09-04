import PageContent from '../PageContent'
import { useRouteError } from 'react-router-dom';

import MainNavigation from '../MainNavigation';
function ErrorPage() {
    
    const error = useRouteError()

    let title = 'An error occured!';
    let message = 'Something went wrong';

    if (error.status === 500) {
        //this is accessing the data from the thrown error in eventpage
        //and accessing the message property it has
        message = JSON.parse(error.data).message 
    }

    if (error.status === 404) {
        title = 'Path not found'
        message = 'Could not find resource or page'
    }
    return (
        <>
            <MainNavigation/>
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    ) 
}
export default ErrorPage;