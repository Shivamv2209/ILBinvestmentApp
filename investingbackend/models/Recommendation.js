import mongoose, { model } from "mongoose";

const recommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["stock", "mutualFund"] },
  reason: String,
  recommendedItems: [
    {
      name: String,
      tickerOrISIN: String,
      sector: String,
      risk: String,
      expectedReturn: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});
  
export default mongoose.model("recommendations", recommendationSchema)
  