import mongoose, { model } from "mongoose";

const recommendationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    recommendedStocks: [
      {
        symbol: String,
        reason: String
      }
    ],
    recommendedMutualFunds: [
      {
        name: String,
        reason: String
      }
    ],
    createdAt: { type: Date, default: Date.now }
  });
  
export default mongoose.model("recommendations", recommendationSchema)
  