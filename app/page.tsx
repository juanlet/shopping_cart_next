'use client';

import { useState } from 'react';
import { ProductList } from './components/ProductList';
import { ShoppingCart } from './components/ShoppingCart';
import { UserTypeSelector } from './components/UserTypeSelector';
import { UserType } from './lib/types';

export default function HomePage() {
  const [userType, setUserType] = useState<UserType>('common');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT COLUMN: Cart and User Selector */}
      <div className="lg:col-span-1 space-y-6">
        <UserTypeSelector userType={userType} setUserType={setUserType} />
        <ShoppingCart userType={userType} />
      </div>

      {/* RIGHT COLUMN: Product List */}
      <div className="lg:col-span-2">
        <ProductList />
      </div>
    </div>
  );
}