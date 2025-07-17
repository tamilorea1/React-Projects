
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const BASE_URL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news'
export default function NbaNews() {
    const [newsData, setNewsData] = useState(null)

    const [errors, setErrors] = useState(null)

    useEffect(() => {
        const fetchNewsData = async () => {

            try {
                const response = await fetch(`${BASE_URL}`)

                if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
                }

                const retrievedData = await response.json()

                setNewsData(retrievedData)
                setErrors(null)
            } catch (error) {
                setErrors(error.message)
            }
            
            
            // console.log(retrievedData)
        }

        fetchNewsData()
    }, [])

  return (
    <div>
        <ol>
            {errors ? <p>{errors}</p> :
            newsData ? newsData.articles.map((Item) => (
                <li key={Item.id}>
                    <h2>{Item.headline}</h2>
                    <img src={Item.images[0].url} alt="" />
                    <p><strong>{Item.description}</strong></p>
                </li>
            )) : <p>Loading</p>}
        </ol>
    </div>
  )
}
