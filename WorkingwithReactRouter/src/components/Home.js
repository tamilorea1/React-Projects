import  {Link} from 'react-router-dom'

//Here we added the link feature from react router dom
//this acts as a <a> element which is a link that a user clicks on
//the 'to' property allows the page to be redirected to that path entered
function HomePage() {
    return (
    <>
        
        <h1>My Home Page</h1>
        <p>Go to <Link to='/products'> the list of products</Link> </p>
    </>)
}

export default HomePage;