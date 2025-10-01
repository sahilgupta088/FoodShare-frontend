import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { HandHeart, LogOut, Menu, X, PlusCircle, User } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  const guestLinks = (
    <>
      <Link to="/login" className="hover:text-green-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Log In</Link>
      <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors shadow-md">
        Sign Up
      </Link>
    </>
  );

  // --- MODIFICATION ---
  // We add a check to ensure 'user' exists before creating the authenticated links.
  const authLinks = user && (
    <>
      <span className={`capitalize text-sm font-bold px-3 py-1 rounded-full ${
         user.role === 'donor' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
      }`}>
         {user.role}
      </span>

      {user.role === 'donor' && (
        <Link to="/create-donation" className="bg-green-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors shadow-md flex items-center gap-2">
            <PlusCircle size={18} />
            Post Donation
        </Link>
      )}
      
      <Link to="/donations" className="font-semibold hover:text-green-600 transition-colors">
        View Map
      </Link>

      <Link to="/profile" className="font-semibold hover:text-green-600 transition-colors flex items-center gap-1">
        <User size={18} />
        Profile
      </Link>
      
      <button onClick={onLogout} className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-gray-300 transition-colors">
        <LogOut size={18} />
        Logout
      </button>
    </>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-600 flex items-center gap-2">
          <HandHeart />
          FoodShare
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          {user ? authLinks : guestLinks}
        </nav>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white py-4">
          <nav className="flex flex-col items-center space-y-4">
            {user ? authLinks : guestLinks}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
