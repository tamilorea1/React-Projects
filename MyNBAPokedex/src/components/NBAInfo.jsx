import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

export default function NBAInfo() {

    const [ballData, setBallData] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            
        const response = await fetch(' https://api.balldontlie.io/v1/teams', {
            headers: {
                'Authorization': '14afc5a1-3c6d-4271-ad16-3b38c4f5926a'
            }
            });

            const collectedData = await response.json()

            setBallData(collectedData)
            console.log(collectedData)
        }

       
        fetchData()
        
    }, [])
    

  return (
    <div>
        <ol>
            {ballData && ballData.data ? ballData.data.map((item) => {
                return <li key={item.id}>
                    <p>{item.full_name}  { item.abbreviation}</p>
                </li>
            }) : <p>Loading</p>}
        </ol>
    </div>
  )
}
