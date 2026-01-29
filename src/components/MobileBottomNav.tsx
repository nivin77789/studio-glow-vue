import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, GraduationCap, Image, Users, Printer, Phone, Sparkles, Menu, X, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBooking } from "@/hooks/useBooking";

const MobileBottomNav = () => {
  const { openBooking } = useBooking();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Book", onClick: openBooking, icon: Calendar, highlight: true },
    { name: "Education", href: "/courses", icon: GraduationCap },
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

  // Arc configuration
  const radius = 135; // Adjusted distance
  const totalItems = navItems.length;

  const getItemPosition = (index: number) => {
    const startAngle = 200; // Wider start
    const endAngle = -20; // Wider end
    const totalAngle = startAngle - endAngle;
    const step = totalAngle / (totalItems - 1);

    const angleInDegrees = startAngle - (index * step);
    const angleInRadians = (angleInDegrees * Math.PI) / 180;

    const x = Math.cos(angleInRadians) * radius;
    const y = -Math.sin(angleInRadians) * radius;

    return { x, y };
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu Container */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[10000] md:hidden flex items-center justify-center">

        {/* Arc Items */}
        {navItems.map((item, index) => {
          const pos = getItemPosition(index);
          const isActive = index === activeIndex;

          const content = (
            <>
              <item.icon className="w-4 h-4" />
              {/* Label */}
              <span
                className={cn(
                  "absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-black/40 text-white backdrop-blur-md whitespace-nowrap transition-opacity duration-300",
                  isOpen ? "opacity-100" : "opacity-0"
                )}
                style={{ transitionDelay: isOpen ? `${index * 0.05 + 0.2}s` : '0s' }}
              >
                {item.name}
              </span>
            </>
          );

          const commonProps = {
            className: cn(
              "absolute flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-500",
              "bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm",
              item.highlight ? "bg-primary text-white scale-110 shadow-primary/40 border-primary" : "border border-white/20",
              isActive ? "text-primary ring-2 ring-primary" : item.highlight ? "text-white" : "text-muted-foreground hover:text-primary"
            ),
            style: {
              transform: isOpen
                ? `translate(${pos.x}px, ${pos.y}px)`
                : `translate(0px, 0px) scale(0.5)`,
              opacity: isOpen ? 1 : 0,
              transitionDelay: isOpen ? `${index * 0.05}s` : '0s'
            }
          };

          if ('onClick' in item) {
            return (
              <button
                key={item.name}
                {...commonProps}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={item.name}
              {...commonProps}
              to={item.href || "/"}
              onClick={() => setIsOpen(false)}
            >
              {content}
            </Link>
          );
        })}

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative z-50 w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-transform duration-300",
            "bg-gradient-to-r from-primary/90 to-accent/90 text-primary-foreground backdrop-blur-sm",
            isOpen ? "rotate-45" : "hover:scale-105"
          )}
        >
          <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
    </>
  );
};

export default MobileBottomNav;
