import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, GraduationCap, Image, Users, Printer, Phone, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const MobileBottomNav = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
      // Scroll active item into view
      if (scrollContainerRef.current) {
        const activeElement = scrollContainerRef.current.children[currentIndex] as HTMLElement;
        if (activeElement) {
          activeElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }
    }
  }, [location.pathname]);

  return (
    <>
      {/* Spacer */}
      <div className="h-20 md:hidden" />

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        {/* Glassmorphism background */}
        <div className="relative bg-white/90 dark:bg-black/80 backdrop-blur-xl shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] border-t border-white/20 dark:border-white/10">

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 px-4 py-3 overflow-x-auto no-scrollbar scroll-smooth safe-area-bottom"
          >
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === activeIndex;
              const isSpecial = item.special;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative flex flex-col items-center justify-center min-w-[64px] py-1 rounded-xl transition-all duration-300 shrink-0",
                    isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                  )}
                >
                  {/* Icon Container */}
                  <div className={cn(
                    "relative p-2 rounded-xl transition-all duration-300 mb-1",
                    isActive && isSpecial ? "bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/25" :
                      isActive ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" :
                        "bg-transparent text-muted-foreground"
                  )}>
                    <Icon className={cn(
                      "w-5 h-5",
                      isActive && isSpecial ? "text-white" :
                        isActive ? "text-white" :
                          "text-current"
                    )} />

                    {/* Special Sparkle */}
                    {isSpecial && isActive && (
                      <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-200 animate-pulse" />
                    )}
                  </div>

                  {/* Label */}
                  <span className={cn(
                    "text-[10px] font-medium tracking-wide transition-colors duration-300",
                    isActive && isSpecial ? "text-amber-600 dark:text-amber-400" :
                      isActive ? "text-primary" :
                        "text-muted-foreground"
                  )}>
                    {item.name}
                  </span>

                  {/* Active Indicator Dot */}
                  {isActive && (
                    <div className={cn(
                      "absolute -bottom-1 w-1 h-1 rounded-full",
                      isSpecial ? "bg-amber-500" : "bg-primary"
                    )} />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          .safe-area-bottom {
            padding-bottom: calc(0.5rem + env(safe-area-inset-bottom));
          }
        }
      `}</style>
    </>
  );
};

export default MobileBottomNav;
