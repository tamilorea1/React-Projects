import { createContext } from "react";

//gave our context an initial value of an object, which has the key value pair of an empty array list assgined to items
export const CartContext = createContext({
    items: [],
    addItemsToCart: () => {},
    updateItemQuantity: () => {}
});