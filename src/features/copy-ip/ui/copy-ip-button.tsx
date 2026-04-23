import { useState } from "react";

export const CopyIpButton = () => {
  const [copied, setCopied] = useState(false);

  const copyIp = () => {
    navigator.clipboard.writeText("play.craftnepal.net");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyIp}
      className="group relative rounded-lg p-px bg-gradient-to-br from-accent-500/50 via-primary-400/30 to-transparent transition-all duration-300 hover:scale-105 active:scale-95"
    >
      <div
        className={`relative px-8 py-4 rounded-lg backdrop-blur-md font-bold tracking-widest uppercase text-sm transition-all duration-500 overflow-hidden ${
          copied
            ? "bg-accent-500/20 text-accent-400"
            : "bg-[rgba(11,26,31,0.8)] text-white"
        }`}
      >
        {/* Animated Hover Background */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#eb5569,#32789f,#eb5569)] animate-[spin_4s_linear_infinite] opacity-30 blur-2xl" />
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent-500/50 rounded-tl-lg transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-accent-400" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent-500/50 rounded-br-lg transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-accent-400" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary-400/30 rounded-tr-lg transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-primary-300" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary-400/30 rounded-bl-lg transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-primary-300" />

        <div className="relative z-10 flex items-center justify-center">
          {/* Hidden placeholder to reserve space */}
          <span className="invisible select-none">play.craftnepal.net</span>

          {/* Actual visible text */}
          <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap">
            {copied ? "✓ Copied!" : "play.craftnepal.net"}
          </span>
        </div>
      </div>
    </button>
  );
};
