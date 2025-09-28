 export async function fetchEvents({signal, searchTerm}) {

    //We give the fetchEvents a paramter 
    //this parameter is needed for when we want to use the FindEventSection

    let url = 'http://localhost:3000/events'

    //if there is a searchTerm
    //add a query at the end that includes the searchedTerm
    if (searchTerm) {
        url += '?search=' + searchTerm
    }
    //   setIsLoading(true);

    //this fetch function will be used to send a Http request
    //since useQuery cannot do so
      const response = await fetch(url, {signal: signal});

      if (!response.ok) {
        const error = new Error('An error occurred while fetching the events');
        error.code = response.status;
        error.info = await response.json();
        throw error;
      }

      const { events } = await response.json();

      return events;
    }