import { useState, useEffect, useRef } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../../../shared/ui/popover";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Shield, LayoutDashboard, LogOut } from "lucide-react";
const craftnepalLogo = '/assets/images/craftnepal.svg';
import { useAuth } from "../../../shared/providers/auth-provider";
const discordIcon = '/assets/images/icons/discord.png';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isLoading, login, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/guides", label: "Guide" },
    { href: "/stats", label: "Stats" },
    { href: "/feed", label: "Feed" },
    { href: "/gallery", label: "Gallery" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/map", label: "Map" },
  ];

  const isActive = (href: string) => location.pathname === href;

  const linkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = navLinks.findIndex((link) => isActive(link.href));
      const activeElement = linkRefs.current[activeIndex];

      if (activeElement) {
        setIndicatorStyle({
          left: activeElement.offsetLeft,
          width: activeElement.offsetWidth,
          opacity: 1,
        });
      } else {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    // Use requestAnimationFrame to ensure layout is calculated
    requestAnimationFrame(() => {
      updateIndicator();
    });

    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [location.pathname]);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${(scrolled || isOpen) ? "bg-[#152c33]/60 backdrop-blur-md border-b border-white/10" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 h-10"
            >
              <img
                src={craftnepalLogo}
                alt="CraftNepal Logo"
                className="h-full w-auto"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 relative">
            {/* Custom Background Highlight */}
            <motion.div
              className="absolute top-0 bottom-0 bg-white/5 rounded-xl z-0"
              initial={false}
              animate={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.opacity,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />

            {/* Custom Bottom Indicator (Centered, 50% width) */}
            <motion.div
              className="absolute bottom-0 h-1 bg-accent-500 rounded-t-lg z-10"
              initial={false}
              animate={{
                left: indicatorStyle.left + indicatorStyle.width * 0.25,
                width: indicatorStyle.width * 0.5,
                opacity: indicatorStyle.opacity,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />

            {navLinks.map((link, index) => (
              <div
                key={link.href}
                className="relative px-4 py-2 z-10"
                ref={(el) => {
                  linkRefs.current[index] = el;
                }}
              >
                <Link
                  to={link.href}
                  className={`transition-all relative font-medium block ${isActive(link.href)
                      ? "text-accent-400"
                      : "text-gray-300 hover:text-white"
                    }`}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          {/* User Section (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoading &&
              (user ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 pl-4 border-l border-white/10"
                >
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-white">
                      {user.username}
                    </span>
                    {user.isAdmin && (
                      <span className="text-[10px] uppercase tracking-wider text-accent-400 font-bold flex items-center gap-0.5">
                        <Shield size={10} /> Admin
                      </span>
                    )}
                  </div>
                  {user.isAdmin ? (
                    <Popover>
                      <PopoverTrigger className="relative group block outline-none">
                        <img
                          src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
                          alt={user.username}
                          className="w-10 h-10 rounded-full border-2 border-accent-500/50 p-0.5 group-hover:border-accent-400 transition-colors cursor-pointer"
                        />
                        <div className="absolute inset-0 rounded-full bg-accent-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                      </PopoverTrigger>
                      <PopoverContent className="w-48 p-2" align="end" sideOffset={10}>
                        <div className="flex flex-col gap-1">
                          <Link 
                            to="/admin" 
                            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                          >
                            <LayoutDashboard size={16} />
                            CMS Panel
                          </Link>
                          <button 
                            onClick={logout}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors text-left"
                          >
                            <LogOut size={16} />
                            Logout
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <div className="relative group">
                      <img
                        src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
                        alt={user.username}
                        className="w-10 h-10 rounded-full border-2 border-accent-500/50 p-0.5 group-hover:border-accent-400 transition-colors"
                      />
                      <div className="absolute inset-0 rounded-full bg-accent-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={login}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl font-medium transition-all shadow-lg shadow-[#5865F2]/20 border border-white/10"
                >
                  <img
                    src={discordIcon}
                    alt="Discord"
                    className="w-5 h-5 brightness-0 invert"
                  />
                  <span>Login</span>
                </motion.button>
              ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-accent-500 transition-colors p-2 bg-white/5 rounded-lg border border-white/10"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden md:hidden"
        >
          <div className="flex flex-col gap-2 pt-4 pb-2">
            {navLinks.map((link) => (
              <motion.div key={link.href} whileHover={{ x: 5 }}>
                <Link
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl transition-all font-medium ${isActive(link.href)
                      ? "bg-accent-500/20 text-accent-400 border border-accent-500/30"
                      : "text-gray-300 hover:text-white bg-white/5 border border-white/5"
                    }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* User Section (Mobile) */}
            {!isLoading && (
              <div className="mt-2 pt-4 border-t border-white/10">
                {user ? (
                  <div className="flex items-center gap-4 px-4 py-3 bg-white/5 rounded-xl border border-white/5">
                    <img
                      src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
                      alt={user.username}
                      className="w-12 h-12 rounded-full border-2 border-accent-500/50"
                    />
                    <div className="flex flex-col">
                      <span className="text-white font-medium">
                        {user.username}
                      </span>
                      {user.isAdmin && (
                        <span className="text-xs text-accent-400 font-bold flex items-center gap-1">
                          <Shield size={12} /> Administrator
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={login}
                    className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-[#5865F2] text-white rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-[#5865F2]/20"
                  >
                    <img
                      src={discordIcon}
                      alt="Discord"
                      className="w-6 h-6 brightness-0 invert"
                    />
                    <span>Login with Discord</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
