import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  goalName: String,
  targetAmount: Number,
  currentAmount: Number,
  targetDate: Date,
  isAchieved: { type: Boolean, default: false },
});
  
export default mongoose.model("goals", goalSchema);
  