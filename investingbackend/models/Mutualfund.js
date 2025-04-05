import mongoose from "mongoose";

const mutualFundSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fundName: String,
    isin: String,
    fundHouse: String,
    nav: Number,
    units: Number,
    aum_cr: Number,
    risk: String,
    style: String,
    investedAmount: Number,
    currentValue: Number,
    purchaseDate: Date,
    sector_focus: String,
    riskLevel: String,
    return_1y:  Number,
  });

  export default mongoose.model("mutualFunds", mutualFundSchema);

