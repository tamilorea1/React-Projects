
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {currencyFormatter} from '../util/formatting'
import Button from './UI/Button'
import { useContext } from 'react'
import CartContext from '../store/CartContext'

export default function Meals() {

    const [meals, setMeals] = useState([])
    const [errors, setErrors] = useState(null)

    useEffect (() => {
        const fetchMeals = async () => {
            try {
                const response = await fetch('http://localhost:3000/meals')
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const mealsData = await response.json()
                setMeals(mealsData)
                setErrors(null)
            } 
            catch (error) {
                setErrors(error.message)
            }
        }
        fetchMeals()
    }, [])

    const cartCtx  = useContext(CartContext)
    function handleAddMealToCart() {
        cartCtx.addItem(meals)
    }

  return (
    <div id='meals'>
        {/* {errors && <p>No meals</p>} */}
        
        {meals.length > 0 && (
            meals.map(mealItem => (
                <li key={mealItem.id} className='meal-item'>
                    <article>
                        <img src={`http://localhost:3000/${mealItem.image}`} alt={mealItem.name} />

                        <div>
                            <h3>{mealItem.name}</h3>
                            <p className='meal-item-price'>{currencyFormatter.format(mealItem.price)}</p>
                            <p className='meal-item-description'>{mealItem.description}</p>
                        </div>
                        
                        <p className='meal-item-actions '>
                            <Button onClick={handleAddMealToCart}>Add to Cart</Button>
                        </p>

                    </article>
                    

                </li>
            ))
        )}
        
    </div>
  )
}
