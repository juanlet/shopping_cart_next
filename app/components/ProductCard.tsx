import { Product } from '@/app/lib/types';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

      <div className="h-56 w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <ShoppingBag className="h-12 w-12 text-border" strokeWidth={1} />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
        <p className="text-base text-muted-foreground mb-4">${product.price.toFixed(2)}</p>

        <div className="mt-auto">
          <button
            onClick={() => onAddToCart(product)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-bold rounded-md transition-transform duration-200 hover:scale-105"
          >
            <ShoppingBag size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}