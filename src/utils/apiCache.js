import { cacheGet, cacheSet, cacheClearPattern } from './cacheManager';
import { measureAsyncPerformance } from './performanceMonitor';

// Higher order function to wrap API calls with caching
export const withCache = async (key, fetchFn, ttlMinutes = 5) => {
    // 1. Check cache
    const cached = cacheGet(key);
    if (cached) {
        return { data: cached, error: null, fromCache: true };
    }

    // 2. Fetch from network
    try {
        const { data, error } = await measureAsyncPerformance(`API:${key}`, fetchFn);
        
        if (error) throw error;
        
        // 3. Set cache
        if (data) {
            cacheSet(key, data, ttlMinutes);
        }
        
        return { data, error: null, fromCache: false };
    } catch (error) {
        console.error(`Fetch error for ${key}:`, error);
        return { data: null, error, fromCache: false };
    }
};

export const invalidateCache = (pattern) => {
    console.log(`Invalidating cache for pattern: ${pattern}`);
    cacheClearPattern(pattern);
};