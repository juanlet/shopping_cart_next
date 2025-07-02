'use client';

import { useDispatch } from 'react-redux';
import { Product } from '@/app/lib/types';
import { addItem } from '@/app/store/cartSlice';
import { ShoppingBag } from 'lucide-react';

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
      <h2 className="text-2xl font-semibold mb-4 text-primary">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
           <div
           key={product.id}
           className="bg-background rounded-lg border border-border overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
         >
           <div className="bg-secondary h-52 w-full flex items-center justify-center">
             <ShoppingBag className="h-12 w-12 text-border" strokeWidth={1}/>
           </div>

           <div className="p-4 flex flex-col flex-grow">
             <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
             <p className="text-base text-muted-foreground mb-4">${product.price.toFixed(2)}</p>

             <div className="mt-auto">
               <button
                 onClick={() => handleAddToCart(product)}
                 className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-md transition-colors duration-200 hover:bg-primary/90"
               >
                 <ShoppingBag size={18} />
                 Add to Cart
               </button>
             </div>
           </div>
         </div>
        ))}
      </div>
    </div>
  );
}