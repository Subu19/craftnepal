import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/shared/ui";

const Map = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [key, setKey] = useState(0);

  const mapUrl = "https://map.craftnepal.net";
  const fallbackUrl = "http://play.craftnepal.net:8169/";

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
    setIsLoading(true);
    setHasError(false);
  };

  return (
    <div className="pt-24 pb-12 min-h-screen flex flex-col">
      <div className="container mx-auto px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h1 
              className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter"
              style={{ fontFamily: "'Rubik Mono One', sans-serif" }}
            >
              Live <span className="text-accent-500">Map</span>
            </h1>
            <p className="text-gray-400 mt-2 max-w-xl">
              Explore the CraftNepal world in real-time. Track players, view territories, 
              and plan your next big build from the browser.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="bg-white/5 border-white/10 hover:bg-white/10 text-white gap-2"
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              Refresh
            </Button>
            <Button
              variant="default"
              size="sm"
              asChild
              className="gap-2"
            >
              <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} />
                Open Fullscreen
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="flex-1 container mx-auto px-6 relative pb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-full h-[70vh] md:h-[75vh] rounded-3xl overflow-hidden border border-white/10 bg-primary-900/40 backdrop-blur-sm shadow-2xl shadow-black/50"
        >
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-secondary-900"
              >
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-accent-500/20 border-t-accent-500 rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-accent-500/10 rounded-full animate-pulse" />
                  </div>
                </div>
                <p className="text-gray-400 mt-6 font-medium animate-pulse">
                  Connecting to the world map...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {hasError ? (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-secondary-900 p-8 text-center">
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
                <AlertCircle size={40} className="text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Map Connection Failed</h2>
              <p className="text-gray-400 max-w-md mb-8 leading-relaxed">
                We're having trouble reaching the map server. This can happen due to 
                strict firewall settings or temporary server downtime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" onClick={handleRefresh} className="border-white/10 hover:bg-white/5 text-white">
                  Try Again
                </Button>
                <Button variant="default" asChild>
                  <a href={fallbackUrl} target="_blank" rel="noopener noreferrer">
                    Use Fallback Link
                  </a>
                </Button>
              </div>
            </div>
          ) : (
            <iframe
              key={key}
              src={mapUrl}
              className="w-full h-full border-0 relative z-10"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
              title="CraftNepal Live Map"
              allowFullScreen
            />
          )}

          {/* Decorative frame overlay */}
          <div className="absolute inset-0 pointer-events-none border-[12px] border-white/5 rounded-3xl z-20" />
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-3xl z-20" />
        </motion.div>
      </div>
    </div>
  );
};

export default Map;
