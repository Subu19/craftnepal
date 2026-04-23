import type { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  icon: LucideIcon;
  iconColorClass?: string;
  bgColorClass?: string;
  borderColorClass?: string;
}

export const SectionHeader = ({
  title,
  icon: Icon,
  iconColorClass = "text-accent-500",
  bgColorClass = "bg-accent-500/10",
  borderColorClass = "border-accent-500/20",
}: SectionHeaderProps) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className={`p-3 rounded-xl ${bgColorClass} border ${borderColorClass}`}>
        <Icon className={iconColorClass} size={32} />
      </div>
      <h2
        className="text-3xl font-bold text-white uppercase tracking-tight"
        style={{ fontFamily: "'Rubik Mono One', sans-serif" }}
      >
        {title}
      </h2>
    </div>
  );
};
