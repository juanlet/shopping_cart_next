'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart, selectCartItems } from '@/app/store/cartSlice';
import { UserType, CalculationResult } from '@/app/lib/types';
import { Trash2, Info, LoaderCircle } from 'lucide-react'; // Import icons

interface Props {
  userType: UserType;
}

export function ShoppingCart({ userType }: Props) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [calculation, setCalculation] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const calculateTotal = async () => {
      if (cartItems.length === 0) {
        setCalculation(null);
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch('/api/cart/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: cartItems, userType }),
        });
        const data: CalculationResult = await response.json();
        setCalculation(data);
      } catch (error) {
        console.error('Failed to calculate total:', error);
      } finally {
        setIsLoading(false);
      }
    };
    calculateTotal();
  }, [cartItems, userType]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-primary">Your Cart</h2>
        {cartItems.length > 0 && (
          <button
            onClick={() => dispatch(clearCart())}
            className="flex items-center gap-2 text-sm text-destructive font-semibold hover:opacity-80 transition-opacity"
          >
            <Trash2 size={16} />
            Clear Cart
          </button>
        )}
      </div>
      {cartItems.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => dispatch(removeItem(item.id))}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          <div className="border-t pt-6 space-y-4">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${calculation?.originalTotal.toFixed(2) ?? '0.00'}</span>
            </div>
            <div className="flex justify-between text-green-600 font-medium">
              <span>Discount ({calculation?.appliedPromotion ?? 'None'})</span>
              <span>-${calculation?.totalDiscount.toFixed(2) ?? '0.00'}</span>
            </div>
            <div className="flex justify-between font-bold text-2xl mt-2 border-t pt-4 text-primary">
              <span>Total</span>
              <div className="flex items-center gap-2">
                {isLoading && <LoaderCircle size={20} className="animate-spin" />}
                <span>${calculation?.finalTotal.toFixed(2) ?? '0.00'}</span>
              </div>
            </div>
            {calculation?.recommendation && (
              <div className="flex items-start gap-3 text-sm text-blue-700 bg-blue-50 p-3 rounded-lg mt-4">
                <Info size={16} className="mt-0.5 flex-shrink-0" />
                <p>
                  <strong className="font-semibold">Best Deal Applied:</strong> {calculation.recommendation}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}