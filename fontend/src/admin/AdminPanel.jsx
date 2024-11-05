import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './partials/Sidebar';
import { NavbarDashboard } from './partials/NavbarDashboard';

export const AdminPanel = () => {
  return (
    <div>
      <NavbarDashboard/>
      <Sidebar/>

      <main class="relative h-full lg:ml-64 sm:ml-64">
          <Outlet/>
      </main>
    </div>
  );
};
