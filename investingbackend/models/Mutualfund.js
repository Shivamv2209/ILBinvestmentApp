import mongoose from "mongoose";

const mutualFundSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fundName: String,
    isin: String,
    fundHouse: String,
    nav: Number,
    units: Number,
    investedAmount: Number,
    currentValue: Number,
    purchaseDate: Date,
    category: String,
    riskLevel: String,
    returns: {
      oneYear: Number,
      threeYear: Number,
      fiveYear: Number,
    },
  });

  export default mongoose.model("mutualFunds", mutualFundSchema);

