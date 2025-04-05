import mongoose from "mongoose";

const compareSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["stock", "mutualFund"], required: true },
  itemOne: {
    name: String,
    symbolOrISIN: String,
    sector: String,
    price: Number,
    returns: {
      oneYear: Number,
      threeYear: Number,
      fiveYear: Number,
    },
    risk: String,
    rating: String,
  },
  itemTwo: {
    name: String,
    symbolOrISIN: String,
    sector: String,
    price: Number,
    returns: {
      oneYear: Number,
      threeYear: Number,
      fiveYear: Number,
    },
    risk: String,
    rating: String,
  },
  result: {
    better: String,
    summary: String,
  },
  comparedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Compare", compareSchema);
  