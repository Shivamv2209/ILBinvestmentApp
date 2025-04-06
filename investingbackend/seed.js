import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import mastermodel from "./models/mutualfundmaster.js"

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





// Main seeding function
const seedMutualFunds = async () => {
  try {
    const dataPath = path.join(__dirname, 'dummy_mutual_funds_data.json');
    const fileContent = await fs.readFile(dataPath, 'utf-8');
    const mutualFunds = JSON.parse(fileContent);

    // await mastermodel.deleteMany({});
    await mastermodel.insertMany(mutualFunds);

    console.log('✅ Mutual fund master data seeded successfully!');
  } catch (err) {
    console.error('❌ Error seeding data:', err);
  } finally {
    mongoose.disconnect();
  }
};

seedMutualFunds();
