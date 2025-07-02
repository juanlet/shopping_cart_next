export interface Product {
    id: string;
    name: string;
    price: number;
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }
  
  export type UserType = 'common' | 'vip';
  
  export interface CalculationResult {
    finalTotal: number;
    recommendation?: string;
    appliedPromotion: '3 for 2' | 'VIP Discount' | 'None';
    originalTotal: number;
    totalDiscount: number;
  }