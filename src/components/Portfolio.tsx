import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { X, ZoomIn, Heart, Share2, Camera, ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  "All",
  "Wedding",
  "Birthday",
  "Maternity",
  "Concert",
  "Engagement",
  "House Warming",
];

const portfolioItems = [
  { 
    id: 1, 
    category: "Wedding", 
    title: "Elegant Wedding Ceremony",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    featured: true
  },
  { 
    id: 2, 
    category: "Birthday", 
    title: "Children's Birthday Party",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80"
  },
  { 
    id: 3, 
    category: "Maternity", 
    title: "Expecting Joy",
    image: "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=800&q=80"
  },
  { 
    id: 4, 
    category: "Concert", 
    title: "Live Music Performance",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80"
  },
  { 
    id: 5, 
    category: "Engagement", 
    title: "Romantic Engagement Session",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80"
  },
  { 
    id: 6, 
    category: "House Warming", 
    title: "New Home Celebration",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
  },
  { 
    id: 7, 
    category: "Wedding", 
    title: "Beach Wedding",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    featured: true
  },
  { 
    id: 8, 
    category: "Birthday", 
    title: "Milestone Birthday",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80"
  },
  { 
    id: 9, 
    category: "Maternity", 
    title: "Golden Hour Maternity",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80"
  },
  { 
    id: 10, 
    category: "Concert", 
    title: "Rock Concert Energy",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80"
  },
  { 
    id: 11, 
    category: "Engagement", 
    title: "Sunset Engagement",
    image: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80",
    featured: true
  },
  { 
    id: 12, 
    category: "Wedding", 
    title: "Traditional Ceremony",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80"
  },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [likedImages, setLikedImages] = useState(new Set());
  const { ref, isVisible } = useScrollReveal();

  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  const featuredImage = filteredItems.find(item => item.featured) || filteredItems[0];
  const gridImages = filteredItems.filter(item => item.id !== featuredImage.id).slice(0, 5);

  const toggleLike = (id) => {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? filteredItems.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => 
      prev === filteredItems.length - 1 ? 0 : prev + 1
    );
  };

  const currentImage = selectedImageIndex !== null ? filteredItems[selectedImageIndex] : null;

  return (
    <>
      <section id="portfolio" className="py-24 bg-muted/30" ref={ref}>
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of beautifully captured moments across various events and celebrations.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="transition-all duration-300 hover:scale-105"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Featured Gallery Grid */}
          <div className="grid gap-6">
            {/* Featured Large Image */}
            <div 
              className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="relative aspect-[21/9] overflow-hidden">
                <img
                  src={featuredImage.image}
                  alt={featuredImage.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <Badge className="mb-3 bg-white/20 backdrop-blur-sm text-white border-0">
                      {featuredImage.category}
                    </Badge>
                    <h3 className="text-3xl font-bold text-white mb-4">{featuredImage.title}</h3>
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="backdrop-blur-sm bg-white/20 hover:bg-white/30 text-white border-0"
                        onClick={() => setSelectedImageIndex(filteredItems.findIndex(item => item.id === featuredImage.id))}
                      >
                        <ZoomIn className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className={`backdrop-blur-sm border-0 ${
                          likedImages.has(featuredImage.id)
                            ? 'bg-red-500/80 hover:bg-red-500 text-white'
                            : 'bg-white/20 hover:bg-white/30 text-white'
                        }`}
                        onClick={() => toggleLike(featuredImage.id)}
                      >
                        <Heart className={`w-4 h-4 ${likedImages.has(featuredImage.id) ? 'fill-current' : ''}`} />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="backdrop-blur-sm bg-white/20 hover:bg-white/30 text-white border-0"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid of Smaller Images */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {gridImages.map((item, index) => (
                <div
                  key={item.id}
                  className={`group relative aspect-square overflow-hidden rounded-xl cursor-pointer transition-all duration-500 hover:scale-105 hover:z-10 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedImageIndex(filteredItems.findIndex(i => i.id === item.id))}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <Badge className="mb-2 bg-white/20 backdrop-blur-sm text-white text-xs border-0">
                        {item.category}
                      </Badge>
                      <h4 className="text-white text-sm font-semibold text-center line-clamp-2">
                        {item.title}
                      </h4>
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(item.id);
                          }}
                        >
                          <Heart className={`w-4 h-4 ${likedImages.has(item.id) ? 'fill-current text-red-500' : ''}`} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white"
                        >
                          <ZoomIn className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Carousel Modal */}
      {currentImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
            onClick={() => setSelectedImageIndex(null)}
          >
            <X className="w-6 h-6" />
          </Button>
          
          {/* Previous Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 z-10 h-12 w-12"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          {/* Next Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 z-10 h-12 w-12"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm z-10">
            {selectedImageIndex + 1} / {filteredItems.length}
          </div>
          
          <div className="relative max-w-6xl w-full px-16 animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <img
              src={currentImage.image}
              alt={currentImage.title}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <Badge className="mb-2 bg-white/20 backdrop-blur-sm text-white border-0">
                {currentImage.category}
              </Badge>
              <h3 className="text-2xl font-bold text-white mb-4">{currentImage.title}</h3>
              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant="secondary"
                  className={`backdrop-blur-sm border-0 ${
                    likedImages.has(currentImage.id)
                      ? 'bg-red-500/80 hover:bg-red-500 text-white'
                      : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                  onClick={() => toggleLike(currentImage.id)}
                >
                  <Heart className={`w-4 h-4 mr-2 ${likedImages.has(currentImage.id) ? 'fill-current' : ''}`} />
                  {likedImages.has(currentImage.id) ? 'Liked' : 'Like'}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="backdrop-blur-sm bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-3xl px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full">
            {filteredItems.slice(Math.max(0, selectedImageIndex - 3), Math.min(filteredItems.length, selectedImageIndex + 4)).map((item, idx) => {
              const actualIndex = filteredItems.findIndex(i => i.id === item.id);
              return (
                <button
                  key={item.id}
                  className={`w-16 h-16 rounded-lg overflow-hidden transition-all ${
                    actualIndex === selectedImageIndex 
                      ? 'ring-2 ring-white scale-110' 
                      : 'opacity-50 hover:opacity-100'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(actualIndex);
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

    </>
  );
};

export default Portfolio;