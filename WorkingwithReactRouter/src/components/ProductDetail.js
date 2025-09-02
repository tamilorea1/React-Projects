import { useParams, Link } from "react-router-dom";

//Currently when we encode something into our url
//it will show the text we encoded

//it is using .productId because that's the name set in app.js
//if you change the name there, you have to change the name here

//adding the relative property to the back link
// gives us the ability to go back one level in our file path
function ProductDetailsPage() {
    const params = useParams()
    return (
        <>
            <h1>Details 4 products</h1>
            <p>{params.productId}</p>
            <p><Link to='..' relative="path"> Back</Link></p>
        </>
    )
}

export default ProductDetailsPage;