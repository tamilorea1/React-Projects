import Places from './Places.jsx';
import { useEffect, useState } from 'react';
import Error from './Error.jsx';


export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {

    
    async function fetchPlaces() {
      setIsFetching(true)

      try {
        const response = await fetch('http://localhost:3000/places')
        const resData = await response.json()

      if (!response.ok) {
        throw new Error("Failed to fetch places");
        
      }

        setAvailablePlaces(resData.places)

      } catch (error) {
        setError({message: error.message || 'Could not fetch places'})
      }
      

      setIsFetching(false)

    }

    fetchPlaces();

  }, [])

  if (error) {
    return <Error title='An error occured!' message={error.message}/>
  }
 

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading = {isFetching}
      loadingText = 'Fetching place data...'
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
