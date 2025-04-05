import mongoose from "mongoose";

const TransacSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    source: { type: String, enum: ["Digio", "DigiLocker", "MF Central"] },
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    pan: String,
    message: String,
    createdAt: { type: Date, default: Date.now },
  });

  export default mongoose.model("Transac", importTxnSchema);