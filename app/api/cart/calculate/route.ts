import { NextResponse } from 'next/server';
import { CartItem, UserType } from '@/app/lib/types';
import { calculate3For2, calculateVipDiscount } from '@/app/lib/pricing';

export async function POST(request: Request) {
  try {
    const { items, userType }: { items: CartItem[]; userType: UserType } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({
        finalTotal: 0,
        appliedPromotion: 'None',
        originalTotal: 0,
        totalDiscount: 0,
      });
    }

    const originalTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (userType === 'common') {
      const finalTotal = calculate3For2(items);
      return NextResponse.json({
        finalTotal,
        appliedPromotion: '3 for 2',
        originalTotal,
        totalDiscount: originalTotal - finalTotal,
      });
    }

    // For VIP customers, calculate both and find the best deal
    if (userType === 'vip') {
      const totalWith3For2 = calculate3For2(items);
      const totalWithVipDiscount = calculateVipDiscount(items);

      if (totalWith3For2 < totalWithVipDiscount) {
        return NextResponse.json({
          finalTotal: totalWith3For2,
          appliedPromotion: '3 for 2',
          recommendation: `The 'Get 3 for 2' promotion ($${totalWith3For2.toFixed(2)}) is cheaper than the 15% VIP discount ($${totalWithVipDiscount.toFixed(2)}).`,
          originalTotal,
          totalDiscount: originalTotal - totalWith3For2,
        });
      } else {
        return NextResponse.json({
          finalTotal: totalWithVipDiscount,
          appliedPromotion: 'VIP Discount',
          recommendation: `The 15% VIP discount ($${totalWithVipDiscount.toFixed(2)}) is cheaper than the 'Get 3 for 2' promotion ($${totalWith3For2.toFixed(2)}).`,
          originalTotal,
          totalDiscount: originalTotal - totalWithVipDiscount,
        });
      }
    }

    return NextResponse.json({ error: 'Invalid user type' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}