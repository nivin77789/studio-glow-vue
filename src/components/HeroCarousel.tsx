import { useState, useEffect } from "react";
import { Camera, Aperture, Sparkles, Video, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const bannerImages = [
  {
    url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=80",
    title: "Wedding Photography",
    subtitle: "Capturing Your Perfect Day",
  },
  {
    url: "https://images.unsplash.com/photo-1660307777355-f08bced145d3?w=1920&q=80",
    title: "Cinematic Videography",
    subtitle: "Stories That Move You",
  },
  {
    url: "https://images.unsplash.com/photo-1637338907536-83a6f6a8aa84?w=1920&q=80",
    title: "Event Coverage",
    subtitle: "Every Celebration Deserves Magic",
  },
];

const HeroLanding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden text-white"
    >
      {/* Carousel Background */}
      <div className="absolute inset-0 z-0">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      {/* Cinematic background overlays */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {/* Light leaks */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 mix-blend-screen animate-pulse" style={{ animationDuration: "8s" }} />
        
        {/* Floating spheres */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float-rotate" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDuration: "7s" }} />

        {/* Focus rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[200px] h-[200px] border border-white/10 rounded-full animate-focus" />
          <div className="w-[300px] h-[300px] border border-white/5 rounded-full animate-focus" style={{ animationDelay: "0.5s" }} />
        </div>
      </div>

      {/* Floating animated icons */}
      <div className="absolute top-1/4 right-10 hidden lg:block animate-float-icon">
        <Camera className="w-12 h-12 text-primary/60" />
      </div>

      <div className="absolute bottom-1/3 right-1/4 hidden lg:block animate-float-icon" style={{ animationDelay: "1.5s" }}>
        <Heart className="w-12 h-12 text-accent/60" />
      </div>

      {/* Carousel Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
      </button>

      {/* Main content - Left aligned */}
      <div className="container mx-auto px-6 lg:px-12 z-10">
        <div className="max-w-2xl animate-fade-in">
          <div className="mb-6">
            <span className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm font-medium animate-slide-right">
              Mark Studio
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight animate-slide-right" style={{ animationDelay: "0.2s" }}>
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-size-200 animate-gradient">
              {bannerImages[currentSlide].title}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light animate-slide-right" style={{ animationDelay: "0.4s" }}>
            {bannerImages[currentSlide].subtitle}
          </p>

          <div className="flex flex-wrap gap-4 animate-slide-right" style={{ animationDelay: "0.6s" }}>
            <Button
              size="lg"
              className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Book a Shoot
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg font-semibold border-2 border-white/50 text-white bg-white/10 backdrop-blur-md transition-all transform hover:scale-105"
            >
              View Portfolio
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? "w-12 h-3 bg-white rounded-full"
                : "w-3 h-3 bg-white/40 hover:bg-white/60 rounded-full"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style>{`
        @keyframes float-rotate {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes focus {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.1; }
        }
        @keyframes float-icon {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-right {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float-rotate {
          animation: float-rotate 12s ease-in-out infinite;
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-focus {
          animation: focus 4s ease-in-out infinite;
        }
        .animate-float-icon {
          animation: float-icon 6s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-right {
          animation: slide-right 0.8s ease-out;
          animation-fill-mode: both;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </section>
  );
};

export default HeroLanding;