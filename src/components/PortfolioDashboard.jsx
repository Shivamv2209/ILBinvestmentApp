import React from 'react';
import PortfolioSection from './PortfolioSection';

const PortfolioDashboard = () => {
  // Mock data for stocks and mutual funds
  const stocksData = [
    { id: 1, name: 'Name', price: 234567, changePercent: 1.2, currency: 'Rs.' },
    { id: 2, name: 'Name', price: 234567, changePercent: -1.2, currency: 'Rs.' },
    { id: 3, name: 'Name', price: 234567, changePercent: 1.2, currency: 'Rs.' },
  ];
  
  const mutualFundsData = [
    { id: 1, name: 'Name', price: 234567, changePercent: -1.2, currency: 'Rs.' },
    { id: 2, name: 'Name', price: 234567, changePercent: 1.2, currency: 'Rs.' },
    { id: 3, name: 'Name', price: 234567, changePercent: -1.2, currency: 'Rs.' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-2xl font-bold mb-2">My Dashboard</div>
      
      <PortfolioSection 
        title="Stocks Invested" 
        items={stocksData} 
      />
      
      <PortfolioSection 
        title="Mutual Funds" 
        items={mutualFundsData} 
      />
    </div>
  );
};

export default PortfolioDashboard;