import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const slides = [
  {
    title: "Capturing Moments,",
    highlight: "Creating Memories",
    description: "Professional photography and videography services for your special moments. We blend creativity with technical excellence to tell your unique story.",
    primaryCTA: "Explore Services",
    secondaryCTA: "View Portfolio",
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=80",
  },
  {
    title: "Your Story,",
    highlight: "Beautifully Told",
    description: "From intimate moments to grand celebrations, we capture the essence of every occasion with artistic vision and technical precision.",
    primaryCTA: "Our Services",
    secondaryCTA: "Learn More",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80",
  },
  {
    title: "Excellence in",
    highlight: "Every Frame",
    description: "Premium photography and videography that transforms your special moments into timeless art. Let's create something extraordinary together.",
    primaryCTA: "Get Started",
    secondaryCTA: "See Portfolio",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleSlideChange((currentSlide + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, currentSlide]);

  const handleSlideChange = (newSlide) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(newSlide);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const nextSlide = () => {
    handleSlideChange((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    handleSlideChange((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* 🔹 Adaptive Top Gradient Overlay */}
            <div
              className="
                absolute top-0 left-0 right-0 h-32 
                bg-gradient-to-b from-white/70 to-transparent 
                dark:from-black/80 dark:to-transparent
                pointer-events-none
              "
            />

            {/* Existing Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                index === currentSlide
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 absolute translate-y-8 scale-95 pointer-events-none"
              }`}
            >
              {/* Decorative element */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-slide-down">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-white font-medium">Premium Photography Services</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-white animate-slide-up">
                {slide.title}
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent animate-gradient">
                  {slide.highlight}
                </span>
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
                {slide.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Button
                  size="lg"
                  className="text-lg px-10 py-7 bg-white text-black hover:bg-white/90 group relative overflow-hidden"
                  onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <span className="relative z-10 flex items-center">
                    {slide.primaryCTA}
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-7 border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:border-white/50 group"
                  onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  {slide.secondaryCTA}
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-16 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">500+</div>
                  <div className="text-sm text-white/70">Happy Clients</div>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">1000+</div>
                  <div className="text-sm text-white/70">Events Covered</div>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">10+</div>
                  <div className="text-sm text-white/70">Years Experience</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`relative h-1 rounded-full transition-all duration-500 overflow-hidden ${
              index === currentSlide ? "w-12 bg-white" : "w-8 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 animate-shimmer" />
            )}
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 backdrop-blur-sm flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white rounded-full animate-scroll" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes gradient { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes scroll { 0% { transform: translateY(0); opacity:1; } 100% { transform: translateY(12px); opacity:0; } }

        .animate-float { animation: float linear infinite; }
        .animate-slide-up { animation: slide-up 0.6s ease-out; }
        .animate-slide-down { animation: slide-down 0.6s ease-out; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; animation-fill-mode: both; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
        .animate-shimmer { animation: shimmer 2s infinite; }
        .animate-scroll { animation: scroll 2s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default HeroCarousel;
