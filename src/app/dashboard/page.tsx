'use client';
import React, { Suspense, useEffect, useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import UsersPageAdmin from '@/components/UsersAdmin';
import AdminDashboard from '@/hooks/useAdminDashboard';
import CreateProducts from '@/components/ProductsAdmin';

function Dashboard() {
  const { handleItemClick, header, setDisplay, display, menu, open, setOpen } =
    AdminDashboard();
  const [state, setState] = useState(false);

  useEffect(() => {
    switch (header) {
      case 'Users':
        setDisplay(<UsersPageAdmin />);
        break;
      case 'Product':
        setDisplay(<CreateProducts />);
        break;
      default:
        setDisplay(<h1>Welcome to the dashboard</h1>);
        break;
    }
  }, [header]);

  return (
    <div className="w-full">
      <div className="h-screen  w-[100%]">
        <DashboardHeader pageName="dashboard" />
        <div className="flex flex-col  w-full">
          <div className="p-2 sm:p-0">{display}</div>
        </div>
      </div>
    </div>
  );
}

function Page() {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  );
}

export default Page;
