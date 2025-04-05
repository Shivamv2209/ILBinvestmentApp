import axios from 'axios';

class AngelOneApi {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://apiconnect.angelbroking.com',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    
    this.token = null;
  }

  // Set token after login
  setToken(token) {
    this.token = token;
    this.apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    this.apiClient.defaults.headers.common['X-UserType'] = 'USER';
    this.apiClient.defaults.headers.common['X-SourceID'] = 'WEB';
  }

  // Login to Angel One
  async login(clientId, password, totp) {
    try {
      const response = await this.apiClient.post('/rest/auth/angelbroking/user/v1/loginByPassword', {
        clientId,
        password,
        totp
      });
      
      if (response.data && response.data.data && response.data.data.jwtToken) {
        this.setToken(response.data.data.jwtToken);
        return response.data;
      }
      
      throw new Error('Login failed: No token received');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Get market indices data
  async getMarketIndices() {
    try {
      const response = await this.apiClient.get('/rest/market/v1/marketIndex');
      return response.data;
    } catch (error) {
      console.error('Error fetching market indices:', error);
      throw error;
    }
  }

  // Get historical data for charts
  async getHistoricalData(symbol, timeframe, from, to) {
    try {
      const response = await this.apiClient.post('/rest/secure/angelbroking/historical/v1/getCandleData', {
        symbolToken: symbol,
        interval: timeframe,
        fromDate: from,
        toDate: to
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw error;
    }
  }

  // Get top recommended stocks
  async getTopStocks() {
    try {
      // This endpoint might differ based on actual API structure
      const response = await this.apiClient.get('/rest/secure/angelbroking/recommendation/v1/topStocks');
      return response.data;
    } catch (error) {
      console.error('Error fetching top stocks:', error);
      throw error;
    }
  }

  // Get portfolio holdings 
  async getHoldings() {
    try {
      const response = await this.apiClient.get('/rest/secure/angelbroking/portfolio/v1/holdings');
      return response.data;
    } catch (error) {
      console.error('Error fetching holdings:', error);
      throw error;
    }
  }

  // Get mutual funds
  async getMutualFunds() {
    try {
      // This endpoint might differ based on actual API structure
      const response = await this.apiClient.get('/rest/secure/angelbroking/portfolio/v1/mutualFunds');
      return response.data;
    } catch (error) {
      console.error('Error fetching mutual funds:', error);
      throw error;
    }
  }

  // Place a buy order
  async placeBuyOrder(symbol, quantity, price) {
    try {
      const response = await this.apiClient.post('/rest/secure/angelbroking/order/v1/placeOrder', {
        variety: "NORMAL",
        tradingsymbol: symbol,
        symboltoken: symbol,
        transactiontype: "BUY",
        exchange: "NSE",
        ordertype: "LIMIT",
        producttype: "DELIVERY",
        duration: "DAY",
        price: price,
        squareoff: 0,
        stoploss: 0,
        quantity: quantity
      });
      return response.data;
    } catch (error) {
      console.error('Error placing buy order:', error);
      throw error;
    }
  }

  // Place a sell order
  async placeSellOrder(symbol, quantity, price) {
    try {
      const response = await this.apiClient.post('/rest/secure/angelbroking/order/v1/placeOrder', {
        variety: "NORMAL",
        tradingsymbol: symbol,
        symboltoken: symbol,
        transactiontype: "SELL",
        exchange: "NSE",
        ordertype: "LIMIT",
        producttype: "DELIVERY",
        duration: "DAY",
        price: price,
        squareoff: 0,
        stoploss: 0,
        quantity: quantity
      });
      return response.data;
    } catch (error) {
      console.error('Error placing sell order:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const angelOneApi = new AngelOneApi();
export default angelOneApi;