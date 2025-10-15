import { useState, useRef } from "react";
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
  // Removed showAll in favor of horizontal carousel controls
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>("frame");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const itemsPerRow = 3;

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
    return (
      <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 border border-border">
        {/* 3D Model Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Frame 3D Model */}
          {selectedProduct === "frame" && (
            <div className="relative w-48 h-48 md:w-64 md:h-64 transform-gpu perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-800 to-amber-600 rounded-lg shadow-2xl transform-gpu rotate-y-15">
                {/* Frame Border */}
                <div className="absolute inset-2 border-4 border-amber-200 rounded-md shadow-inner" />
                {/* Image inside frame */}
                {previewImage && (
                  <div 
                    className="absolute inset-4 m-2 bg-cover bg-center rounded-sm transform-gpu rotate-y-1"
                    style={{ backgroundImage: `url(${previewImage})` }}
                  />
                )}
                {/* Frame shine effect */}
                <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-amber-200 to-transparent opacity-60" />
                <div className="absolute top-1/4 left-0 w-1 h-1/2 bg-gradient-to-b from-transparent via-amber-200 to-transparent opacity-60" />
              </div>
              {/* Shadow */}
              <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/20 blur-md rounded-full" />
            </div>
          )}

          {/* Magazine 3D Model */}
          {selectedProduct === "magazine" && (
            <div className="relative w-32 h-48 md:w-40 md:h-60 transform-gpu perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-600 rounded-sm shadow-2xl transform-gpu rotate-y-25">
                {/* Magazine spine */}
                <div className="absolute -left-2 top-2 bottom-2 w-2 bg-gradient-to-b from-gray-900 to-gray-700 rounded-l-sm" />
                {/* Magazine cover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-sm">
                  {previewImage && (
                    <div 
                      className="absolute inset-1 bg-cover bg-center rounded-sm opacity-90"
                      style={{ backgroundImage: `url(${previewImage})` }}
                    />
                  )}
                  {/* Magazine title */}
                  <div className="absolute bottom-2 left-2 right-2 h-6 bg-white/20 backdrop-blur-sm rounded" />
                </div>
                {/* Pages effect */}
                <div className="absolute -right-1 top-1 bottom-1 w-1 bg-gradient-to-b from-white/30 to-white/10 rounded-r-sm" />
              </div>
              {/* Shadow */}
              <div className="absolute -bottom-4 left-2 right-2 h-4 bg-black/20 blur-md rounded-full transform-gpu rotate-y-25" />
            </div>
          )}

          {/* Calendar 3D Model */}
          {selectedProduct === "calendar" && (
            <div className="relative w-48 h-36 md:w-56 md:h-44 transform-gpu perspective-1000">
              <div className="absolute inset-0 bg-white rounded-lg shadow-2xl transform-gpu rotate-x-10">
                {/* Calendar stand */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-6 bg-gradient-to-b from-gray-400 to-gray-300 rounded-full" />
                {/* Calendar pages */}
                <div className="absolute inset-1 bg-gradient-to-b from-blue-50 to-white rounded border">
                  {previewImage && (
                    <div 
                      className="absolute top-0 left-0 right-0 h-3/5 bg-cover bg-center rounded-t"
                      style={{ backgroundImage: `url(${previewImage})` }}
                    />
                  )}
                  {/* Calendar grid */}
                  <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-white p-2">
                    <div className="grid grid-cols-7 gap-1">
                      {[...Array(7)].map((_, i) => (
                        <div key={i} className="h-2 bg-gray-200 rounded" />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Spiral binding */}
                <div className="absolute top-0 left-2 right-2 h-3 bg-gradient-to-b from-yellow-400 to-yellow-300 rounded-t" />
              </div>
              {/* Shadow */}
              <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/20 blur-md rounded-full" />
            </div>
          )}

          {/* Album 3D Model */}
          {selectedProduct === "album" && (
            <div className="relative w-40 h-48 md:w-48 md:h-56 transform-gpu perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-800 to-rose-600 rounded-lg shadow-2xl transform-gpu rotate-y-20">
                {/* Cover */}
                <div className="absolute inset-1 bg-gradient-to-br from-rose-600 to-rose-400 rounded border-2 border-rose-200">
                  {previewImage && (
                    <div 
                      className="absolute inset-2 bg-cover bg-center rounded opacity-80"
                      style={{ backgroundImage: `url(${previewImage})` }}
                    />
                  )}
                  {/* Title emboss */}
                  <div className="absolute bottom-3 left-3 right-3 h-4 bg-white/10 backdrop-blur-sm rounded-full" />
                </div>
                {/* Pages stack effect */}
                <div className="absolute -right-2 top-2 bottom-2 w-3 bg-gradient-to-b from-white/40 to-white/10 rounded-r-lg" />
                <div className="absolute -right-1 top-3 bottom-3 w-1 bg-gradient-to-b from-white/20 to-white/5 rounded-r" />
              </div>
              {/* Shadow */}
              <div className="absolute -bottom-4 left-3 right-3 h-4 bg-black/20 blur-md rounded-full transform-gpu rotate-y-20" />
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
        <div className="glass rounded-2xl p-6 border border-primary/20 hover-lift card-elegant relative overflow-hidden">
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
                <div className="glass rounded-2xl p-8 hover-lift card-elegant h-full transition-transform duration-500 hover:scale-105" 
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
          <div className="glass rounded-3xl p-12 card-elegant max-w-4xl mx-auto hover:scale-105 transition-transform duration-500">
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