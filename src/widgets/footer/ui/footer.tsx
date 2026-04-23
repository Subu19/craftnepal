import { motion } from 'framer-motion';
import { MessageCircle, Trophy, BarChart3, BookOpen, Rss } from 'lucide-react';
const logo = '/assets/images/craftnepal.svg';

// Custom Facebook SVG since lucide version might be missing it
const FacebookIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const pages = [
    { title: 'Stats', desc: 'Get in-game stats of any player', icon: BarChart3, color: 'text-accent-500' },
    { title: 'Leaderboard', desc: 'Top 100 players and more', icon: Trophy, color: 'text-accent-500' },
    { title: 'Feed', desc: 'Share your in-game memories', icon: Rss, color: 'text-accent-500' },
    { title: 'Guide', desc: 'All the help you need', icon: BookOpen, color: 'text-accent-500' },
  ];

  return (
    <footer className="relative mt-20 pb-10 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative mb-6"
            >
              <img src={logo} alt="CraftNepal" className="w-24 h-24 drop-shadow-[0_0_15px_rgba(235,85,105,0.3)]" />
            </motion.div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2" style={{ fontFamily: "'Rubik Mono One', sans-serif" }}>
              CraftNepal
            </h2>
            <p className="text-gray-400 text-sm tracking-widest uppercase font-medium">
              A Minecraft SMP
            </p>
            <div className="mt-8 flex gap-4">
              <a href="https://www.facebook.com/craftnepalmc" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent-500/20 transition-all group">
                <FacebookIcon size={20} className="text-gray-400 group-hover:text-accent-500" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent-500/20 transition-all group">
                <MessageCircle size={20} className="text-gray-400 group-hover:text-accent-500" />
              </a>
            </div>
          </div>

          {/* Pages Column */}
          <div className="lg:col-span-5">
            <h3 className="text-white text-lg font-bold uppercase mb-6 flex items-center gap-2" style={{ fontFamily: "'Rubik Mono One', sans-serif", fontSize: '14px' }}>
              <span className="w-2 h-2 bg-accent-500 rounded-full" />
              Pages
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pages.map((page, i) => (
                <motion.a
                  key={page.title}
                  href={`/${page.title.toLowerCase()}`}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-4 rounded-xl bg-white/5 border border-white/5 hover:border-accent-500/30 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <page.icon size={18} className="text-accent-500" />
                    <span className="text-white font-bold text-sm uppercase tracking-wide group-hover:text-accent-400 transition-colors">{page.title}</span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">{page.desc}</p>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Social Widgets Column */}
          <div className="lg:col-span-4">
            <h3 className="text-white text-lg font-bold uppercase mb-6 flex items-center gap-2" style={{ fontFamily: "'Rubik Mono One', sans-serif", fontSize: '14px' }}>
              <span className="w-2 h-2 bg-accent-500 rounded-full" />
              Community
            </h3>

            <div className="flex flex-col gap-4">
              {/* Discord Widget */}
              <div className="rounded-xl overflow-hidden border border-white/5 shadow-2xl bg-[#2f3136]">
                <iframe
                  src="https://discord.com/widget?id=725033293636042773&theme=dark"
                  width="100%"
                  height="220"
                  allowTransparency={true}
                  frameBorder="0"
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                />
              </div>

              {/* Facebook Widget */}
              <div className="rounded-xl overflow-hidden border border-white/5 flex justify-center bg-white">
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fcraftnepalmc&tabs&width=500&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                  width="100%"
                  height="130"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs font-medium uppercase tracking-widest">
          <p>© {currentYear} CraftNepal — Created with ❤️ in Nepal</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-accent-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-accent-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-accent-500 transition-colors">Staff</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
