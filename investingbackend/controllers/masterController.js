import MutualFundMaster from "../models/mutualfundmaster.js";
import StockMaster from "../models/stockmaster.js";

export const getAllMutualFunds = async (req, res) => {
  try {
    const funds = await MutualFundMaster.find({});
    res.json(funds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllStocks = async (req, res) => {
  try {
    const stocks = await StockMaster.find({});
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};