import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, CloudOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      setTimeout(() => setShowReconnected(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-gray-900 text-white text-center py-2 px-4 flex items-center justify-center gap-2 text-sm font-medium z-50 relative"
        >
          <WifiOff className="w-4 h-4" />
          <span>You are offline. Viewing cached data. Changes will sync when reconnected.</span>
        </motion.div>
      )}
      {showReconnected && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-green-600 text-white text-center py-2 px-4 flex items-center justify-center gap-2 text-sm font-medium z-50 relative"
        >
          <Wifi className="w-4 h-4" />
          <span>Connection restored. Syncing data...</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineIndicator;