import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

const Navbar = () => {

  const {user,logout} = useContext(UserContext)

  return (
    <div>
      {/* Header */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">NewsApp</h1>

          {/* Desktop nav */}
          <nav className="hidden sm:flex space-x-6 text-gray-700 font-medium">
            <Link to={'/'} className="hover:text-blue-600 transition">
              Home
            </Link>
            <a href="#" className="hover:text-blue-600 transition">
              World
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              Technology
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              Sports
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              Entertainment
            </a>
            {user && user.isAdmin && <Link to={'/admindashboard'} className="hover:text-blue-600 transition">
              AdminDashboard
            </Link>}
          </nav>

          {/* Login Button */}
          <div>
            {!user ? <Link to={'/signin'} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Login
            </Link>
  : <buttton onClick={()=>{
    logout(),
    localStorage.removeItem("userdata")
  }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Logout
            </buttton>}
          </div>

        </div>

      </header>
    </div>
  );
};

export default Navbar;
