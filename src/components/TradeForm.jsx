import React, { useState } from 'react';
import { useApi } from '../contexts/ApiContext';

const TradeForm = ({ action, symbol = '', onClose }) => {
  const [quantity, setQuantity] = useState('1');
  const [price, setPrice] = useState('');
  const [priceType, setPriceType] = useState('LIMIT');
  const [selectedSymbol, setSelectedSymbol] = useState(symbol);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSymbolResults, setShowSymbolResults] = useState(false);
  
  const { buyStock, sellStock, loading, error, marketIndices } = useApi();

  // Mock search results for simplicity
  const searchResults = [
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', exchange: 'NSE' },
    { symbol: 'TCS', name: 'Tata Consultancy Services Ltd', exchange: 'NSE' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', exchange: 'NSE' },
    { symbol: 'INFY', name: 'Infosys Ltd', exchange: 'NSE' },
  ].filter(item => 
    item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const numQuantity = parseInt(quantity, 10);
    const numPrice = parseFloat(price);
    
    if (isNaN(numQuantity) || numQuantity <= 0) {
      alert('Please enter a valid quantity');
      return;
    }
    
    if (priceType === 'LIMIT' && (isNaN(numPrice) || numPrice <= 0)) {
      alert('Please enter a valid price');
      return;
    }
    
    const success = action === 'BUY'
      ? await buyStock(selectedSymbol, numQuantity, numPrice)
      : await sellStock(selectedSymbol, numQuantity, numPrice);
    
    if (success) {
      onClose();
    }
  };

  const handleSymbolSelect = (symbol) => {
    setSelectedSymbol(symbol);
    setShowSymbolResults(false);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {action === 'BUY' ? 'Buy Stock' : 'Sell Stock'}
      </h2>
      
      {error && (
        <div className="bg-red-900 bg-opacity-50 text-red-200 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <label htmlFor="symbol" className="block text-sm font-medium mb-1">
            Symbol
          </label>
          <input
            type="text"
            id="symbol"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSymbolResults(true);
            }}
            placeholder={selectedSymbol || "Search for symbol"}
            className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
            required
            disabled={loading}
          />
          
          {showSymbolResults && searchQuery && (
            <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded shadow-lg max-h-60 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <div
                    key={result.symbol}
                    className="p-2 hover:bg-gray-600 cursor-pointer"
                    onClick={() => handleSymbolSelect(result.symbol)}
                  >
                    <div className="font-medium">{result.symbol}</div>
                    <div className="text-sm text-gray-400">{result.name}</div>
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-400">No results found</div>
              )}
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="priceType" className="block text-sm font-medium mb-1">
            Price Type
          </label>
          <select
            id="priceType"
            value={priceType}
            onChange={(e) => setPriceType(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
            disabled={loading}
          >
            <option value="LIMIT">Limit</option>
            <option value="MARKET">Market</option>
          </select>
        </div>
        
        {priceType === 'LIMIT' && (
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="0.01"
              className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
              required
              disabled={loading}
            />
          </div>
        )}
        
        <div className="mb-6">
          <label htmlFor="quantity" className="block text-sm font-medium mb-1">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            step="1"
            className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
            required
            disabled={loading}
          />
        </div>
        
        <button
          type="submit"
          className={`w-full font-medium py-2 px-4 rounded ${
            action === 'BUY'
              ? 'bg-green-500 hover:bg-green-600 text-black'
              : 'bg-red-500 hover:bg-red-600 text-black'
          }`}
          disabled={loading}
        >
          {loading ? 'Processing...' : action === 'BUY' ? 'Buy' : 'Sell'}
        </button>
      </form>
    </div>
  );
};

export default TradeForm;