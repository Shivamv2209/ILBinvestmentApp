import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '2d1dd24301204a66bdbedb4675c05ff8';

const StockComparison = () => {
  const [search1, setSearch1] = useState('');
  const [search2, setSearch2] = useState('');
  const [selectedStock1, setSelectedStock1] = useState(null);
  const [selectedStock2, setSelectedStock2] = useState(null);
  const [stockData, setStockData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchStockData = async (symbol) => {
    try {
      const res = await axios.get(`https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${API_KEY}`);
      return res.data;
    } catch (err) {
      console.error("Error fetching stock data:", err);
      return null;
    }
  };

  const handleCompare = async () => {
    if (!search1 || !search2) return;
    setLoading(true);

    const [data1, data2] = await Promise.all([
      fetchStockData(search1),
      fetchStockData(search2)
    ]);

    if (data1 && data2) {
      setSelectedStock1({ symbol: search1.toUpperCase(), ...data1 });
      setSelectedStock2({ symbol: search2.toUpperCase(), ...data2 });
    }

    setLoading(false);
  };

  const highlight = (val1, val2, type = 'higher') => {
    if (!val1 || !val2) return '';
    const n1 = parseFloat(val1);
    const n2 = parseFloat(val2);
    if (isNaN(n1) || isNaN(n2)) return '';
    return (type === 'higher' ? n1 > n2 : n1 < n2) ? 'text-green-400 font-bold' : '';
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">📊 Compare Stocks</h1>

      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
        <input
          type="text"
          placeholder="Enter Stock Symbol (e.g. AAPL)"
          className="p-3 rounded bg-gray-700 w-64 focus:outline-none"
          value={search1}
          onChange={(e) => setSearch1(e.target.value.toUpperCase())}
        />
        <input
          type="text"
          placeholder="Enter Stock Symbol (e.g. TSLA)"
          className="p-3 rounded bg-gray-700 w-64 focus:outline-none"
          value={search2}
          onChange={(e) => setSearch2(e.target.value.toUpperCase())}
        />
        <button
          onClick={handleCompare}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Compare
        </button>
      </div>

      {loading ? (
        <p className="text-center text-lg">Loading stock data...</p>
      ) : (
        selectedStock1 && selectedStock2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[selectedStock1, selectedStock2].map((stock, idx) => (
              <div key={idx} className="bg-gray-800 p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-2">{stock.symbol}</h2>
                <p className="text-sm text-gray-400 mb-4">{stock.name || 'Company'}</p>

                <div className="space-y-2">
                  <p>📈 Price: <span className={highlight(selectedStock1.close, selectedStock2.close)}>${stock.close}</span></p>
                  <p>📊 Change: <span className={highlight(selectedStock1.percent_change, selectedStock2.percent_change)}>{stock.percent_change}%</span></p>
                  <p>📍 High: <span className={highlight(selectedStock1.high, selectedStock2.high)}>${stock.high}</span></p>
                  <p>📉 Low: <span className={highlight(selectedStock1.low, selectedStock2.low, 'lower')}>${stock.low}</span></p>
                  <p>💰 PE Ratio: <span className={highlight(selectedStock1.pe_ratio, selectedStock2.pe_ratio)}>{stock.pe_ratio || 'N/A'}</span></p>
                  <p>🏢 Market Cap: <span className={highlight(selectedStock1.market_cap, selectedStock2.market_cap)}>{stock.market_cap || 'N/A'}</span></p>
                  <p>📘 ROE: <span className="text-gray-400">N/A</span></p>
                  <p>📗 ROCE: <span className="text-gray-400">N/A</span></p>
                  <p>📙 PEG Ratio: <span className="text-gray-400">N/A</span></p>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default StockComparison;
