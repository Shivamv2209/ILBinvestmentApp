import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["stock", "mutual_fund"] },
    symbol: String,
    name: String,
    sector: String,
    quantity: Number,
    buyPrice: Number,
    date: Date
  });
  
export default mongoose.model("portfolios", portfolioSchema);
  