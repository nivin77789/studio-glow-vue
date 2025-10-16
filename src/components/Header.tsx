import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, Camera, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const getLogoColor = () => {
    if (isHomePage && !isScrolled) {
      return 'text-white';
    }
    return 'text-primary';
  };

  const getMobileMenuColor = () => {
    if (isHomePage && !isScrolled) {
      return 'text-white';
    }
    return '';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Camera className={`w-8 h-8 transition-all group-hover:scale-110 ${getLogoColor()}`} />
            <span className={`text-2xl font-bold transition-colors ${isHomePage && !isScrolled ? 'text-white' : 'gradient-text'}`}>
              Mark Studio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`transition-colors font-medium relative group ${
                  link.special ? 'animate-pulse' : ''
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

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="text-primary hover:text-accent hover:bg-primary/10 transition-all duration-300"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={getMobileMenuColor()}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`block py-3 transition-colors font-medium ${getTextColor()}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;