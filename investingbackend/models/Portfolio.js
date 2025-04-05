import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  name: { type: String, default: "My Portfolio" }, // optional for multiple portfolios

  holdings: [
    {
      assetType: { type: String, enum: ["stock", "mutualFund"], required: true },
      assetId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'holdings.assetType' },
      quantity: Number,
      purchasePrice: Number,
      purchaseDate: Date
    }
  ],

  totalValue: Number,
  lastUpdated: Date
}, { timestamps: true });
  
export default mongoose.model("portfolios", portfolioSchema);
  