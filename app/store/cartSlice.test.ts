import cartReducer, { addItem, removeItem, clearCart } from './cartSlice';
import { Product } from '@/app/lib/types';

const tShirt: Product = { id: '1', name: 'T-shirt', price: 35.99 };
const initialState = { items: [] };

describe('cartSlice reducer', () => {
  it('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual({ items: [] });
  });

  it('should handle addItem to an empty cart', () => {
    const state = cartReducer(initialState, addItem(tShirt));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual({ ...tShirt, quantity: 1 });
  });

  it('should increment quantity if addItem is called for an existing item', () => {
    const currentState = { items: [{ ...tShirt, quantity: 1 }] };
    const state = cartReducer(currentState, addItem(tShirt));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('should handle removeItem and decrement quantity', () => {
    const currentState = { items: [{ ...tShirt, quantity: 2 }] };
    const state = cartReducer(currentState, removeItem(tShirt.id));
    expect(state.items[0].quantity).toBe(1);
  });

  it('should remove the item if its quantity becomes zero', () => {
    const currentState = { items: [{ ...tShirt, quantity: 1 }] };
    const state = cartReducer(currentState, removeItem(tShirt.id));
    expect(state.items).toHaveLength(0);
  });

  it('should handle clearCart', () => {
    const currentState = { items: [{ ...tShirt, quantity: 3 }] };
    const state = cartReducer(currentState, clearCart());
    expect(state.items).toHaveLength(0);
  });
});