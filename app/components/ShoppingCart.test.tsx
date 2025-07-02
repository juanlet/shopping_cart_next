import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/app/store/cartSlice';
import { ShoppingCart } from './ShoppingCart';
import { CartItem } from '@/app/lib/types';

// Mock the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      finalTotal: 107.97,
      originalTotal: 119.97,
      totalDiscount: 12.00,
      appliedPromotion: 'VIP Discount'
    }),
  })
) as jest.Mock;

// Helper to render with a Redux provider and pre-filled state
const renderWithProviders = (initialCartState: CartItem[]) => {
  const store = configureStore({
    reducer: { cart: cartReducer },
    preloadedState: { cart: { items: initialCartState } },
  });
  return render(
    <Provider store={store}>
      <ShoppingCart userType="vip" />
    </Provider>
  );
};

describe('<ShoppingCart />', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should display an empty message when the cart is empty', () => {
    renderWithProviders([]);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it('should render items from the cart and call the API', async () => {
    const cartItems = [{ id: '1', name: 'T-shirt', price: 35.99, quantity: 1 }];
    renderWithProviders(cartItems);

    // Use `act` to wait for state updates from the API call
    await act(async () => {
      // Let the fetch mock resolve
    });
    
    expect(screen.getByText('T-shirt')).toBeInTheDocument();
    
    expect(fetch).toHaveBeenCalledTimes(1);
    
    expect(screen.getByText('$107.97')).toBeInTheDocument();
  });
});