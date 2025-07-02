/**
 * @jest-environment node
 */

import { POST } from './route';
import { NextRequest } from 'next/server';

// Mock the request's `json` function
const mockRequest = (body: any) => {
  return {
    json: async () => body,
  } as NextRequest;
};

describe('API Route: /api/cart/calculate', () => {

    it('should correctly calculate the total for a common user', async () => {
        const cart = {
            items: [{ id: '1', name: 'T-shirt', price: 35.99, quantity: 3 }],
            userType: 'common',
        };
        
        const request = mockRequest(cart);
        const response = await POST(request);
        const data = await response.json();

        expect(data.finalTotal).toBeCloseTo(35.99 * 2);
        expect(data.appliedPromotion).toBe('3 for 2');
        });
  it('should recommend "3 for 2" for a VIP customer if it is cheaper (Scenario 3)', async () => {
    const cart = {
      items: [{ id: '3', name: 'Dress', price: 80.75, quantity: 3 }],
      userType: 'vip',
    };
    
    const request = mockRequest(cart);
    const response = await POST(request);
    const data = await response.json();

    const total3x2 = 80.75 * 2;
    const totalVip = (80.75 * 3) * 0.85;

    expect(data.finalTotal).toBeCloseTo(total3x2);
    expect(data.finalTotal).toBeLessThan(totalVip); // Explicitly check it's the better deal
    expect(data.appliedPromotion).toBe('3 for 2');
    expect(data.recommendation).toContain(`is cheaper than the 15% VIP`);
  });

  it('should recommend "VIP Discount" for a VIP customer if it is cheaper', async () => {
    const cart = {
      items: [{ id: '1', name: 'T-shirt', price: 35.99, quantity: 2 }], 
      userType: 'vip',
    };

    const request = mockRequest(cart);
    const response = await POST(request);
    const data = await response.json();

    const totalVip = (35.99 * 2) * 0.85;

    expect(data.finalTotal).toBeCloseTo(totalVip);
    expect(data.appliedPromotion).toBe('VIP Discount');
  });
});