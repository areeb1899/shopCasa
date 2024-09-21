import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('cart')) ?? []


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemInCart = state.find(item => item.id === action.payload.id);
            if (itemInCart) {
                // If the item already exists in the cart, increase its quantity
                itemInCart.quantity += 1;
            } else {
                // If it's a new item, add it to the cart with a quantity of 1
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        deleteFromCart(state, action) {
            const itemInCart = state.find(item => item.id === action.payload.id);
            if (itemInCart && itemInCart.quantity > 1) {
                // Decrease quantity if more than 1
                itemInCart.quantity -= 1;
            } else {
                // Remove item if quantity is 1
                return state.filter((item) => item.id !== action.payload.id);
            }
        },
        clearCart: () => {
            return [];
        }
    }
})

export const { addToCart, deleteFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer;

