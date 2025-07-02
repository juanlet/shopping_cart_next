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

const mockErrorRequest = () => {
    return {
      json: async () => { throw new Error('Bad JSON'); },
    } as unknown as NextRequest;;
  }
  

describe('API Route: /api/cart/calculate', () => {

    it('should return a total of 0 for an empty cart', async () => {
        const request = mockRequest({ items: [], userType: 'common' });
        const response = await POST(request);
        const data = await response.json();
        
        expect(data.finalTotal).toBe(0);
        expect(data.appliedPromotion).toBe('None');
      });
    
      it('should return a 400 error for an invalid user type', async () => {
        const cart = {
          items: [{ id: '1', name: 'T-shirt', price: 35.99, quantity: 1 }],
          userType: 'invalid_user',
        };
        const request = mockRequest(cart);
        const response = await POST(request);
        
        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data.error).toBe('Invalid user type');
      });
    
      it('should return a 500 error if request parsing fails', async () => {
        const request = mockErrorRequest();
        const response = await POST(request);
    
        expect(response.status).toBe(500);
        const data = await response.json();
        expect(data.error).toBe('Internal Server Error');
      });

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

  it('should handle a common user with 4 mixed items (Scenario 2)', async () => {
    const cart = {
      items: [
        { id: '1', name: 'T-shirt', price: 35.99, quantity: 2 },
        { id: '2', name: 'Jeans', price: 65.50, quantity: 2 },
      ],
      userType: 'common',
    };
    const request = mockRequest(cart);
    const response = await POST(request);
    const data = await response.json();

    // Pays for 1 T-shirt + 2 Jeans. One T-shirt is free.
    const expectedTotal = 35.99 + (65.50 * 2);

    expect(data.finalTotal).toBeCloseTo(expectedTotal); // Expected: 166.99 (not 137.49 as in the prompt, there's a small error there)
    expect(data.appliedPromotion).toBe('3 for 2');
});

it('should handle a VIP user with 4 mixed items (Scenario 4)', async () => {
    const cart = {
        items: [
          { id: '2', name: 'Jeans', price: 65.50, quantity: 2 },
          { id: '3', name: 'Dress', price: 80.75, quantity: 2 },
        ],
        userType: 'vip',
    };
    const request = mockRequest(cart);
    const response = await POST(request);
    const data = await response.json();

    // 3 for 2 deal: pays for 1 Jeans + 2 Dresses. One Jeans is free.
    const expectedTotal3For2 = 65.50 + (80.75 * 2); // 227.00

    expect(data.finalTotal).toBeCloseTo(expectedTotal3For2);
    expect(data.appliedPromotion).toBe('3 for 2');
    expect(data.recommendation).toContain('is cheaper than the 15% VIP');
});

it('should handle a VIP user with 5 mixed items (Scenario 5)', async () => {
    const cart = {
        items: [
          { id: '1', name: 'T-shirt', price: 35.99, quantity: 4 },
          { id: '2', name: 'Jeans', price: 65.50, quantity: 1 },
        ],
        userType: 'vip',
    };
    const request = mockRequest(cart);
    const response = await POST(request);
    const data = await response.json();

    // 3 for 2 deal: pays for 3 T-shirts + 1 Jeans. One T-shirt is free.
    const expectedTotal3For2 = (35.99 * 3) + 65.50; // 173.47

    expect(data.finalTotal).toBeCloseTo(expectedTotal3For2);
    expect(data.appliedPromotion).toBe('3 for 2');
});

});