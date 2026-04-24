import type { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  icon: LucideIcon | string;
  iconColorClass?: string;
  bgColorClass?: string;
  borderColorClass?: string;
}

export const SectionHeader = ({
  title,
  icon,
  iconColorClass = "text-accent-500",
  bgColorClass = "bg-accent-500/10",
  borderColorClass = "border-accent-500/20",
}: SectionHeaderProps) => {
  const isImageUrl = typeof icon === 'string';
  const Icon = !isImageUrl ? icon as LucideIcon : null;

  return (
    <div className="flex items-center gap-4 mb-8">
      <div className={`p-3 rounded-xl ${bgColorClass} border ${borderColorClass} flex items-center justify-center min-w-[56px] min-h-[56px]`}>
        {isImageUrl ? (
          <img src={icon as string} alt="" className="w-8 h-8 object-contain" />
        ) : (
          Icon && <Icon className={iconColorClass} size={32} />
        )}
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
