// ActionButtons.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActionButtons = ({ onBuyClick, onSellClick }) => {
  const navigate = useNavigate();

  const handleCompareClick = () => {
    navigate('/compare');
  };

  return (
    <div className="flex space-x-4 justify-center mt-4">
      <button
        onClick={onBuyClick}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
      >
        Buy
      </button>
      <button
        onClick={onSellClick}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
      >
        Sell
      </button>
      <button
        onClick={handleCompareClick}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
      >
        Compare
      </button>
    </div>
  );
};

export default ActionButtons;
