import React, { useState, useEffect, useRef } from 'react';
import { Plus, Check } from 'lucide-react';

const ExploreStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [watchlist, setWatchlist] = useState(new Set());

  const stockSymbols = [
    'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META',
    'TSLA', 'NVDA', 'JPM', 'V', 'JNJ', 'WMT', 'PG'
  ];

  const intervalRef = useRef(null);

  const fetchStockData = async () => {
    try {
      const promises = stockSymbols.map(symbol =>
        fetch(`http://localhost:3000/api/stock/${symbol}`)
          .then(res => res.json())
      );

      const results = await Promise.all(promises);

      const stockData = results.map((data, index) => ({
        symbol: stockSymbols[index],
        name: data.name || stockSymbols[index],
        price: parseFloat(data.price).toFixed(2),
        change: parseFloat(data.change).toFixed(2),
        inWatchlist: watchlist.has(stockSymbols[index])
      }));

      setStocks(stockData);
      setError(null);
    } catch (err) {
      console.error("Fetch error: ", err);
      setError("Failed to fetch stock data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();

    // Set interval to auto-refresh data every 60 seconds
    intervalRef.current = setInterval(fetchStockData, 60000);

    // Clear interval on unmount
    return () => clearInterval(intervalRef.current);
  }, []);

  const toggleWatchlist = (index) => {
    const updatedStocks = [...stocks];
    const stock = updatedStocks[index];
    stock.inWatchlist = !stock.inWatchlist;

    const newWatchlist = new Set(watchlist);
    if (stock.inWatchlist) {
      newWatchlist.add(stock.symbol);
    } else {
      newWatchlist.delete(stock.symbol);
    }

    setWatchlist(newWatchlist);
    setStocks(updatedStocks);
  };

  if (loading && stocks.length === 0) {
    return (
      <div className="bg-gray-900 text-white p-4 text-center">
        Loading stock data...
      </div>
    );
  }

  if (error && stocks.length === 0) {
    return (
      <div className="bg-gray-900 text-white p-4 text-center">
        {error}. Please check your backend server.
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white w-full rounded-lg shadow-md">
      {/* Header */}
      <div className="grid grid-cols-4 px-4 py-3 border-b border-gray-700 bg-gray-800 text-sm font-semibold text-gray-300">
        <div>Company</div>
        <div className="text-right">Price (USD)</div>
        <div className="text-center">Change</div>
        <div className="text-right">Watchlist</div>
      </div>

      {/* Scrollable list */}
      <div className="h-96 overflow-y-auto">
        {stocks.map((stock, index) => (
          <div
            key={stock.symbol}
            className="grid grid-cols-4 px-4 py-3 border-b border-gray-800 hover:bg-gray-800"
          >
            <div className="text-cyan-400">{stock.name}</div>
            <div className="text-right">{stock.price}</div>
            <div className={`text-center ${parseFloat(stock.change) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {parseFloat(stock.change) >= 0 ? `${stock.change}% ↑` : `${stock.change}% ↓`}
            </div>
            <div className="text-right">
              <button
                onClick={() => toggleWatchlist(index)}
                className="p-1 rounded-full"
              >
                {stock.inWatchlist ? (
                  <Check size={20} className="text-cyan-400" />
                ) : (
                  <Plus size={20} className="text-white" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreStocks;
