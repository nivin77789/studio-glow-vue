import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, GraduationCap, Briefcase, Image, Users, Printer, Phone, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const MobileBottomNav = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  // Navbar is now static; removed scroll detection

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Education", href: "/courses", icon: GraduationCap },
    { name: "Experience", href: "/experience", icon: Sparkles, special: true },
    { name: "Portfolio", href: "/portfolio", icon: Image },
    { name: "Partners", href: "/collaborations", icon: Users },
    { name: "Prints", href: "/prints", icon: Printer },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.href === location.pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname]);

  // Removed scroll listener; navbar always visible

  return (
    <>
      {/* Spacer to prevent content from being hidden behind the nav */}
      <div className="h-20 md:hidden" />

      {/* Bottom Navigation Bar - Shows only when scrolled */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        {/* Glassmorphism background - flush to bottom */}
        <div className="relative bg-white/85 dark:bg-black/70 backdrop-blur-xl shadow-xl border-t border-gray-200/40 dark:border-slate-800/50 overflow-hidden pointer-events-auto rounded-t-2xl">

          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-accent/3 to-primary/3" />

          {/* Top indicator line */}
          <div
            className="absolute top-0 h-[2px] bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 transition-all duration-500 ease-out"
            style={{
              left: `${(activeIndex / navItems.length) * 100}%`,
              width: `${100 / navItems.length}%`,
            }}
          />

          {/* Navigation items */}
          <div className="relative flex items-center justify-around px-1 py-2 safe-area-bottom">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === activeIndex;
              const isSpecial = item.special;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "relative flex flex-col items-center justify-center gap-1 px-2 py-1.5 rounded-xl transition-all duration-300 group min-w-[52px]",
                    isActive
                      ? "scale-105"
                      : "scale-100 hover:scale-105 active:scale-95"
                  )}
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Simplified Experience highlight - subtle glow only */}
                  {isSpecial && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-400/20 to-yellow-500/20 animate-pulse-slow" />
                  )}

                  {/* Icon container */}
                  <div
                    className={cn(
                      "relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300",
                      isActive && isSpecial
                        ? "bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg shadow-amber-500/30"
                        : isActive
                          ? "bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30"
                          : isSpecial
                            ? "bg-amber-400/10 group-hover:bg-amber-400/20"
                            : "bg-transparent group-hover:bg-primary/10"
                    )}
                  >
                    {/* Single sparkle for special item when active */}
                    {isSpecial && isActive && (
                      <Sparkles className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 text-amber-500 animate-pulse" />
                    )}

                    <Icon
                      className={cn(
                        "w-4 h-4 transition-all duration-300 relative z-10",
                        isActive && isSpecial
                          ? "text-white"
                          : isActive
                            ? "text-white"
                            : isSpecial
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-gray-600 dark:text-gray-400 group-hover:text-primary"
                      )}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={cn(
                      "text-[8px] font-semibold transition-all duration-300 whitespace-nowrap",
                      isActive && isSpecial
                        ? "text-amber-600 dark:text-amber-400"
                        : isActive
                          ? "text-primary dark:text-accent"
                          : isSpecial
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-gray-600 dark:text-gray-400 group-hover:text-primary"
                    )}
                  >
                    {item.name}
                  </span>

                  {/* Active indicator dot */}
                  {isActive && (
                    <div className={cn(
                      "absolute -bottom-0.5 w-1 h-1 rounded-full",
                      isSpecial
                        ? "bg-amber-500"
                        : "bg-primary"
                    )} />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <style>{`
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          .safe-area-bottom {
            padding-bottom: calc(0.5rem + env(safe-area-inset-bottom));
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default MobileBottomNav;
