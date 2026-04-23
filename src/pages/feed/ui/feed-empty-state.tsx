import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export const FeedEmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-24 bg-white/5 rounded-2xl border border-white/5 transition-all"
    >
      <div className="w-20 h-20 bg-primary-900/50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-500 shadow-inner ring-1 ring-white/5">
        <MessageSquare size={32} />
      </div>
      <h3
        className="text-2xl font-bold text-white mb-2"
        style={{ fontFamily: "'Geist Variable', sans-serif" }}
      >
        The silence is deafening
      </h3>
      <p className="text-gray-400 text-lg">
        Be the pioneer and start the first discussion.
      </p>
    </motion.div>
  );
};
