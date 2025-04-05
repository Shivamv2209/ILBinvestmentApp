// models/stockmaster.js
import mongoose from "mongoose";

const priceHistorySchema = new mongoose.Schema({
  date: String,          // Format: "YYYY-MM-DD"
  price: Number,
});

const stockMasterSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true }, // e.g., "TCS"
  name: { type: String, required: true },                 // e.g., "Tata Consultancy"
  sector: String,                                         // e.g., "IT"
  marketCap: String,                                      // e.g., "Large"
  style: String,                                          // e.g., "Moderate"
  risk: String,                                           // e.g., "Low"
  avgReturn: Number,                                      // e.g., 13.5
  volatility: Number,                                     // e.g., 13.0
  priceHistory: [priceHistorySchema],                    // Array of price history objects
}, 
{ timestamps: true });


export default mongoose.model("StockMaster", stockMasterSchema);
