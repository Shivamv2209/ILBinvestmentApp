import React from 'react';
import StockCard from './StockCard';

const PortfolioSection = ({ title, items }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <StockCard key={item.id} stock={item} />
        ))}
      </div>
    </div>
  );
};

export default PortfolioSection;