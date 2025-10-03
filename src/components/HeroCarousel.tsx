import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const slides = [
  {
    title: "Capturing Moments,",
    highlight: "Creating Memories",
    description: "Professional photography and videography services for your special moments. We blend creativity with technical excellence to tell your unique story.",
    primaryCTA: "Explore Services",
    secondaryCTA: "View Portfolio",
  },
  {
    title: "Your Story,",
    highlight: "Beautifully Told",
    description: "From intimate moments to grand celebrations, we capture the essence of every occasion with artistic vision and technical precision.",
    primaryCTA: "Our Services",
    secondaryCTA: "Learn More",
  },
  {
    title: "Excellence in",
    highlight: "Every Frame",
    description: "Premium photography and videography that transforms your special moments into timeless art. Let's create something extraordinary together.",
    primaryCTA: "Get Started",
    secondaryCTA: "See Portfolio",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="Photography Studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/70 dark:from-background/90 dark:via-background/75 dark:to-background/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                index === currentSlide
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 absolute translate-y-4 pointer-events-none"
              }`}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
                {slide.title}
                <br />
                <span className="gradient-text">{slide.highlight}</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 group"
                  onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                >
                  {slide.primaryCTA}
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 group"
                  onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <Play className="mr-2 w-5 h-5" />
                  {slide.secondaryCTA}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full glass hover:bg-primary/20 transition-all group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full glass hover:bg-primary/20 transition-all group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-primary"
                : "w-2 bg-primary/30 hover:bg-primary/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-float" />
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
