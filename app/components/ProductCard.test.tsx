import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import { Product } from '@/app/lib/types';

// Create a mock product for our test
const mockProduct: Product = {
  id: 'test-product',
  name: 'Test Product',
  price: 99.99,
};

describe('<ProductCard />', () => {
  it('should render product details and call onAddToCart when clicked', () => {
    // jest.fn() creates a mock function so we can check if it was called
    const mockOnAddToCart = jest.fn();

    render(
      <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
    );

    // 1. Check if the product details are displayed correctly
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Add to Cart/i });
    fireEvent.click(button);

    // 3. Assert that our mock function was called with the correct product
    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});