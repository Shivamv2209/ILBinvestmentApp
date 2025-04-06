import express from 'express';
import {getStockNews} from "../controllers/newsController.js"

 const router = express.Router();

 router.get("/india",getStockNews);

 export default router;