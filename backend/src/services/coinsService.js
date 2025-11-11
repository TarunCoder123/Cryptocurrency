import axios from 'axios';
import { cache, COINGECKO_BASE } from '../constants/index.js';
import { getTotalCoinCount } from '../helper/commonHelper.js';

export const fetchMarkets = async (page, per_page) => {
  const cacheKey = `markets:${page}:${per_page}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  try {
    let totalCount = cache.get('total_coin_count');
    if (!totalCount) totalCount = await getTotalCoinCount();

    const response = await axios.get(`${COINGECKO_BASE}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page,
        page,
        sparkline: false,
        price_change_percentage: '24h',
      },
      timeout: 10000,
    });

    const payload = {
      total: totalCount,
      page,
      per_page,
      data: response.data.map((c) => ({
        id: c?.id,
        name: c?.name,
        symbol: c?.symbol,
        current_price: c?.current_price,
        high_24h: c?.high_24h,
        low_24h: c?.low_24h,
        price_change_percentage_24h: c?.price_change_percentage_24h,
        image: c?.image,
      })),
    };

    cache.set(cacheKey, payload);
    return payload;
  } catch (err) {
    console.error('Error fetching markets:', err.message || err);
    return { total: 0, page, per_page, data: [] };
  }
};

export const fetchCoinDetails = async (id) => {
  const cacheKey = `coin:${id}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await axios.get(`${COINGECKO_BASE}/coins/${encodeURIComponent(id)}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
      timeout: 10000,
    });

    const d = response?.data;
    const md = d?.market_data || {};

    const price_changes = {
      '24h': md?.price_change_percentage_24h,
      '7d': md?.price_change_percentage_7d,
      '14d': md?.price_change_percentage_14d,
      '30d': md?.price_change_percentage_30d,
      '60d': md?.price_change_percentage_60d,
      '200d': md?.price_change_percentage_200d,
      '1y': md?.price_change_percentage_1y,
    };

    const payload = {
      id: d?.id,
      symbol: d?.symbol,
      name: d?.name,
      description: d?.description?.en || '',
      image: d?.image?.large || d.image?.thumb,
      current_price: md?.current_price?.usd || null,
      market_cap: md?.market_cap?.usd || null,
      total_volume: md?.total_volume?.usd || null,
      high_24h: md?.high_24h?.usd || null,
      low_24h: md?.low_24h?.usd || null,
      price_changes,
    };

    cache.set(cacheKey, payload);
    return payload;
  } catch (err) {
    console.error('Error fetching coin details:', err.message || err);
    return null;
  }
};
