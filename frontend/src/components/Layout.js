import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavigationBar from './NavigationBar';

function Layout() {
  const location = useLocation();

  // Hide navigation bar on routes:
  const hideNavRoutes = ['/home', '/login', '/register', '/learn/lesson/'];

  return (
    <div className="bg-bluesea max-w-screen-4xl m-auto h-[100dvh] flex flex-col-reverse md:flex-row">
      {/* Hide nav only on specific routes */}
      {!hideNavRoutes.some(route => location.pathname.startsWith(route)) && (
        <nav className='border-solid border-t-2 border-gray-500 md:w-4/12 min-w-[250px] md:max-w-[350px] md:p-4 md:border-t-0 md:border-r-2 md:border-black'>
          <NavigationBar />
        </nav>
      )}
      <main className="h-full overflow-y-scroll m-auto flex w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
  