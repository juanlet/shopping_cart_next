import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '@/app/lib/types';
import { RootState } from './store'; 

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const productToAdd = action.payload;
      const existingItem = state.items.find(item => item.id === productToAdd.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...productToAdd, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => { // Payload is productId
      const productIdToRemove = action.payload;
      const existingItem = state.items.find(item => item.id === productIdToRemove);
      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
          state.items = state.items.filter(item => item.id !== productIdToRemove);
        }
      }
    },
    clearCart: (state) => {
        state.items = [];
    }
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

// Selector to get cart items from the state
export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;