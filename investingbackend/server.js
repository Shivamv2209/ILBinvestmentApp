import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './config/mongoose-connection.js';
import userRouter from './routes/userRouter.js';
import MutualFundMaster from './models/MutualFundMaster.js';
import StockMaster from './models/StockMaster.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Create server and setup Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/user", userRouter);

// Function to simulate price/NAV change
const simulateChange = (value) => {
  const changeFactor = 1 + (Math.random() - 0.5) * 0.01; // ±0.5% fluctuation
  return parseFloat((value * changeFactor).toFixed(2));
};

// Socket.IO Logic
io.on("connection", (socket) => {
  console.log(`🟢 Client connected: ${socket.id}`);

  const sendLiveUpdates = async () => {
    try {
      const mutualFunds = await MutualFundMaster.find({});
      const stocks = await StockMaster.find({});
      const now = new Date().toISOString();

      const updatedFunds = mutualFunds.map(fund => {
        const latestNAV = fund.navHistory?.at(-1)?.nav;
        return {
          symbol: fund.symbol,
          name: fund.name,
          nav: latestNAV ? simulateChange(latestNAV) : null,
          date: now,
        };
      });

      const updatedStocks = stocks.map(stock => ({
        ticker: stock.ticker,
        name: stock.name,
        currentPrice: stock.currentPrice ? simulateChange(stock.currentPrice) : null,
        date: now,
      }));

      socket.emit("liveMutualFunds", updatedFunds);
      socket.emit("liveStocks", updatedStocks);
    } catch (err) {
      console.error("❌ WebSocket update error:", err.message);
    }
  };

  const intervalId = setInterval(sendLiveUpdates, 5000);

  socket.on("disconnect", () => {
    console.log(`🔴 Client disconnected: ${socket.id}`);
    clearInterval(intervalId);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`🚀 Server running at ${port}`);
});




