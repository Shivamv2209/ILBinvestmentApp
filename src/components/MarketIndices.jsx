import React, { useEffect, useState } from 'react';

const MarketIndices = () => {
  const [indices, setIndices] = useState([
    { id: 'nifty', name: 'Nifty 50', value: '22,904.45', change: -1.49, color: 'text-red-500' },
    { id: 'sensex', name: 'Sensex', value: '75,364.69', change: -1.22, color: 'text-red-500' },
    { id: 'sp500', name: 'S&P 500', value: '5,074.09', change: -0.97, color: 'text-red-500' },
    { id: 'nasdaq', name: 'Nasdaq', value: '17,397.7', change: -0.85, color: 'text-red-500' }
  ]);

  // Fetch market indices data from Angel One Smart API
  useEffect(() => {
    const fetchIndicesData = async () => {
      try {
        // Here you would integrate with Angel One Smart API
        // const response = await angelOneApi.getMarketIndices();
        // setIndices(response.data);
        
        // This is just placeholder logic for demo
        console.log('Fetching market indices data...');
      } catch (error) {
        console.error('Error fetching market indices:', error);
      }
    };

    fetchIndicesData();
    // Set up periodic refresh (e.g., every minute)
    const intervalId = setInterval(fetchIndicesData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex overflow-x-auto gap-2 pb-4">
      {indices.map((index) => (
        <div key={index.id} className="flex-none bg-gray-800 rounded-lg p-3 min-w-32">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index.id === 'nifty' ? 'bg-blue-900' : 
              index.id === 'sensex' ? 'bg-blue-600' : 
              index.id === 'sp500' ? 'bg-red-600' : 
              'bg-blue-400'
            }`}>
              <span className="text-xs font-bold">
                {index.id === 'nifty' ? '50' : 
                 index.id === 'sensex' ? 'S' : 
                 index.id === 'sp500' ? '500' : 
                 '100'}
              </span>
            </div>
            <div>
              <div className="text-xs text-gray-400">{index.name}</div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{index.value}</span>
                <span className={index.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {index.change >= 0 ? '+' : ''}{index.change}%
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketIndices;