import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    stockName: String,
    ticker: String,
    exchange: String,
    sector: String,
    quantity: Number,
    buyPrice: Number,
    currentPrice: Number,
    buyDate: Date,
    risk: String,
  });

  export default mongoose.model('stocks', stockSchema);
