import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthForm from './LoginForm';
import { useUser } from '../contexts/UserContext';

const Navbar = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useUser();

  const handleLogin = () => {
    setAuthMode('login');
    setShowAuthForm(true);
  };

  const handleSignup = () => {
    setAuthMode('signup');
    setShowAuthForm(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCloseAuthForm = () => {
    setShowAuthForm(false);
  };

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  const goTo = (path) => {
    navigate(path);
    setSideMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'My Investments', path: '/investments' },
    { name: 'Explore', path: '/explore' },
    { name: 'Comparison Tool', path: '/compare' },
    { name: 'Terms & Conditions', path: '/terms' },
  ];

  return (
    <>
      <nav className="bg-black py-4 px-6 flex justify-between items-center border-b border-gray-800">
        <button className="text-white" onClick={toggleSideMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex gap-2">
          {user ? (
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md">
              Log out
            </button>
          ) : (
            <>
              <button onClick={handleLogin} className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md">
                Log in
              </button>
              <button onClick={handleSignup} className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md">
                Sign up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Side Menu */}
      <div className={`fixed top-0 left-0 w-64 h-full bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-40 ${sideMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-gray-800 flex items-center">
          <span className="text-xl font-semibold">{user ? user.name : "Guest User"}</span>
          <button onClick={toggleSideMenu} className="ml-auto text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="py-4">
          <div onClick={() => goTo('/profile')} className={`px-4 py-2 hover:bg-gray-800 cursor-pointer ${isActive('/profile') ? 'bg-green-600 text-white flex justify-between' : ''}`}>
            <span>My Profile</span>
            {isActive('/profile') && (
              <svg className="w-4 h-4 text-white ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>

          {menuItems.map(({ name, path }) => (
            <div key={path} onClick={() => goTo(path)} className={`px-4 py-2 hover:bg-gray-800 cursor-pointer flex justify-between items-center ${isActive(path) ? 'bg-green-600 text-white' : ''}`}>
              <span>{name}</span>
              {isActive(path) && (
                <svg className="w-4 h-4 text-white ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}

          {user && (
            <div onClick={handleLogout} className="px-4 py-2 hover:bg-gray-800 cursor-pointer mt-4 text-red-400">
              <span>Logout</span>
            </div>
          )}
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
