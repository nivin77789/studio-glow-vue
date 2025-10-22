import { useState, useEffect } from "react";
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
  ArrowLeft,
  Play,
  Image,
  Video,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

// Gallery data with images and videos
const galleryData = {
  Wedding: {
    images: ["/images/wed/Wedding/1.jpeg", "/images/wed/Wedding/2.jpeg", "/images/wed/Wedding/3.jpeg", "/images/wed/Wedding/4.jpeg", "/images/wed/Wedding/5.jpeg"],
    videos: ["/videos/wedding1.mp4", "/videos/wedding2.mp4"],
  },
  Engagement: {
    images: [
      "/images/wed/Pre-Wedding/1.jpeg",
      "/images/wed/Pre-Wedding/2.jpeg",
      "/images/wed/Pre-Wedding/3.jpeg",
      "/images/wed/Pre-Wedding/4.jpeg",
      "/images/wed/Pre-Wedding/5.jpeg",
      "/images/wed/Pre-Wedding/6.jpeg",
      "/images/wed/Pre-Wedding/7.jpeg",
      "/images/wed/Pre-Wedding/8.jpeg",
      "/images/wed/Pre-Wedding/9.jpeg",
      "/images/wed/Pre-Wedding/10.jpeg",
      "/images/wed/Pre-Wedding/11.jpeg",
      "/images/wed/Pre-Wedding/12.jpeg",
      "/images/wed/Pre-Wedding/13.jpeg",
      "/images/wed/Pre-Wedding/14.jpeg",
      "/images/wed/Pre-Wedding/15.jpeg",
      "/images/wed/Pre-Wedding/16.jpeg",
      "/images/wed/Pre-Wedding/17.jpeg",
      "/images/wed/Pre-Wedding/18.jpeg",
    ],
    videos: ["/videos/engagement1.mp4"],
  },
  Maternity: {
    images: [
      "/images/babyshower/1.jpeg",
      "/images/babyshower/2.jpeg",
      "/images/babyshower/3.jpeg",
      "/images/babyshower/4.jpeg",
      "/images/babyshower/5.jpeg",
      "/images/babyshower/6.jpeg",
    ],
    videos: ["/videos/maternity1.mp4"],
  },
  "House Warming": {
    images: ["/images/wed/Wedding/14.jpeg", "/images/wed/Wedding/15.jpeg", "/images/wed/Wedding/16.jpeg"],
    videos: [],
  },
  Birthday: {
    images: [
      "/images/birthday/1.jpeg",
      "/images/birthday/2.jpeg",
      "/images/birthday/3.jpeg",
      "/images/birthday/4.jpeg",
      "/images/birthday/5.jpeg",
      "/images/birthday/6.jpeg",
      "/images/birthday/7.jpeg",
      "/images/birthday/8.jpeg",
      "/images/birthday/9.jpeg",
      "/images/birthday/10.jpeg",
      "/images/birthday/11.jpeg",
      "/images/birthday/12.jpeg",
      "/images/birthday/13.jpeg",
      "/images/birthday/14.jpeg",
      "/images/birthday/15.jpeg",
      "/images/birthday/16.jpeg",
      "/images/birthday/17.jpeg",
      "/images/birthday/18.jpeg",
      "/images/birthday/19.jpeg",
      "/images/birthday/20.jpeg",
      "/images/birthday/21.jpeg",
      "/images/birthday/22.jpeg",
      "/images/birthday/23.jpeg",
      "/images/birthday/24.jpeg",
      "/images/birthday/25.jpeg",
      "/images/birthday/26.jpeg",
    ],
    videos: ["/videos/birthday1.mp4"],
  },
  Stories: {
    images: [
      "/images/wed/Sangeeth/1.jpeg",
      "/images/wed/Sangeeth/2.jpeg",
      "/images/wed/Sangeeth/3.jpeg",
      "/images/wed/Sangeeth/4.jpeg",
      "/images/wed/Sangeeth/5.jpeg",
      "/images/wed/Sangeeth/6.jpeg",
    ],
    videos: ["/videos/stories1.mp4"],
  },
  NamingCeremony: {
    images: [
      "/images/wed/namecer/1.jpeg",
      "/images/wed/namecer/2.jpeg",
      "/images/wed/namecer/3.jpeg",
      "/images/wed/namecer/4.jpeg",
      "/images/wed/namecer/5.jpeg",
      "/images/wed/namecer/6.jpeg",
    ],
    videos: ["/videos/naming1.mp4"],
  },
  Concert: {
    images: [
      "/images/wed/Sangeeth/1.jpeg",
      "/images/wed/Sangeeth/2.jpeg",
      "/images/wed/Sangeeth/3.jpeg",
      "/images/wed/Sangeeth/4.jpeg",
      "/images/wed/Sangeeth/5.jpeg",
      "/images/wed/Sangeeth/6.jpeg",
    ],
    videos: ["/videos/concert1.mp4", "/videos/concert2.mp4"],
  },
  
  Haldi: {
    images: [
      "/images/wed/Haldi/1.jpeg",
      "/images/wed/Haldi/2.jpeg",
      "/images/wed/Haldi/3.jpeg",
      "/images/wed/Haldi/4.jpeg",
      "/images/wed/Haldi/5.jpeg",
      "/images/wed/Haldi/6.jpeg",
      "/images/wed/Haldi/7.jpeg",
      "/images/wed/Haldi/8.jpeg",
      "/images/wed/Haldi/9.jpeg",
      "/images/wed/Haldi/10.jpeg",
      "/images/wed/Haldi/11.jpeg",
      "/images/wed/Haldi/12.jpeg",
      "/images/wed/Haldi/13.jpeg",
    ],
    videos: ["/videos/haldi1.mp4"],
  },
  Reception: {
    images: [
      "/images/wed/Pre-Wedding/1.jpeg",
      "/images/wed/Pre-Wedding/2.jpeg",
      "/images/wed/Pre-Wedding/3.jpeg",
      "/images/wed/Pre-Wedding/4.jpeg",
      "/images/wed/Pre-Wedding/5.jpeg",
      "/images/wed/Pre-Wedding/6.jpeg",
      "/images/wed/Pre-Wedding/7.jpeg",
      "/images/wed/Pre-Wedding/8.jpeg",
      "/images/wed/Pre-Wedding/9.jpeg",
      "/images/wed/Pre-Wedding/10.jpeg",
      "/images/wed/Pre-Wedding/11.jpeg",
      "/images/wed/Pre-Wedding/12.jpeg",
      "/images/wed/Pre-Wedding/13.jpeg",
      "/images/wed/Pre-Wedding/14.jpeg",
      "/images/wed/Pre-Wedding/15.jpeg",
      "/images/wed/Pre-Wedding/16.jpeg",
      "/images/wed/Pre-Wedding/17.jpeg",
      "/images/wed/Pre-Wedding/18.jpeg",
    ],
    videos: ["/videos/reception1.mp4"],
  },
  Annaprashna: {
    images: [
      "/images/Annaprashna/1.jpeg",
      "/images/Annaprashna/2.jpeg",
      "/images/Annaprashna/3.jpeg",
      "/images/Annaprashna/4.jpeg",
      "/images/Annaprashna/5.jpeg",
      "/images/Annaprashna/6.jpeg",
      "/images/Annaprashna/7.jpeg",
      "/images/Annaprashna/8.jpeg",
      "/images/Annaprashna/9.jpeg",
      "/images/Annaprashna/10.jpeg",
      "/images/Annaprashna/11.jpeg",
      "/images/Annaprashna/12.jpeg",
      "/images/Annaprashna/13.jpeg",
      "/images/Annaprashna/14.jpeg",
      "/images/Annaprashna/15.jpeg",
      "/images/Annaprashna/16.jpeg",
      "/images/Annaprashna/17.jpeg",
      "/images/Annaprashna/18.jpeg",
    ],
    videos: ["/videos/annaprashna1.mp4"],
  },
  BabyShoot: {
    images: [
      "/images/wed/babyshoot/1.jpeg",
      "/images/wed/babyshoot/2.jpeg",
      "/images/wed/babyshoot/3.jpeg",
      "/images/wed/babyshoot/4.jpeg",
      "/images/wed/babyshoot/5.jpeg",
      "/images/wed/babyshoot/6.jpeg",
    ],
    videos: ["/videos/babyshoot1.mp4"],
  },
};

