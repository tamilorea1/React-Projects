import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from './components/Home';
import ProductsPage from './components/Products';
import RootLayout from './components/Root';
import ErrorPage from './components/Error';
import ProductDetailsPage from './components/ProductDetail';

// exmaple of a url without path:
// https://example.com/

//example of a url with a path:
// https://example.com/path-name

//in the first example, after the last / is the path

//The element property directs the path to the component name
//so in our example below it will redirect to the Home component

//We added /prodcuts as a path
//so when i go to my url on my webpage
//add /products at the end
//and this should redirect me to the Products component


//for the element -> ProductDetailsPage,
//the colon before productId signifies it should be dynamic


//setting the index true means that
//if the parent route '/' is active
//then the element that has the index to true should be the default route
const router = createBrowserRouter([
    {path: '/', 
      element: <RootLayout/>,
      errorElement: <ErrorPage/>,
      children:[
        {index: true, element: <HomePage/>}, //path:'/'
        {path: '/products', element: <ProductsPage/>},
        {path: '/products/:productId', element:<ProductDetailsPage/>}
      ]
    },
  ]
)


//We import RouterProvider, since this will allow us to call our router constant that redirects us to another page (component)

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
