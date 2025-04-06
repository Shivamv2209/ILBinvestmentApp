import express from 'express';
import { recommend } from '../controllers/recommendController.js';


const router = express.Router();

router.get("/recommend/:userId",recommend);

export default router;