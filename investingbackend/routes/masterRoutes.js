import express from "express";
import {
  getAllMutualFunds,
  getAllStocks,
} from "../controllers/masterController.js";

const router = express.Router();

router.get("/funds", getAllMutualFunds);
router.get("/stocks", getAllStocks);

export default router;