import mongoose from "mongoose";

const compareSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    stockA: String,
    stockB: String,
    comparedAt: { type: Date, default: Date.now }
  });
  
export default mongoose.model("Compare", compareSchema);
  