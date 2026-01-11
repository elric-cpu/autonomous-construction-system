export const measurePerformance = (name, fn) => {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    if (process.env.NODE_ENV === 'development') {
        const duration = (end - start).toFixed(2);
        if (duration > 100) {
            console.warn(`[Perf] ${name} took ${duration}ms`);
        } else {
            console.log(`[Perf] ${name} took ${duration}ms`);
        }
    }
    return result;
};

export const measureAsyncPerformance = async (name, fn) => {
    const start = performance.now();
    try {
        const result = await fn();
        return result;
    } finally {
        const end = performance.now();
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Perf Async] ${name} took ${(end - start).toFixed(2)}ms`);
        }
    }
};