import React from 'react';

const ActionButtons = () => {
  const handleBuy = () => {
    console.log('Buy action triggered');
    // Integrate with Angel One Smart API for buy action
  };

  const handleSell = () => {
    console.log('Sell action triggered');
    // Integrate with Angel One Smart API for sell action
  };

  const handleCompare = () => {
    console.log('Compare action triggered');
    // Implement comparison functionality
  };

  const handleViewCode = () => {
    console.log('View code action triggered');
    // Implement code view functionality
  };

  return (
    <div className="flex justify-between mt-2">
      <div className="flex gap-2">
        <button 
          onClick={handleBuy}
          className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-8 rounded-full"
        >
          BUY
        </button>
        <button 
          onClick={handleSell}
          className="bg-red-500 hover:bg-red-600 text-black font-bold py-2 px-8 rounded-full"
        >
          SELL
        </button>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={handleViewCode}
          className="border border-gray-600 bg-transparent hover:bg-gray-800 text-white py-2 px-4 rounded-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <button 
          onClick={handleCompare}
          className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
        >
          Compare
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;