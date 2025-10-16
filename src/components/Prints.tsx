import { useState, useRef, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Frame, BookOpen, Calendar, Image, Sparkles, X, Upload, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import frameClassic from "@/assets/prints-frame-classic.jpg";
import frameModern from "@/assets/prints-frame-modern.jpg";
import albumPortrait from "@/assets/prints-album-portrait.jpg";
import albumLandscape from "@/assets/prints-album-landscape.jpg";
import calendarImg from "@/assets/prints-calendar.jpg";
import magazineImg from "@/assets/prints-magazine.jpg";

interface PrintType {
  id: string;
  name: string;
  icon: any;
  description: string;
  variants?: { name: string; image: string }[];
}

const printTypes: PrintType[] = [
  {
    id: "frames",
    name: "Premium Frames",
    icon: Frame,
    description: "Beautiful custom frames in various styles",
    variants: [
      { name: "Classic Wooden Frame", image: frameClassic },
      { name: "Modern Metal Frame", image: frameModern },
      { name: "Vintage Gold Frame", image: frameClassic },
      { name: "Minimalist Black Frame", image: frameModern },
      { name: "Rustic Oak Frame", image: frameClassic },
      { name: "Contemporary White Frame", image: frameModern }
    ]
  },
  {
    id: "portrait-album",
    name: "Portrait Albums",
    icon: BookOpen,
    description: "Elegant portrait orientation photo albums",
    variants: [
      { name: "Leather Bound Portrait", image: albumPortrait },
      { name: "Classic Portrait Album", image: albumPortrait },
      { name: "Premium Portrait Collection", image: albumPortrait },
      { name: "Modern Portrait Book", image: albumPortrait }
    ]
  },
  {
    id: "landscape-album",
    name: "Landscape Albums",
    icon: BookOpen,
    description: "Stunning landscape orientation albums",
    variants: [
      { name: "Panoramic Landscape Album", image: albumLandscape },
      { name: "Wide Format Collection", image: albumLandscape },
      { name: "Premium Landscape Book", image: albumLandscape },
      { name: "Modern Landscape Edition", image: albumLandscape }
    ]
  },
  {
    id: "calendar",
    name: "Custom Calendars",
    icon: Calendar,
    description: "Personalized calendars with your memories",
    variants: [
      { name: "Wall Calendar 2024", image: calendarImg },
      { name: "Desk Calendar", image: calendarImg },
      { name: "Premium Wall Calendar", image: calendarImg },
      { name: "Photo Calendar Collection", image: calendarImg }
    ]
  },
  {
    id: "magazine",
    name: "Photo Magazines",
    icon: Image,
    description: "Professional magazine-style photo books",
    variants: [
      { name: "Glossy Magazine Format", image: magazineImg },
      { name: "Matte Finish Magazine", image: magazineImg },
      { name: "Premium Photo Journal", image: magazineImg },
      { name: "Modern Photo Magazine", image: magazineImg }
    ]
  },
  {
    id: "canvas",
    name: "Canvas Prints",
    icon: Sparkles,
    description: "Museum-quality canvas prints",
    variants: [
      { name: "Stretched Canvas", image: frameModern },
      { name: "Framed Canvas Print", image: frameClassic },
      { name: "Gallery Wrap Canvas", image: frameModern },
      { name: "Premium Canvas Collection", image: frameClassic }
    ]
  }
];

const Prints = () => {
  const { ref, isVisible } = useScrollReveal();
  const [selectedPrint, setSelectedPrint] = useState<PrintType | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>("frame");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOrder = (printType: string, variant?: string) => {
    const message = variant 
      ? `Hi! I'd like to order ${variant} from ${printType}`
      : `Hi! I'd like to know more about ${printType}`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank');
    toast.success("Redirecting to WhatsApp...");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
        setShowPreview(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const ProductPreview = () => {
    const [imageAspectRatio, setImageAspectRatio] = useState(1);

    useEffect(() => {
      if (previewImage) {
        const img = new window.Image();
        img.onload = () => {
          setImageAspectRatio(img.width / img.height);
        };
        img.src = previewImage;
      }
    }, [previewImage]);

    // Calculate frame dimensions based on image aspect ratio
    const getFrameDimensions = () => {
      if (imageAspectRatio > 1.3) {
        // Landscape
        return { width: 'w-80 md:w-96', height: 'h-56 md:h-64' };
      } else if (imageAspectRatio < 0.8) {
        // Portrait
        return { width: 'w-56 md:w-64', height: 'h-80 md:h-96' };
      } else {
        // Square
        return { width: 'w-64 md:w-80', height: 'h-64 md:h-80' };
      }
    };

    const frameDims = getFrameDimensions();

    return (
      <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-border flex items-center justify-center">
        {/* Wall texture background */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `repeating-linear-gradient(90deg, rgba(0,0,0,.03) 0px, transparent 1px, transparent 2px, rgba(0,0,0,.03) 3px),
                           repeating-linear-gradient(180deg, rgba(0,0,0,.03) 0px, transparent 1px, transparent 2px, rgba(0,0,0,.03) 3px)`
        }} />

        {/* 3D Model Container */}
        <div className="relative flex items-center justify-center">
          {/* IKEA-style Frame 3D Model */}
          {selectedProduct === "frame" && (
            <div className={`relative ${frameDims.width} ${frameDims.height} transform-gpu`} style={{ perspective: '1000px' }}>
              {/* Main frame container with 3D rotation */}
              <div className="relative w-full h-full" style={{ 
                transform: 'rotateY(-2deg) rotateX(1deg)',
                transformStyle: 'preserve-3d'
              }}>
                {/* Frame outer border - IKEA RIBBA style */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-900 rounded-sm shadow-2xl" style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255,255,255,0.1)'
                }}>
                  {/* Frame bevel - outer edge highlight */}
                  <div className="absolute inset-0 border border-neutral-600 rounded-sm" />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-neutral-500 to-transparent opacity-40" />
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-r from-neutral-500 to-transparent opacity-40" />
                  
                  {/* Frame width - realistic depth */}
                  <div className="absolute inset-3 bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-sm shadow-inner">
                    {/* Inner bevel */}
                    <div className="absolute inset-0 border border-neutral-900 rounded-sm" />
                    
                    {/* White mat board - IKEA style */}
                    <div className="absolute inset-2 bg-gradient-to-br from-white to-gray-50 rounded-sm shadow-lg">
                      {/* Mat board texture */}
                      <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
                        backgroundSize: '4px 4px'
                      }} />
                      
                      {/* Mat board inner opening */}
                      <div className="absolute inset-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-sm shadow-inner">
                        {/* Photo/Image */}
                        {previewImage ? (
                          <div 
                            className="absolute inset-0 bg-cover bg-center rounded-sm"
                            style={{ 
                              backgroundImage: `url(${previewImage})`,
                              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)'
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            <div className="text-center">
                              <Image className="w-16 h-16 mx-auto mb-2 opacity-30" />
                              <p className="text-sm">Upload a photo</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Glass reflection effect */}
                  <div className="absolute inset-3 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-sm pointer-events-none" />
                  <div className="absolute top-8 left-8 w-24 h-24 bg-white/20 blur-2xl rounded-full" />
                </div>
                
                {/* Frame shadow on wall */}
                <div className="absolute inset-0 rounded-sm" style={{
                  transform: 'translateZ(-20px)',
                  boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.4)'
                }} />
              </div>
              
              {/* Floor shadow */}
              <div className="absolute -bottom-8 left-8 right-8 h-4 bg-black/30 blur-xl rounded-full" style={{
                transform: 'translateZ(-50px) rotateX(90deg)'
              }} />
            </div>
          )}

          {/* Magazine 3D Model */}
          {selectedProduct === "magazine" && (
            <div className="relative w-48 h-64 md:w-56 md:h-80 transform-gpu" style={{ perspective: '1000px' }}>
              <div className="relative w-full h-full" style={{
                transform: 'rotateY(-15deg) rotateX(2deg)',
                transformStyle: 'preserve-3d'
              }}>
                {/* Magazine spine */}
                <div className="absolute -left-3 top-0 bottom-0 w-3 bg-gradient-to-r from-gray-900 to-gray-700 rounded-l-sm shadow-xl" style={{
                  transform: 'translateZ(-2px)'
                }} />
                
                {/* Back cover (slightly visible) */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-600 rounded-r-sm" style={{
                  transform: 'translateZ(-4px)'
                }} />
                
                {/* Front cover */}
                <div className="absolute inset-0 bg-white rounded-r-sm shadow-2xl overflow-hidden">
                  {previewImage ? (
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${previewImage})` }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600" />
                  )}
                  
                  {/* Magazine title bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-sm p-4">
                    <div className="h-2 bg-gray-300 rounded mb-2" />
                    <div className="h-2 bg-gray-200 rounded w-3/4" />
                  </div>
                  
                  {/* Glossy effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-10 right-10 w-32 h-32 bg-white/20 blur-3xl" />
                </div>
                
                {/* Pages effect */}
                <div className="absolute -right-1 top-1 bottom-1 w-1 bg-gradient-to-b from-white/80 to-white/30 rounded-r-sm" style={{
                  transform: 'translateZ(2px)'
                }} />
              </div>
              
              <div className="absolute -bottom-6 left-4 right-4 h-4 bg-black/30 blur-xl rounded-full" />
            </div>
          )}

          {/* Calendar 3D Model */}
          {selectedProduct === "calendar" && (
            <div className="relative w-64 h-48 md:w-80 md:h-56 transform-gpu" style={{ perspective: '1000px' }}>
              <div className="relative w-full h-full" style={{
                transform: 'rotateX(-8deg)',
                transformStyle: 'preserve-3d'
              }}>
                {/* Calendar base/stand */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-8 bg-gradient-to-b from-gray-400 to-gray-500 rounded-lg shadow-xl" style={{
                  transform: 'rotateX(90deg) translateZ(-4px)'
                }} />
                
                {/* Calendar back board */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white rounded-lg shadow-2xl border border-gray-200">
                  {/* Spiral binding holes at top */}
                  <div className="absolute top-2 left-0 right-0 flex justify-center gap-4">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-gray-300 rounded-full shadow-inner" />
                    ))}
                  </div>
                  
                  {/* Current month page */}
                  <div className="absolute inset-4 bg-white rounded shadow-lg overflow-hidden">
                    {/* Photo section */}
                    {previewImage ? (
                      <div 
                        className="absolute top-0 left-0 right-0 h-3/5 bg-cover bg-center"
                        style={{ backgroundImage: `url(${previewImage})` }}
                      />
                    ) : (
                      <div className="absolute top-0 left-0 right-0 h-3/5 bg-gradient-to-br from-blue-400 to-purple-500" />
                    )}
                    
                    {/* Month name */}
                    <div className="absolute top-[58%] left-0 right-0 h-10 bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                      <div className="text-white font-bold text-lg">DECEMBER 2024</div>
                    </div>
                    
                    {/* Calendar grid */}
                    <div className="absolute bottom-0 left-0 right-0 h-[32%] bg-white p-3">
                      <div className="grid grid-cols-7 gap-1 text-xs text-center">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                          <div key={i} className="font-semibold text-gray-600">{day}</div>
                        ))}
                        {[...Array(31)].map((_, i) => (
                          <div key={i} className="h-3 flex items-center justify-center text-gray-700 text-[10px]">
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 left-8 right-8 h-4 bg-black/30 blur-xl rounded-full" />
            </div>
          )}

          {/* Album 3D Model */}
          {selectedProduct === "album" && (
            <div className="relative w-56 h-64 md:w-64 md:h-80 transform-gpu" style={{ perspective: '1000px' }}>
              <div className="relative w-full h-full" style={{
                transform: 'rotateY(-20deg) rotateX(3deg)',
                transformStyle: 'preserve-3d'
              }}>
                {/* Album spine */}
                <div className="absolute -left-4 top-0 bottom-0 w-4 bg-gradient-to-r from-rose-900 to-rose-700 shadow-xl" style={{
                  transform: 'rotateY(-90deg) translateX(-2px)',
                  transformOrigin: 'right'
                }} />
                
                {/* Album cover */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-800 to-rose-600 rounded-r-lg shadow-2xl">
                  {/* Leather texture */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,.1) 2px, rgba(0,0,0,.1) 4px)`
                  }} />
                  
                  {/* Embossed border */}
                  <div className="absolute inset-4 border-2 border-rose-400/40 rounded">
                    {/* Photo window */}
                    {previewImage ? (
                      <div 
                        className="absolute inset-3 bg-cover bg-center rounded shadow-inner"
                        style={{ backgroundImage: `url(${previewImage})` }}
                      />
                    ) : (
                      <div className="absolute inset-3 bg-gradient-to-br from-rose-600 to-rose-400 rounded" />
                    )}
                    
                    {/* Title plate */}
                    <div className="absolute bottom-4 left-4 right-4 h-8 bg-gradient-to-r from-amber-600 to-amber-500 rounded shadow-lg flex items-center justify-center">
                      <div className="text-white font-serif text-sm tracking-wide">MEMORIES</div>
                    </div>
                  </div>
                  
                  {/* Leather shine */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-r-lg pointer-events-none" />
                  <div className="absolute top-12 right-12 w-32 h-32 bg-white/10 blur-3xl" />
                </div>
                
                {/* Pages stack */}
                <div className="absolute -right-2 top-2 bottom-2 w-2 bg-gradient-to-b from-white/60 to-white/20 rounded-r" style={{
                  transform: 'translateZ(4px)'
                }} />
                <div className="absolute -right-1 top-3 bottom-3 w-1 bg-gradient-to-b from-white/40 to-white/10 rounded-r" style={{
                  transform: 'translateZ(6px)'
                }} />
              </div>
              
              <div className="absolute -bottom-6 left-6 right-6 h-4 bg-black/30 blur-xl rounded-full" />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Stylish Banner */}
      <div className={`container mx-auto px-4 mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <div className="glass rounded-2xl p-6 border border-primary/20 hover-lift relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 animate-gradient-x" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">Try Our New AR Preview!</h3>
                <p className="text-muted-foreground">Upload your photo and see how it looks in our products</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <Button 
                onClick={triggerFileInput}
                className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              >
                <Upload className="w-4 h-4" />
                Upload Photo
              </Button>
              
              <select 
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="frame">Frame</option>
                <option value="magazine">Magazine</option>
                <option value="calendar">Calendar</option>
                <option value="album">Album</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float-rotate" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-float" style={{ animationDuration: '8s' }} />
      </div>

      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Print Your Memories</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transform your digital moments into timeless physical treasures
          </p>
        </div>

        <div className="relative">
          <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
          {printTypes.map((print, index) => {
            const Icon = print.icon;
            return (
              <CarouselItem key={print.id} className="pl-2 md:pl-4 basis-3/4 md:basis-1/2 lg:basis-1/3">
              <div
                className={`group relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  transform: isVisible ? 'perspective(1000px) rotateY(0deg)' : 'perspective(1000px) rotateY(-15deg)'
                }}
              >
                <div className="glass rounded-2xl p-8 hover-lift h-full transition-transform duration-500 hover:scale-105" 
                     style={{ transformStyle: 'preserve-3d' }}>
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
                  
                  {/* Icon with 3D animation */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-float-rotate">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:blur-2xl transition-all duration-300" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-foreground">{print.name}</h3>
                  <p className="text-muted-foreground mb-6">{print.description}</p>

                  <Button
                    onClick={() => setSelectedPrint(print)}
                    className="w-full group/btn"
                  >
                    <span>View Options</span>
                    <Sparkles className="ml-2 w-4 h-4 group-hover/btn:rotate-180 transition-transform duration-500" />
                  </Button>
                </div>
              </div>
              </CarouselItem>
            );
          })}
            </CarouselContent>
            <CarouselPrevious className="-left-6 md:-left-10" />
            <CarouselNext className="-right-6 md:-right-10" />
          </Carousel>
        </div>

        {/* CTA Section */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="glass rounded-3xl p-12 max-w-4xl mx-auto hover:scale-105 transition-transform duration-500">
            <h3 className="text-3xl font-bold mb-4 gradient-text">Custom Print Solutions</h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Can't find what you're looking for? We offer custom printing solutions tailored to your needs.
            </p>
            <Button size="lg" onClick={() => handleOrder("Custom Print Solutions")}>
              Contact Us for Custom Orders
            </Button>
          </div>
        </div>
      </div>

      {/* Variants Dialog */}
      <Dialog open={!!selectedPrint} onOpenChange={() => setSelectedPrint(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl gradient-text flex items-center gap-3">
              {selectedPrint && <selectedPrint.icon className="w-8 h-8" />}
              {selectedPrint?.name}
            </DialogTitle>
            <DialogDescription>
              Browse through our {selectedPrint?.name.toLowerCase()} options and select your favorite
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {selectedPrint?.variants?.map((variant, index) => (
              <div
                key={variant.name}
                className="group relative animate-scale-in hover:scale-105 transition-transform duration-300"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* 3D-style card effect */}
                <div className="relative overflow-hidden rounded-xl bg-card border border-border p-6 hover-lift transition-all duration-300 hover:shadow-2xl">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* 3D Image preview */}
                  <div className="relative mb-4 h-48 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <img 
                      src={variant.image} 
                      alt={variant.name}
                      className="w-full h-full object-cover"
                      style={{ transformStyle: 'preserve-3d' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                  </div>
                  
                  <h4 className="font-semibold text-lg mb-2 relative z-10">{variant.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4 relative z-10">
                    Premium quality {variant.name.toLowerCase()} with professional finishing
                  </p>
                  
                  <Button
                    onClick={() => handleOrder(selectedPrint.name, variant.name)}
                    className="w-full relative z-10"
                    variant="outline"
                  >
                    Order Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl gradient-text flex items-center gap-2">
              <Eye className="w-6 h-6" />
              3D Product Preview
            </DialogTitle>
            <DialogDescription>
              See how your photo looks in our {selectedProduct} product
            </DialogDescription>
          </DialogHeader>
          
          <ProductPreview />
          
          <div className="flex flex-col sm:flex-row gap-3 justify-end mt-6">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Close
            </Button>
            <Button 
              onClick={() => {
                handleOrder(`${selectedProduct.charAt(0).toUpperCase() + selectedProduct.slice(1)} Print`);
                setShowPreview(false);
              }}
              className="bg-gradient-to-r from-primary to-accent"
            >
              Order This Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Prints;