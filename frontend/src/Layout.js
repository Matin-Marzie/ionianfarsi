import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar';

function Layout() {
  return (
    <div className="app-layout">
      <NavigationBar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
