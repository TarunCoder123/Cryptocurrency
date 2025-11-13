import express from 'express';
import { getMarkets, getCoinDetails } from '../controllers/coinsController.js';

// Router is created for the coins api's
const router = express.Router();

// Both routes are initialized with the controller
router.get('/markets', getMarkets);
router.get('/:id', getCoinDetails);

export default router;
