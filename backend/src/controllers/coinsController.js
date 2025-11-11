import * as coinsService from '../services/coinsService.js';

export const getMarkets = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const data = await coinsService.fetchMarkets(Number(page), Number(limit));
    res.json(data);
  } catch (err) {
    console.error('markets error', err.message || err);
    res.status(500).json({ error: 'Failed to fetch markets' });
  }
};

export const getCoinDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await coinsService.fetchCoinDetails(id);
    res.json(data);
  } catch (err) {
    console.error('coin details error', err.message || err);
    res.status(500).json({ error: 'Failed to fetch coin details' });
  }
};
