import React, { useEffect, useState } from 'react';
import StockCard from './StockCard';

const TopStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopStocks = async () => {
      try {
        setLoading(true);
        // Actual API call would be here
        // const response = await angelOneApi.getTopStocks();
        // setStocks(response.data);
        
        // Using mock data for demonstration
        const mockStocks = [
          { id: 1, name: 'Name', price: 234567, changePercent: -1.2, currency: 'Rs.' },
          { id: 2, name: 'Name', price: 234567, changePercent: 1.2, currency: 'Rs.' },
          { id: 3, name: 'Name', price: 234567, changePercent: 1.2, currency: 'Rs.' },
          { id: 4, name: 'Name', price: 234567, changePercent: -1.2, currency: 'Rs.' },
          { id: 5, name: 'Name', price: 234567, changePercent: 1.2, currency: 'Rs.' },
          { id: 6, name: 'Name', price: 234567, changePercent: 1.2, currency: 'Rs.' },
        ];
        
        setStocks(mockStocks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching top stocks:', error);
        setLoading(false);
      }
    };

    fetchTopStocks();
    // Set up periodic refresh (e.g., every minute)
    const intervalId = setInterval(fetchTopStocks, 60000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading top stocks...</div>;
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Top Stocks for you</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {stocks.map((stock) => (
          <StockCard key={stock.id} stock={stock} />
        ))}
      </div>
    </div>
  );
};

export default TopStocks;