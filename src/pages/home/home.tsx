import {
  HomeHero,
  HomeAbout,
  HomeFeatures,
  HomeGoal,
  HomeOrigin,
} from "@/pages/home/ui";

const Home = () => {
  return (
    <div className="relative overflow-x-hidden">
      <HomeHero />

      {/* ========== CONTENT ========== */}
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <HomeAbout />

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <HomeOrigin />
      </div>

      <HomeGoal />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <HomeFeatures />
      </div>
    </div>
  );
};

export default Home;
