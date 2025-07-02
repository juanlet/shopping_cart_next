import { render, screen, fireEvent } from '@testing-library/react';
import { ProductList } from './ProductList';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/app/store/cartSlice';

//  Redux store
const store = configureStore({ reducer: { cart: cartReducer } });

describe('<ProductList />', () => {
  it('should render the list of products and their buttons', () => {
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    // Verify the products are on screen
    expect(screen.getByText('T-shirt')).toBeInTheDocument();
    expect(screen.getByText('Jeans')).toBeInTheDocument();
    expect(screen.getByText('Dress')).toBeInTheDocument();

    // Verify there are 3 "Add to Cart" buttons
    const buttons = screen.getAllByRole('button', { name: /Add to Cart/i });
    expect(buttons).toHaveLength(3);
  });
});