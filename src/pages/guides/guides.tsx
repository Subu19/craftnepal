import { ArrowRight } from "lucide-react";
import { useGuides } from "@/features/guides/hooks/use-guide";
import { BannerCTA } from "@/shared/ui";
import { GuidesHero, GuidesQuickNav, GuidesContent } from "./ui";

const Guides = () => {
  const { data: guidesData, isLoading: guidesLoading } = useGuides();

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-x-hidden">
      <GuidesHero />

      <GuidesQuickNav />

      <GuidesContent guidesData={guidesData} isLoading={guidesLoading} />

      {/* --- Footer CTA --- */}
      <section className="max-w-7xl mx-auto px-6 mt-32 text-center">
        <BannerCTA
          title="Still Stuck?"
          description="Our staff and community are always active on Discord. Drop a message in the #help channel and we'll get you sorted!"
          buttonText="Join Discord"
          buttonHref="#"
          buttonIcon={ArrowRight}
        />
      </section>
    </div>
  );
};

export default Guides;
