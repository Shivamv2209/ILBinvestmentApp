// models/userstockholding.js
import mongoose from "mongoose";

const userStockHoldingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  stockName: { type: String, required: true },           // e.g., "Tata Consultancy"
  ticker: { type: String, required: true },              // e.g., "TCS"
  exchange: { type: String, default: "NSE" },            // e.g., "NSE" or "BSE"
  sector: String,                                        // e.g., "IT"
  quantity: { type: Number, required: true },
  buyPrice: { type: Number, required: true },            // Price per share at buy time
  currentPrice: { type: Number, required: true },        // Latest price (sync with master)
  buyDate: { type: Date, required: true },
  risk: String,                                          // e.g., "Low", "Moderate", "High"
}, { timestamps: true });

 
export default mongoose.model("UserStockHolding", userStockHoldingSchema);
