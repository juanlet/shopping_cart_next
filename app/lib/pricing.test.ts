import { calculate3For2, calculateVipDiscount } from './pricing';
import { CartItem } from './types';

// Mock products
const tShirt: CartItem = { id: '1', name: 'T-shirt', price: 35.99, quantity: 1 };
const jeans: CartItem = { id: '2', name: 'Jeans', price: 65.50, quantity: 1 };
const dress: CartItem = { id: '3', name: 'Dress', price: 80.75, quantity: 1 };

describe('Pricing Logic', () => {
  describe('calculate3For2', () => {
    it('should not apply any discount for fewer than 3 items', () => {
      const cart = [{ ...tShirt, quantity: 2 }];
      const total = 35.99 * 2;
      expect(calculate3For2(cart)).toBeCloseTo(total);
    });

    it('should apply the "3 for 2" discount for 3 identical items (Scenario 1)', () => {
      const cart = [{ ...tShirt, quantity: 3 }];
      const expectedTotal = 35.99 * 2;
      expect(calculate3For2(cart)).toBeCloseTo(expectedTotal);
    });

    it('should discount the cheapest item in a "4 for 3" scenario (Scenario 2)', () => {
      const cart = [
        { ...tShirt, quantity: 2 },
        { ...jeans, quantity: 2 },
      ];
      // Total is 2 T-shirts + 2 Jeans. The free item is 1 T-shirt.
      // Customer pays for: 1 T-shirt + 2 Jeans
      const expectedTotal = 35.99 * 1 + 65.50 * 2;
      expect(calculate3For2(cart)).toBeCloseTo(expectedTotal);
    });
    
    it('should apply the discount twice for 6 items ("6 for 4")', () => {
      const cart = [{ ...tShirt, quantity: 6 }];
      const expectedTotal = 35.99 * 4;
      expect(calculate3For2(cart)).toBeCloseTo(expectedTotal);
    });
  });

  describe('calculateVipDiscount', () => {
    it('should apply a 15% discount to the total', () => {
      const cart = [
        { ...jeans, quantity: 2 }, // 131.00
        { ...dress, quantity: 2 }, // 161.50
      ];
      const total = 131.00 + 161.50; // 292.50
      const expectedTotal = total * 0.85; // 248.625
      expect(calculateVipDiscount(cart)).toBeCloseTo(expectedTotal);
    });
  });
});