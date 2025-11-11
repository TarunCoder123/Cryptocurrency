import NodeCache from 'node-cache';
import dotenv from 'dotenv';

dotenv.config();

export const COINGECKO_BASE = process.env.COINGECKO_BASE || 'https://api.coingecko.com/api/v3';
export const cache = new NodeCache({ stdTTL: parseInt(process.env.CACHE_TTL) || 300 });
