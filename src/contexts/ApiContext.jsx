import React, { createContext, useState, useContext, useEffect } from 'react';
import angelOneApi from '../services/angelOneApi';

// Create context
const ApiContext = createContext();

// Provider component
export const ApiProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [marketIndices, setMarketIndices] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [mutualFunds, setMutualFunds] = useState([]);
  const [topStocks, setTopStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Login function
  const login = async (clientId, password, totp) => {
    try {
      setLoading(true);
      setError(null);
      const response = await angelOneApi.login(clientId, password, totp);
      setUserData(response.data);
      setIsLoggedIn(true);
      setLoading(false);
      return true;
    } catch (error) {
      setError('Login failed: ' + (error.message || 'Unknown error'));
      setLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };

  // Fetch market data
  const fetchMarketData = async () => {
    if (!isLoggedIn) return;
    
    try {
      setLoading(true);
      
      // Fetch indices data
      const indicesResponse = await angelOneApi.getMarketIndices();
      setMarketIndices(indicesResponse.data);
      
      // Fetch holdings
      const holdingsResponse = await angelOneApi.getHoldings();
      setHoldings(holdingsResponse.data);
      
      // Fetch mutual funds
      const mutualFundsResponse = await angelOneApi.getMutualFunds();
      setMutualFunds(mutualFundsResponse.data);
      
      // Fetch top stocks
      const topStocksResponse = await angelOneApi.getTopStocks();
      setTopStocks(topStocksResponse.data);
      
      setLoading(false);
    } catch (error) {
      setError('Error fetching market data: ' + (error.message || 'Unknown error'));
      setLoading(false);
    }
  };

  // Buy stock
  const buyStock = async (symbol, quantity, price) => {
    if (!isLoggedIn) return false;
    
    try {
      setLoading(true);
      await angelOneApi.placeBuyOrder(symbol, quantity, price);
      // Refresh holdings after order
      await fetchMarketData();
      setLoading(false);
      return true;
    } catch (error) {
      setError('Buy order failed: ' + (error.message || 'Unknown error'));
      setLoading(false);
      return false;
    }
  };

  // Sell stock
  const sellStock = async (symbol, quantity, price) => {
    if (!isLoggedIn) return false;
    
    try {
      setLoading(true);
      await angelOneApi.placeSellOrder(symbol, quantity, price);
      // Refresh holdings after order
      await fetchMarketData();
      setLoading(false);
      return true;
    } catch (error) {
      setError('Sell order failed: ' + (error.message || 'Unknown error'));
      setLoading(false);
      return false;
    }
  };

  // Refresh data periodically when logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchMarketData();
      
      // Set up refresh interval
      const intervalId = setInterval(fetchMarketData, 60000); // Every minute
      
      return () => clearInterval(intervalId);
    }
  }, [isLoggedIn]);

  const value = {
    isLoggedIn,
    userData,
    marketIndices,
    holdings,
    mutualFunds,
    topStocks,
    loading,
    error,
    login,
    logout,
    fetchMarketData,
    buyStock,
    sellStock
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

// Custom hook for using the API context
export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

export default ApiContext;