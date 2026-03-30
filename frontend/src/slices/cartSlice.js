import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem(state, action) {
            const item = action.payload;
            const isItemExist = state.cartItems.find(i => i.product._id === item.product._id);
            if (!isItemExist) {
                state.cartItems.push(item);
            }
        },
        increaseCartItemQty(state, action) {
            const itemId = action.payload;
            const item = state.cartItems.find(i => i.product._id === itemId);
            if (item && item.product.stock > item.qty) {
                item.qty++;
            }
        },
        decreaseCartItemQty(state, action) {
            const itemId = action.payload;
            const item = state.cartItems.find(i => i.product._id === itemId);
            if (item && item.qty > 1) {
                item.qty--;
            }
        },
        removeItemFromCart(state, action) {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter(i => i.product._id !== itemId);
        },
        clearCart(state) {
            state.cartItems = [];
        }
    }
});

export const { addCartItem, increaseCartItemQty, decreaseCartItemQty, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
