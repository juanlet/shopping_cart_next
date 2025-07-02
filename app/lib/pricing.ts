import { CartItem, Product } from './types';

const VIP_DISCOUNT_RATE = 0.15;

/**
 * Calculates the total price with the "Get 3 for the Price of 2" promotion.
 * The lowest-priced items are discounted first.
 */
export function calculate3For2(items: CartItem[]): number {
  const allItemsExpanded: Product[] = items.flatMap(item => 
    Array(item.quantity).fill({ id: item.id, name: item.name, price: item.price })
  );

  const totalItems = allItemsExpanded.length;
  if (totalItems < 3) {
    return allItemsExpanded.reduce((sum, item) => sum + item.price, 0);
  }

  // Sort all individual items by price to find the cheapest ones
  allItemsExpanded.sort((a, b) => a.price - b.price);

  const freeItemsCount = Math.floor(totalItems / 3);
  const totalOriginalPrice = allItemsExpanded.reduce((sum, item) => sum + item.price, 0);
  
  // The discount is the sum of the prices of the cheapest items
  let discountAmount = 0;
  for (let i = 0; i < freeItemsCount; i++) {
    discountAmount += allItemsExpanded[i].price;
  }
  
  return totalOriginalPrice - discountAmount;
}

/**
 * Calculates the total price with the flat 15% VIP discount.
 */
export function calculateVipDiscount(items: CartItem[]): number {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return subtotal * (1 - VIP_DISCOUNT_RATE);
}