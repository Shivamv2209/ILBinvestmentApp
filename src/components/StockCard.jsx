import React from 'react';

const StockCard = ({ stock }) => {
  const { name, price, changePercent, currency } = stock;
  const isPositive = changePercent >= 0;

  return (
    <div className="bg-gray-800 rounded-lg p-3 flex items-center gap-3">
      <div className="h-8 w-8 rounded-full bg-gray-700"></div>
      <div className="flex-grow">
        <div className="text-sm">{name}</div>
        <div className="flex justify-between items-center">
          <div className="font-medium">{currency} {price.toLocaleString()}</div>
          <div className={`${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {changePercent}% 
            {isPositive ? (
              <span className="inline-block ml-1">↑</span>
            ) : (
              <span className="inline-block ml-1">↓</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockCard;