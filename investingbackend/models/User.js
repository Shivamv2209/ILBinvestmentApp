import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // hashed (if local)
  kycStatus: { type: String, default: "pending" },
  riskProfile: { type: String, enum: ["low", "moderate", "high"] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('users', userSchema);
