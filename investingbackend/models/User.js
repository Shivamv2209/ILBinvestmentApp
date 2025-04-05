import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // hashed

  mobile: String,
  dateOfBirth: String,
  address: String,

  pan: {
    number: { type: String, unique: true, sparse: true },
    verified: { type: Boolean, default: false },
    verifiedAt: Date,
  },
  digilockerLinked: { type: Boolean, default: false },
  kycVerified: { type: Boolean, default: false },

  riskProfile: {
    type: String,
    enum: ["low", "moderate", "high"],
    default: "moderate",
  },

  goals: [{ type: mongoose.Schema.Types.ObjectId, ref: "goals" }],
  stockHoldings: [{ type: mongoose.Schema.Types.ObjectId, ref: "stocks" }],
  mutualFundHoldings: [{ type: mongoose.Schema.Types.ObjectId, ref: "mutualFunds" }],
  recommendations: [{ type: mongoose.Schema.Types.ObjectId, ref: "recommendations" }],
}, { timestamps: true });

export default mongoose.model('users', userSchema);