const services = [
  { icon: Heart, title: "Wedding", category: "Wedding", video: "/gif/wed.mp4" },
  { icon: Sparkles, title: "Engagement", category: "Engagement", video: "/gif/engagement.mp4" },
  { icon: Film, title: "Stories", category: "Wedding", video: "/gif/stories.mp4" },
  { icon: Music, title: "Reception", category: "Wedding", video: "/gif/reception.mp4" },
  { icon: PartyPopper, title: "Haldi", category: "Haldi", video: "/gif/haldi.mp4" },
  { icon: Baby, title: "Maternity", category: "Maternity", video: "/gif/maternity.mp4" },
  { icon: Home, title: "House Warming", category: "House Warming", video: "/gif/housewarming.mp4" },
  { icon: Cake, title: "Birthday", category: "Birthday", video: "/gif/birthday.mp4" },
  { icon: PartyPopper, title: "Concerts", category: "Concert", video: "/gif/concert.mp4" },
  { icon: PartyPopper, title: "Annaprashna", category: "Annaprashna", video: "/gif/concert.mp4" },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState("images");
  const [lightboxItem, setLightboxItem] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setActiveTab("images");
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setLightboxItem(null);
  };

  const openLightbox = (type, index) => {
    setLightboxItem(type);
    setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxItem(null);

  const nextItem = () => {
    const items = lightboxItem === "image" 
      ? galleryData[selectedCategory].images 
      : galleryData[selectedCategory].videos;
    setLightboxIndex((prev) => (prev + 1) % items.length);
  };

  const prevItem = () => {
    const items = lightboxItem === "image" 
      ? galleryData[selectedCategory].images 
      : galleryData[selectedCategory].videos;
    setLightboxIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const currentGallery = selectedCategory ? galleryData[selectedCategory] : null;

  // Service Selection View
  if (!selectedCategory) {
    return (
      <section className="min-h-screen py-24 relative overflow-hidden">
        {/* Photography-themed background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 px-4 py-2 text-sm">Our Portfolio</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Explore Our Work
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our portfolio across different occasions and celebrations
            </p>
          </div>

          <div className="relative">
            <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {services.map((service, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-3/4 sm:basis-1/2 lg:basis-1/4">
                    <div
                      className="group hover-lift"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div
                        onClick={() => handleCategoryClick(service.category)}
                        className="relative cursor-pointer rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-500 aspect-square w-full"
                      >
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 transition-all duration-500"></div>
                        
                        {/* Icon Badge */}
                        <div className="absolute top-4 right-4 p-3 rounded-xl bg-white/20 backdrop-blur-md group-hover:bg-white/30 transition-all">
                          <service.icon className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold mt-4 text-center text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">
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
      </section>
    );
  }

  // Gallery View with Slidable Carousels
  return (
    <section className="min-h-screen py-12 relative overflow-hidden">
      {/* Photography-themed background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header with Back Button */}
        <div className="mb-8 animate-fade-in">
          <button
            onClick={handleBackToCategories}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 group"
          >
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-medium">Back to Categories</span>
          </button>
          
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">
              {selectedCategory} Gallery
            </h2>
          </div>
          <p className="text-muted-foreground flex items-center gap-3">
            <span className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              {currentGallery.images.length} Photos
            </span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              {currentGallery.videos.length} Videos
            </span>
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab("images")}
            className={`pb-3 px-4 font-semibold transition-all flex items-center gap-2 relative ${
              activeTab === "images"
                ? "text-primary"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <Image className="w-4 h-4" />
            Images ({currentGallery.images.length})
            {activeTab === "images" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`pb-3 px-4 font-semibold transition-all flex items-center gap-2 relative ${
              activeTab === "videos"
                ? "text-primary"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <Video className="w-4 h-4" />
            Videos ({currentGallery.videos.length})
            {activeTab === "videos" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600" />
            )}
          </button>
        </div>

        {/* Images Carousel */}
        {activeTab === "images" && (
          <div className="animate-fade-in">
            <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {currentGallery.images.map((img, idx) => (
                  <CarouselItem key={idx} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <div
                      onClick={() => openLightbox("image", idx)}
                      className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-slate-700"
                    >
                      <img
                        src={img}
                        alt={`${selectedCategory} ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* View Badge */}
                      <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <span className="flex items-center gap-1.5">
                          <Image className="w-3.5 h-3.5" />
                          View
                        </span>
                      </div>

                      {/* Image Number */}
                      <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full text-white text-xs font-medium">
                        {idx + 1}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-6 md:-left-10" />
              <CarouselNext className="-right-6 md:-right-10" />
            </Carousel>
          </div>
        )}

        {/* Videos Carousel */}
        {activeTab === "videos" && (
          <div className="animate-fade-in">
            {currentGallery.videos.length > 0 ? (
              <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {currentGallery.videos.map((video, idx) => (
                    <CarouselItem key={idx} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                      <div
                        onClick={() => openLightbox("video", idx)}
                        className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-slate-700"
                      >
                        <video
                          src={video}
                          className="w-full h-full object-cover"
                          muted
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                            <Play className="w-10 h-10 text-primary ml-1" fill="currentColor" />
                          </div>
                        </div>
                        
                        {/* Video Badge */}
                        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-medium flex items-center gap-1.5">
                          <Video className="w-3.5 h-3.5" />
                          Video {idx + 1}
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-6 md:-left-10" />
                <CarouselNext className="-right-6 md:-right-10" />
              </Carousel>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="p-6 rounded-full bg-primary/10 mb-4">
                  <Video className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No Videos Available
                </h3>
                <p className="text-muted-foreground">
                  Videos for this category will be added soon.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-6xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-2 right-0 md:-right-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all hover:rotate-90 duration-300 group z-10"
              aria-label="Close"
            >
              <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* Title */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-1">
                {selectedCategory} - {lightboxItem === "image" ? "Photo" : "Video"}
              </h3>
              <p className="text-white/70">
                {lightboxIndex + 1} of{" "}
                {lightboxItem === "image"
                  ? currentGallery.images.length
                  : currentGallery.videos.length}
              </p>
            </div>

            {/* Content */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
              {lightboxItem === "image" ? (
                <img
                  src={currentGallery.images[lightboxIndex]}
                  alt={`${selectedCategory} ${lightboxIndex + 1}`}
                  className="w-full max-h-[75vh] object-contain mx-auto"
                />
              ) : (
                <video
                  src={currentGallery.videos[lightboxIndex]}
                  controls
                  autoPlay
                  className="w-full max-h-[75vh] object-contain mx-auto"
                />
              )}

              {/* Navigation Arrows */}
              {((lightboxItem === "image" && currentGallery.images.length > 1) ||
                (lightboxItem === "video" && currentGallery.videos.length > 1)) && (
                <>
                  <button
                    onClick={prevItem}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all hover:scale-110 group"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={nextItem}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all hover:scale-110 group"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {lightboxItem === "image" && currentGallery.images.length > 1 && (
              <div className="flex gap-2 mt-6 overflow-x-auto pb-2 px-1 scrollbar-hide">
                {currentGallery.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === lightboxIndex
                        ? "border-primary ring-2 ring-primary/60 scale-105"
                        : "border-white/20 hover:border-white/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .gradient-text {
          background: linear-gradient(135deg, #f59e0b 0%, #eab308 50%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }
        .animate-pulse-slow {
          animation: pulseSlow 4s ease-in-out infinite;
        }
        .hover-lift {
          transition: transform 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}