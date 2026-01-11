// Simple local storage cache manager
const PREFIX = 'benson_cache_';

export const cacheSet = (key, value, ttlInMinutes = 60) => {
  try {
    const item = {
      value,
      expiry: Date.now() + ttlInMinutes * 60 * 1000,
    };
    localStorage.setItem(PREFIX + key, JSON.stringify(item));
  } catch (e) {
    console.error('Cache set failed', e);
  }
};

export const cacheGet = (key) => {
  try {
    const itemStr = localStorage.getItem(PREFIX + key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = Date.now();

    if (now > item.expiry) {
      localStorage.removeItem(PREFIX + key);
      return null;
    }
    return item.value;
  } catch (e) {
    return null;
  }
};

export const cacheClear = (key) => {
  localStorage.removeItem(PREFIX + key);
};

export const cacheClearPattern = (pattern) => {
    Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(PREFIX) && key.includes(pattern)) {
            localStorage.removeItem(key);
        }
    });
};