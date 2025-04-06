// seedStockMaster.mjs
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import StockMaster from './models/stockmaster.js';
import stockData from './dummy_stocks_data.json' assert { type: 'json' };

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then(() => {
  console.log('✅ Connected to MongoDB');
  seedStocks();
}).catch(err => {
  console.error('❌ DB connection failed:', err.message);
  process.exit(1);
});

async function seedStocks() {
  try {
    // await StockMaster.deleteMany({});
    // console.log('🗑️ Cleared old stock data');

    await StockMaster.insertMany(stockData);
    console.log(`✅ Seeded ${stockData.length} stocks`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error inserting stocks:', err);
    process.exit(1);
  }
}

seedStocks();
