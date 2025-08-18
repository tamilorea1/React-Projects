import {configureStore} from '@reduxjs/toolkit'
import cartSlice from './cart-slice';
import uiSlice from './Ui-Slice'

const store = configureStore({
    reducer: {ui: uiSlice.reducer , cart: cartSlice.reducer}
})

export default store ;