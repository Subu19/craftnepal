import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Button, Input } from "@/shared/ui";
import { usePlayerSearch } from "@/features/players/hooks/use-player";

const clockImage = "/assets/images/clock.png";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3006/api";

interface StatsHeroProps {
  onSelectPlayer: (name: string, uuid: string) => void;
  selectedPlayerUUID?: string;
  initialValue?: string;
}

export const StatsHero = ({ onSelectPlayer, selectedPlayerUUID, initialValue = "" }: StatsHeroProps) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: searchResults, isLoading: searchLoading } = usePlayerSearch(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(inputValue.trim()), 300);
    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Find the player in search results if possible to get UUID
      const found = searchResults?.find(p => p.name.toLowerCase() === inputValue.trim().toLowerCase());
      onSelectPlayer(inputValue.trim(), found?.uuid || "");
      setShowDropdown(false);
    }
  };

  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 pb-20 overflow-hidden">
      <div className="flex-1 w-full space-y-8 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="text-3xl sm:text-6xl lg:text-7xl font-black text-white"
            style={{
              fontFamily: "'Rubik Mono One', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Player
            <br />
            Statistics
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto lg:mx-0 mt-6 leading-relaxed">
            Search for any player to view their complete in-game statistics,
            from play time to every block broken.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSearchSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative z-20 max-w-lg mx-auto lg:mx-0"
        >
          <div className="relative group" ref={dropdownRef}>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none z-10 flex items-center justify-center">
              {selectedPlayerUUID ? (
                <img
                  src={`${API_BASE_URL}/skin/head/${selectedPlayerUUID}`}
                  alt=""
                  className="w-6 h-6 rounded"
                  style={{ imageRendering: "pixelated" }}
                />
              ) : (
                <Search className="w-5 h-5 text-gray-500 transition-colors group-focus-within:text-accent-500" />
              )}
            </div>
            <Input
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => inputValue.trim() && setShowDropdown(true)}
              className={`w-full h-14 ${selectedPlayerUUID ? "pl-16" : "pl-12"} pr-32 bg-primary-900/50 backdrop-blur-xl border border-white/10 text-white rounded-2xl shadow-2xl focus-visible:ring-accent-500/50 focus-visible:border-accent-500 text-base transition-all placeholder-gray-500`}
              placeholder="Enter in-game username..."
            />
            <Button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 h-auto rounded-xl px-6"
            >
              Search
            </Button>

            <AnimatePresence>
              {showDropdown && inputValue.trim().length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute w-full mt-2 bg-primary-800/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 text-left"
                >
                  {searchLoading ? (
                    <div className="p-4 text-gray-400 text-center animate-pulse">
                      Searching...
                    </div>
                  ) : searchResults && searchResults.length > 0 ? (
                    <ul className="max-h-64 overflow-y-auto custom-scrollbar">
                      {searchResults.map((p) => (
                        <li
                          key={p.uuid}
                          onClick={() => {
                            setInputValue(p.name);
                            onSelectPlayer(p.name, p.uuid);
                            setShowDropdown(false);
                          }}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                        >
                          <img
                            src={`${API_BASE_URL}/skin/head/${p.uuid}`}
                            alt=""
                            className="w-8 h-8 rounded bg-primary-900/50"
                            style={{ imageRendering: "pixelated" }}
                          />
                          <span className="text-white font-medium">
                            {p.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-gray-500 text-center">
                      No players found
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.form>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 w-full flex justify-center lg:justify-end"
      >
        <img
          src={clockImage}
          alt="Clock"
          className="w-48 sm:w-64 lg:w-80 h-auto drop-shadow-2xl"
        />
      </motion.div>
    </section>
  );
};
