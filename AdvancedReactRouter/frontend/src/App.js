// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from './components/pages/HomePage';
import EventPages, {loader as eventsLoader} from './components/pages/EventPage';
import EventDetailPage, {loader as detailsLoader} from './components/pages/EventDetailPage';
import NewEventPage from './components/pages/NewEventPage';
import EditEventPage from './components/pages/EditEventPage';
import RootLayout from './components/pages/Root';
import EventRootLayout from './components/pages/EventsRoot';
import ErrorPage from './components/pages/Error';



//adding loader property
//fetches data before a component renders

//instead of fetching inside my EventsPages component,
//the loader fetches the data first, then renders the component


//can't get the loaded data if its on a higher level than the fetch
//so our rootlayout component cant access the loaded data since its higher

const router = createBrowserRouter([
  {path: '/',
    element:<RootLayout/>,
    errorElement: <ErrorPage/> ,
    children:[
      {index: true, element: <HomePage/>},
      {path: '/events',
        element: <EventRootLayout/>,
        children: [
          {index: true, 
            element:<EventPages/>,
            loader: eventsLoader
          },
          {path: '/events/:eventId',
             element: <EventDetailPage/>,
            loader: detailsLoader
            },
          {path: '/events/new', element: <NewEventPage/>},
          {path: '/events/:eventId/edit', element: <EditEventPage/>}
        ]
      }
      
    ]
  },
  
])

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
