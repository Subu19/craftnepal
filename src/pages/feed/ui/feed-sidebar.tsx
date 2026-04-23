import { Sparkles } from "lucide-react";
import { Card } from "@/shared/ui/card";

export const FeedSidebar = () => {
  return (
    <div className="lg:col-span-4 space-y-6 hidden lg:block sticky top-28">
      <Card className="bg-white/5 border-white/5 p-6 rounded-2xl shadow-xl hover:border-white/10 transition-all">
        <h3
          className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2"
          style={{ fontFamily: "'Geist Variable', sans-serif" }}
        >
          <div className="p-1.5 bg-accent-500/10 rounded text-accent-500">
            <Sparkles className="w-4 h-4" />
          </div>
          Guidelines
        </h3>
        <ul className="space-y-4 text-sm text-gray-400 font-medium">
          <li className="flex gap-4 group items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded bg-primary-900/50 border border-white/5 text-accent-400 flex items-center justify-center text-xs font-bold transition-all group-hover:border-accent-500/30">
              1
            </span>
            <span className="leading-snug pt-0.5 transition-colors group-hover:text-gray-200">
              Respect your fellow adventurers and staff.
            </span>
          </li>
          <li className="flex gap-4 group items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded bg-primary-900/50 border border-white/5 text-accent-400 flex items-center justify-center text-xs font-bold transition-all group-hover:border-accent-500/30">
              2
            </span>
            <span className="leading-snug pt-0.5 transition-colors group-hover:text-gray-200">
              No spamming, advertising, or NSFW content.
            </span>
          </li>
          <li className="flex gap-4 group items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded bg-primary-900/50 border border-white/5 text-accent-400 flex items-center justify-center text-xs font-bold transition-all group-hover:border-accent-500/30">
              3
            </span>
            <span className="leading-snug pt-0.5 transition-colors group-hover:text-gray-200">
              Share high-quality images of your builds!
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
};
