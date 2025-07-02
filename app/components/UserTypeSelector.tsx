'use client';

import { UserType } from "@/app/lib/types";
import { ShieldCheck, User } from "lucide-react";

interface Props {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

export function UserTypeSelector({ userType, setUserType }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="font-semibold text-lg mb-4 text-primary">Customer Type</h3>
      <div className="flex w-full bg-muted p-1 rounded-lg">
        <button
          onClick={() => setUserType('common')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-colors ${
            userType === 'common' ? 'bg-card shadow-sm' : 'hover:bg-card/50'
          }`}
        >
          <User size={16} />
          Common
        </button>
        <button
          onClick={() => setUserType('vip')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-colors ${
            userType === 'vip' ? 'bg-card shadow-sm' : 'hover:bg-card/50'
          }`}
        >
          <ShieldCheck size={16} />
          VIP
        </button>
      </div>
    </div>
  );
}