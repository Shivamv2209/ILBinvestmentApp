import React, { useEffect, useState } from 'react';

const MarketIndices = () => {
  const [indices, setIndices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchIndicesData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Yahoo Finance API via RapidAPI
        const API_KEY = '6f5093d5femsh92c9aab7bc3243ep1b4f2fjsnf2de0d81cdd2'; // Replace with your RapidAPI key
        
        // Stock/Index symbols - Yahoo Finance format
        const indexSymbols = [
          { id: 'nifty', symbol: '%5ENSEI', name: 'Nifty 50' },
          { id: 'sensex', symbol: '%5EBSESN', name: 'Sensex' },
          { id: 'sp500', symbol: '%5EGSPC', name: 'S&P 500' },
          { id: 'nasdaq', symbol: '%5EIXIC', name: 'Nasdaq' }
        ];
        
        // Use a single API call to get all symbols at once (more efficient)
        const symbolsString = indexSymbols.map(index => index.symbol).join(',');
        
        const response = await fetch(
          `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=${symbolsString}`,
          {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': API_KEY,
              'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
            }
          }
        );
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        const quotes = data.quoteResponse.result;
        
        if (!quotes || quotes.length === 0) {
          throw new Error('No data returned from API');
        }
        
        // Map API response to our indices format
        const updatedIndices = indexSymbols.map(indexInfo => {
          const quote = quotes.find(q => q.symbol === indexInfo.symbol.replace('%5E', '^'));
          
          if (!quote) {
            return {
              id: indexInfo.id,
              name: indexInfo.name,
              value: 'N/A',
              change: 0,
              color: 'text-gray-400',
              error: true
            };
          }
          
          return {
            id: indexInfo.id,
            name: indexInfo.name,
            value: quote.regularMarketPrice.toLocaleString(),
            change: parseFloat(quote.regularMarketChangePercent.toFixed(2)),
            color: quote.regularMarketChangePercent >= 0 ? 'text-green-500' : 'text-red-500',
            error: false
          };
        });
        
        setIndices(updatedIndices);
        setLastUpdated(new Date());
        console.log('Market indices updated:', updatedIndices);
      } catch (error) {
        console.error('Error fetching market indices:', error);
        setError('Failed to fetch market data: ' + error.message);
        
        // If this is the first load and we have no data yet, create empty placeholders
        if (indices.length === 0) {
          const placeholders = [
            { id: 'nifty', name: 'Nifty 50', value: '—', change: 0, color: 'text-gray-400', error: true },
            { id: 'sensex', name: 'Sensex', value: '—', change: 0, color: 'text-gray-400', error: true },
            { id: 'sp500', name: 'S&P 500', value: '—', change: 0, color: 'text-gray-400', error: true },
            { id: 'nasdaq', name: 'Nasdaq', value: '—', change: 0, color: 'text-gray-400', error: true }
          ];
          setIndices(placeholders);
        }
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchIndicesData();
    
    // Set up refresh (every 30 seconds)
    const intervalId = setInterval(fetchIndicesData, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Alternative API fetcher in case Yahoo Finance doesn't work
  const fetchAlternativeAPI = async () => {
    try {
      // This is just a placeholder for an alternative API implementation
      // You could implement Alphavantage, IEX Cloud, or another provider here
      setError('Attempting to use alternative data source...');
      // Implementation would go here
    } catch (error) {
      console.error('Alternative API also failed:', error);
      setError('All data sources failed. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col">
      {error && <div className="text-red-500 mb-2 text-xs">{error}</div>}
      
      <div className="flex overflow-x-auto gap-2 pb-4">
        {loading ? (
          <div className="flex-none bg-gray-800 rounded-lg p-3 min-w-32 flex items-center justify-center">
            <div className="animate-pulse flex space-x-2">
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        ) : indices.length === 0 ? (
          <div className="flex-none bg-gray-800 rounded-lg p-3 min-w-32">
            No data available
          </div>
        ) : (
          indices.map((index) => (
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
                    {index.error ? (
                      <span className="text-xs text-gray-400">N/A</span>
                    ) : (
                      <span className={index.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {index.change >= 0 ? '+' : ''}{index.change}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {lastUpdated && (
        <div className="text-xs text-gray-400 mt-1">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
      
      {error && !loading && (
        <button 
          onClick={fetchAlternativeAPI}
          className="text-xs text-blue-400 mt-2 underline cursor-pointer"
        >
          Try alternative data source
        </button>
      )}
    </div>
  );
};

export default MarketIndices;