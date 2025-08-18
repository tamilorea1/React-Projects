//imported createdSlice to use in all components
import { createSlice } from '@reduxjs/toolkit'

//these are my intialstates 
//They are similar to the argument in useState
//Ex: useState(false), intially false
const cartSliceState = { cartIsVisibile: false, notification: null}

//these are my reducers
//They allow us to update the state
//Example: toggle cart visibility
//Another example: show notification
//In the toggle function, we simply flip the boolean value
//this allows us to hide & show the cart.

//In the showNotification function, we set the notification state to an object
//This object contains the status, title, and message of the notification
const uiSlice = createSlice({
    name: 'ui',
    initialState: cartSliceState,
    reducers: {

        toggle(state) {
            state.cartIsVisibile = !state.cartIsVisibile
        } ,

        showNotification(state, action){
            state.notification = { 
                status : action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            }
        }
    }
})

export const uiActions = uiSlice.actions

export default uiSlice;