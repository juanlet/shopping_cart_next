'use client';

import { useDispatch } from 'react-redux';
import { Product } from '@/app/lib/types';
import { addItem } from '@/app/store/cartSlice';
import { ProductCard } from './ProductCard'; 

const products: Product[] = [
  { id: 't-shirt', name: 'T-shirt', price: 35.99 },
  { id: 'jeans', name: 'Jeans', price: 65.50 },
  { id: 'dress', name: 'Dress', price: 80.75 },
];

export function ProductList() {
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addItem(product));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-foreground">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}