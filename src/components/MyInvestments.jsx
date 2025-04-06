import React from 'react';

const MyInvestments = () => {
  // Sample data for mutual funds and stocks
  const mutualFunds = [
    { id: 1, name: "Name", value: "Rs. 234567", growth: "1.2%", positive: true },
    { id: 2, name: "Name", value: "Rs. 234567", growth: "1.2%", positive: true },
    { id: 3, name: "Name", value: "Rs. 234567", growth: "1.2%", positive: true },
    { id: 4, name: "Name", value: "Rs. 234567", growth: "1.2%", positive: true },
  ];

  const stocks = [
    { id: 1, name: "Name", value: "Rs. 234567", growth: "1.2%", positive: true },
    { id: 2, name: "Name", value: "Rs. 234567", growth: "1.2%", positive: true },
    { id: 3, name: "Name", value: "Rs. 234567", growth: "1.2%", positive: true },
    { id: 4, name: "Name", value: "Rs. 234567", growth: "1.2%", positive: true },
  ];

  // Component for investment item (reused for both mutual funds and stocks)
  const InvestmentItem = ({ item }) => {
    return (
      <div className="flex items-center justify-between bg-gray-800 rounded-full p-2 mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-700 rounded-full mr-3"></div>
          <div>
            <div className="text-white">{item.name}</div>
            <div className="text-white">{item.value}</div>
          </div>
        </div>
        <div className={`text-lg ${item.positive ? 'text-green-500' : 'text-red-500'}`}>
          {item.growth} {item.positive ? '↑' : '↓'}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 p-6 w-full max-w-4xl mx-auto">
      <h1 className="text-white text-3xl font-bold text-center mb-8">My Investments</h1>
      
      <div className="flex">
        {/* Mutual Funds Column */}
        <div className="flex-1 pr-4 border-r border-gray-700">
          <h2 className="text-white text-xl mb-6 text-center">Mutual Funds</h2>
          <div>
            {mutualFunds.map(fund => (
              <InvestmentItem key={fund.id} item={fund} />
            ))}
          </div>
        </div>

        {/* Stocks Column */}
        <div className="flex-1 pl-4">
          <h2 className="text-white text-xl mb-6 text-center">Stocks</h2>
          <div>
            {stocks.map(stock => (
              <InvestmentItem key={stock.id} item={stock} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInvestments;