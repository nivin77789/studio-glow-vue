import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Heart,
  Sparkles,
  Film,
  Music,
  Baby,
  Home,
  Cake,
  PartyPopper,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
} from "lucide-react";

// Local gallery images
const galleryImages = {
  Wedding: ["/images/wed/Wedding/1.jpeg", "/images/wed/Wedding/2.jpeg", "/images/wed/Wedding/3.jpeg", "/images/wed/Wedding/4.jpeg", "/images/wed/Wedding/5.jpeg"],
  Engagement: ["/images/wed/Wedding/6.jpeg", "/images/wed/Wedding/7.jpeg", "/images/wed/Wedding/8.jpeg", "/images/wed/Wedding/9.jpeg"],
  Maternity: ["/images/wed/Wedding/10.jpeg", "/images/wed/Wedding/11.jpeg", "/images/wed/Wedding/12.jpeg", "/images/wed/Wedding/13.jpeg"],
  "House Warming": ["/images/wed/Wedding/14.jpeg", "/images/wed/Wedding/15.jpeg", "/images/wed/Wedding/16.jpeg"],
  Birthday: ["/images/wed/Wedding/17.jpeg", "/images/wed/Wedding/18.jpeg", "/images/wed/Wedding/19.jpeg", "/images/wed/Wedding/20.jpeg"],
  Concert: ["/images/wed/Wedding/21.jpeg", "/images/wed/Wedding/22.jpeg", "/images/wed/Wedding/23.jpeg", "/images/wed/Wedding/24.jpeg"],
};

// Videos for cards
const services = [
  {
    icon: Heart,
    title: "Wedding",
    description: "Capturing timeless wedding moments with elegance and love.",
    category: "Wedding",
    video: "/gif/wed.mp4",
  },
  {
    icon: Sparkles,
    title: "Engagement",
    description: "Beautiful engagement stories told through cinematic frames.",
    category: "Engagement",
    video: "/gif/engagement.mp4",
  },
  {
    icon: Film,
    title: "Stories",
    description: "Personalized love and life stories woven into visuals.",
    category: "Wedding",
    video: "/gif/stories.mp4",
  },
  {
    icon: Music,
    title: "Reception",
    description: "Joyful receptions captured with vibrant details.",
    category: "Wedding",
    video: "/gif/reception.mp4",
  },
  {
    icon: PartyPopper,
    title: "Haldi",
    description: "Colorful haldi ceremonies with vibrant traditions.",
    category: "Wedding",
    video: "/gif/haldi.mp4",
  },
  {
    icon: Baby,
    title: "Maternity",
    description: "Beautiful maternity moments filled with love & hope.",
    category: "Maternity",
    video: "/gif/maternity.mp4",
  },
  {
    icon: Home,
    title: "House Warming",
    description: "Memorable beginnings in your dream home.",
    category: "House Warming",
    video: "/gif/housewarming.mp4",
  },
  {
    icon: Cake,
    title: "Birthday",
    description: "Fun and colorful birthday celebrations.",
    category: "Birthday",
    video: "/gif/birthday.mp4",
  },
  {
    icon: PartyPopper,
    title: "Concerts",
    description: "Live concert energy captured with passion.",
    category: "Concert",
    video: "/gif/concert.mp4",
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/tablet on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCardClick = (category) => {
    setSelectedService(category);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => setSelectedService(null);
  const nextImage = () => {
    const images = galleryImages[selectedService];
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    const images = galleryImages[selectedService];
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentGallery = selectedService ? galleryImages[selectedService] : [];

  return (
    <section className="py-24 relative overflow-hidden transition-colors duration-300">
      {/* Photography-themed background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-5xl font-bold mb-4 gradient-text">
            Our Portfolio
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our work across different occasions and celebrations.
          </p>
        </div>

        {/* Cards Carousel */}
        <div className="relative">
          <Carousel
            opts={{ align: "start", dragFree: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {services.map((service, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-3/4 sm:basis-1/2 lg:basis-1/4">
                  <div
                    className="group"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div
                      onClick={() => handleCardClick(service.category)}
                      className="relative cursor-pointer rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all aspect-square w-full"
                    >
                      {/* Background Video */}
                      <video
                        ref={(el) => {
                          if (el) {
                            if (isMobile || hoveredIndex === index) {
                              el.play();
                            } else {
                              el.pause();
                              el.currentTime = 0;
                            }
                          }
                        }}
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover scale-125"
                      >
                        <source src={service.video} type="video/mp4" />
                      </video>

                      {/* Overlay for readability */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                    </div>

                    {/* Title below card */}
                    <h3 className="text-xl font-semibold mt-4 text-center text-gray-800 dark:text-gray-200">
                      {service.title}
                    </h3>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-6 md:-left-10" />
            <CarouselNext className="-right-6 md:-right-10" />
          </Carousel>
        </div>
      </div>

      {/* Gallery Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4"
          onClick={closeGallery}
        >
          <div className="relative w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeGallery}
              className="absolute -top-4 md:-top-4 top-4 right-0 md:right-0 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all hover:rotate-90 duration-300 group z-10"
              aria-label="Close gallery"
            >
              <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-white">{selectedService} Gallery</h3>
              <p className="text-white/70 mt-2">
                {currentImageIndex + 1} / {currentGallery.length}
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={currentGallery[currentImageIndex]}
                alt={`${selectedService} ${currentImageIndex + 1}`}
                className="w-full h-[70vh] object-contain transition-all duration-500 ease-in-out transform scale-100 hover:scale-[1.02]"
              />
              {currentGallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 mt-6 overflow-x-auto pb-2 px-1">
              {currentGallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentImageIndex
                      ? "border-primary ring-2 ring-primary/60"
                      : "border-white/20 hover:border-white/50"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
      `}</style>
    </section>
  );
}