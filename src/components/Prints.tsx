import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Frame, BookOpen, Calendar, Image, Sparkles, X } from "lucide-react";
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

  const handleOrder = (printType: string, variant?: string) => {
    const message = variant 
      ? `Hi! I'd like to order ${variant} from ${printType}`
      : `Hi! I'd like to know more about ${printType}`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank');
    toast.success("Redirecting to WhatsApp...");
  };

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {printTypes.map((print, index) => {
            const Icon = print.icon;
            return (
              <div
                key={print.id}
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
            );
          })}
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
    </section>
  );
};

export default Prints;
