import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Sparkles, Camera, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useBooking } from "@/hooks/useBooking";

const Header = () => {
  const { openBooking } = useBooking();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    const isDark = saved === "true";
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
    return isDark;
  });

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode.toString());
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Education", href: "/courses" },
    { name: "Experience", href: "/experience", special: true },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Collaborations", href: "/collaborations" },
    { name: "Prints", href: "/prints" },
    { name: "Contact", href: "/contact" },
  ];

  // Determine text color based on page and scroll state
  const getTextColor = () => {
    if (isHomePage) {
      // On home page: white until scrolled, then theme color
      return isScrolled
        ? 'text-foreground/80 hover:text-primary'
        : 'text-white hover:text-white/80';
    } else {
      // On other pages: always use theme color
      return 'text-foreground/80 hover:text-primary';
    }
  };

  const getMobileMenuColor = () => {
    if (isHomePage && !isScrolled) {
      return 'text-white';
    }
    return '';
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-0",
        isScrolled ? "glass shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Studio Name */}
          <Link to="/" className="flex items-center gap-1.5 md:gap-2 group">
            <img
              src="/logo.png"
              alt="Trixietales"
              className="h-8 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              fetchPriority="high"
            />
            <span className="ml-1 md:ml-2 text-lg md:text-2xl font-semibold gradient-text relative inline-block">
              Trixietales
              <Camera className="orbit-camera text-primary hidden md:block" />
              <Camera className="orbit-camera text-accent hidden md:block" style={{ animationDelay: '2s' }} />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`transition-colors font-medium relative group ${link.special ? 'animate-pulse' : ''
                  } ${getTextColor()}`}
                style={link.special && isHomePage && !isScrolled ? {
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)',
                  fontWeight: 'bold'
                } : link.special ? {
                  fontWeight: 'bold'
                } : {}}
              >
                {link.name}
                {link.special && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse text-accent" />}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
            <Button
              onClick={openBooking}
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Online</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="ml-2 text-primary hover:text-accent hover:bg-primary/10 transition-all duration-300"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </nav>

          {/* Mobile Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              onClick={openBooking}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-3 shadow-lg shadow-primary/20 transition-all text-[10px] h-7 flex items-center gap-1"
            >
              <Calendar className="w-3 h-3" />
              <span>Book</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={cn(
                "transition-all duration-300",
                isHomePage && !isScrolled
                  ? "text-white hover:text-white/80 hover:bg-white/10"
                  : "text-primary hover:text-accent hover:bg-primary/10"
              )}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>

        </div>

      </div>
    </header>
  );
};

export default Header;