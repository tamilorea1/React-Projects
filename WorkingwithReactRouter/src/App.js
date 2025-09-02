import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from './components/Home';
import ProductsPage from './components/Products';
import RootLayout from './components/Root';
import ErrorPage from './components/Error';

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
const router = createBrowserRouter([
    {path: '/', 
      element: <RootLayout/>,
      errorElement: <ErrorPage/>,
      children:[
        {path: '/', element: <HomePage/>},
        {path: '/products', element: <ProductsPage/>}
      ]
    },
  ]
)


//We import RouterProvider, since this will allow us to call our router constant that redirects us to another page (component)

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
