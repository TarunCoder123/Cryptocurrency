import express from 'express';
import { getMarkets, getCoinDetails } from '../controllers/coinsController.js';

const router = express.Router();

router.get('/markets', getMarkets);
router.get('/:id', getCoinDetails);

export default router;
