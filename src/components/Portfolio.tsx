import { useState } from "react";
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
} from "lucide-react";

// Local images instead of Unsplash
const galleryImages = {
  Wedding: ["/images/1.jpeg", "/images/2.jpeg", "/images/3.jpeg", "/images/4.jpeg", "/images/5.jpeg"],
  Engagement: ["/images/6.jpeg", "/images/7.jpeg", "/images/8.jpeg", "/images/9.jpeg"],
  Maternity: ["/images/10.jpeg", "/images/11.jpeg", "/images/12.jpeg", "/images/13.jpeg"],
  "House Warming": ["/images/14.jpeg", "/images/15.jpeg", "/images/16.jpeg"],
  Birthday: ["/images/17.jpeg", "/images/18.jpeg", "/images/19.jpeg", "/images/20.jpeg"],
  Concert: ["/images/21.jpeg", "/images/22.jpeg", "/images/23.jpeg", "/images/24.jpeg"],
};

const services = [
  { icon: Heart, title: "Wedding", description: "Capturing timeless wedding moments with elegance and love.", category: "Wedding" },
  { icon: Sparkles, title: "Engagement", description: "Beautiful engagement stories told through cinematic frames.", category: "Engagement" },
  { icon: Film, title: "Stories", description: "Personalized love and life stories woven into visuals.", category: "Wedding" },
  { icon: Music, title: "Reception", description: "Joyful receptions captured with vibrant details.", category: "Wedding" },
  { icon: PartyPopper, title: "Haldi", description: "Colorful haldi ceremonies with vibrant traditions.", category: "Wedding" },
  { icon: Baby, title: "Maternity", description: "Beautiful maternity moments filled with love & hope.", category: "Maternity" },
  { icon: Home, title: "House Warming", description: "Memorable beginnings in your dream home.", category: "House Warming" },
  { icon: Cake, title: "Birthday", description: "Fun and colorful birthday celebrations.", category: "Birthday" },
  { icon: PartyPopper, title: "Concerts", description: "Live concert energy captured with passion.", category: "Concert" },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAll, setShowAll] = useState(false); // for "See More"

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

  // Limit cards shown before "See More"
  const visibleServices = showAll ? services : services.slice(0, 4);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 transition-colors duration-300 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Our Portfolio
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our work across different occasions and celebrations.
          </p>
        </div>

        {/* Service cards */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`}>
          {visibleServices.map((service, index) => (
            <div
              key={index}
              className="group cursor-pointer bg-white dark:bg-slate-800 rounded-xl shadow-md card-glow p-6 fade-in border border-gray-100 dark:border-slate-700 transition-all"
              onClick={() => handleCardClick(service.category)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`mb-4 inline-flex p-3 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all icon-container ${
                  hoveredIndex === index ? "icon-bounce" : "icon-float"
                }`}
              >
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all"
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>
      </div>

      {/* Gallery Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4" onClick={closeGallery}>
          <div className="relative w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeGallery} className="absolute -top-12 right-0 text-white hover:text-purple-400 transition">
              <X className="w-8 h-8" />
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
                      ? "border-purple-500 ring-2 ring-purple-400"
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
    </section>
  );
}
