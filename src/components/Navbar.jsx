import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 import useNavigate
import AuthForm from './LoginForm';

const Navbar = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const navigate = useNavigate(); // 👈 create navigate hook

  const handleLogin = () => {
    setAuthMode('login');
    setShowAuthForm(true);
  };

  const handleSignup = () => {
    setAuthMode('signup');
    setShowAuthForm(true);
  };

  const handleCloseAuthForm = () => {
    setShowAuthForm(false);
  };

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  const goToProfile = () => {
    navigate('/profile'); // 👈 navigate to profile
    setSideMenuOpen(false); // Close the menu
  };

  return (
    <>
      <nav className="bg-black py-4 px-6 flex justify-between items-center border-b border-gray-800">
        <div>
          <button className="text-white" onClick={toggleSideMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className="flex gap-2">
          <button onClick={handleLogin} className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md">
            Log in
          </button>
          <button onClick={handleSignup} className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md">
            Sign up
          </button>
        </div>
      </nav>

      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-40 ${
          sideMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-gray-800 flex items-center">
          <span className="text-xl font-semibold">User's Name</span>
          <button onClick={toggleSideMenu} className="ml-auto text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="py-4">
          <div onClick={goToProfile} className="px-4 py-2 hover:bg-gray-800 cursor-pointer">My Profile</div> {/* 👈 updated */}
          <div className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center">
            <span>Dashboard</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div className="px-4 py-2 hover:bg-gray-800 cursor-pointer">My Investments</div>
          <div className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Explore</div>
          <div className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Comparison Tool</div>
          <div className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Terms & Conditions</div>
        </div>
      </div>

      {sideMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={toggleSideMenu}></div>
      )}

      {showAuthForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 relative">
            <button onClick={handleCloseAuthForm} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <AuthForm initialMode={authMode} onClose={handleCloseAuthForm} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
