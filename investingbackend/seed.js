import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Enable .env variables
dotenv.config();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose
    .connect(mongoURI)
    .then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Schema definition
const mutualFundMasterSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  type: String,
  risk: String,
  style: String,
  return_1y: Number,
  return_3y: Number,
  return_5y: Number,
  aum_cr: Number,
  sector_focus: String,
  isin: { type: String, unique: true },
  navHistory: [
    {
      date: Date,
      nav: Number
    }
  ]
});

const MutualFundMaster = mongoose.model('MutualFundMaster', mutualFundMasterSchema);

// Main seeding function
const seedMutualFunds = async () => {
  try {
    const dataPath = path.join(__dirname, 'dummy_mutual_fund_data_.json');
    const fileContent = await fs.readFile(dataPath, 'utf-8');
    const mutualFunds = JSON.parse(fileContent);

    await MutualFundMaster.deleteMany({});
    await MutualFundMaster.insertMany(mutualFunds);

    console.log('✅ Mutual fund master data seeded successfully!');
  } catch (err) {
    console.error('❌ Error seeding data:', err);
  } finally {
    mongoose.disconnect();
  }
};

seedMutualFunds();
