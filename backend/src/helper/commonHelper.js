import axios from "axios";
import { COINGECKO_BASE, cache } from "../constants/index.js";

// Function is created to get the count of total coins and cached that value
export async function getTotalCoinCount() {
  const cacheKey = "total_coin_count";
  const cachedCount = cache.get(cacheKey);
  if (cachedCount) return cachedCount;
  try {
    const res = await axios.get(`${COINGECKO_BASE}/coins/list`, { timeout: 20000 });
    const count = Array.isArray(res.data) ? res.data.length : 0;
    cache.set(cacheKey, count, 300);
    return count;
  } catch (err) {
    console.error("Error fetching total coin count:", err.message || err);
    return 0;
  }
}
