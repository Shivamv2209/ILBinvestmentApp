import React, { useState } from 'react';
import AuthForm from './LoginForm';

const Navbar = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);

  const handleLogin = () => {
    setShowAuthForm(true);
  };

  const handleCloseAuthForm = () => {
    setShowAuthForm(false);
  };

  return (
    <>
      <nav className="bg-black py-4 px-6 flex justify-between items-center border-b border-gray-800">
        <div>
          <button className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className="flex gap-2">
          <button onClick={handleLogin} className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md">
            Log in
          </button>
          <button onClick={handleLogin} className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md">
            Sign up
          </button>
        </div>
      </nav>

      {showAuthForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 relative">
            <button 
              onClick={handleCloseAuthForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <AuthForm onClose={handleCloseAuthForm} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;