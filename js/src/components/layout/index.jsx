import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import useUserStore from '@zustand/store';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen duration-500 ease-in-out dark:bg-gray-700 dark:text-gray-200 transition-color">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
