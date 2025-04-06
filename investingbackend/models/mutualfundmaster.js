import mongoose from "mongoose";

const mutualFundMasterSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  type: String,
  risk: String,
  style: String,
  return_1y: Number,
  aum_cr: Number,
  sector_focus: String,
  navHistory: [
    {
      date: Date,
      nav: Number
    }
  ]
});

export default mongoose.model("mutualFundMasters", mutualFundMasterSchema);