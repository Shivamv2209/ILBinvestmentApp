import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    goalName: String,
    targetAmount: Number,
    currentAmount: Number,
    targetDate: Date,
    goalType: { type: String, enum: ["retirement", "education", "home", "custom"] }
  });
  
export default mongoose.model("goals", goalSchema);
  