import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Frame, BookOpen, Calendar, Image, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface PrintType {
  id: string;
  name: string;
  icon: any;
  description: string;
  variants?: string[];
}

const printTypes: PrintType[] = [
  {
    id: "frames",
    name: "Premium Frames",
    icon: Frame,
    description: "Beautiful custom frames in various styles",
    variants: ["Classic Wooden Frame", "Modern Metal Frame", "Vintage Gold Frame", "Minimalist Black Frame", "Rustic Oak Frame", "Contemporary White Frame"]
  },
  {
    id: "portrait-album",
    name: "Portrait Albums",
    icon: BookOpen,
    description: "Elegant portrait orientation photo albums",
    variants: ["Leather Bound Portrait", "Classic Portrait Album", "Premium Portrait Collection", "Modern Portrait Book"]
  },
  {
    id: "landscape-album",
    name: "Landscape Albums",
    icon: BookOpen,
    description: "Stunning landscape orientation albums",
    variants: ["Panoramic Landscape Album", "Wide Format Collection", "Premium Landscape Book", "Modern Landscape Edition"]
  },
  {
    id: "calendar",
    name: "Custom Calendars",
    icon: Calendar,
    description: "Personalized calendars with your memories",
    variants: ["Wall Calendar 2024", "Desk Calendar", "Premium Wall Calendar", "Photo Calendar Collection"]
  },
  {
    id: "magazine",
    name: "Photo Magazines",
    icon: Image,
    description: "Professional magazine-style photo books",
    variants: ["Glossy Magazine Format", "Matte Finish Magazine", "Premium Photo Journal", "Modern Photo Magazine"]
  },
  {
    id: "canvas",
    name: "Canvas Prints",
    icon: Sparkles,
    description: "Museum-quality canvas prints",
    variants: ["Stretched Canvas", "Framed Canvas Print", "Gallery Wrap Canvas", "Premium Canvas Collection"]
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
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
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
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="glass rounded-2xl p-8 hover-lift card-elegant h-full">
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                  
                  {/* Icon with animation */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
          <div className="glass rounded-3xl p-12 card-elegant max-w-4xl mx-auto">
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
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {selectedPrint?.variants?.map((variant, index) => (
              <div
                key={variant}
                className="group relative animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* 3D-style card effect */}
                <div className="relative overflow-hidden rounded-xl bg-card border border-border p-6 hover-lift transition-all duration-300 hover:shadow-2xl">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* 3D Frame preview simulation */}
                  <div className="relative mb-4 h-48 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center overflow-hidden">
                    <div className="w-32 h-32 bg-background/50 rounded border-4 border-primary/30 group-hover:scale-110 transition-transform duration-500 shadow-lg" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                  </div>
                  
                  <h4 className="font-semibold text-lg mb-2 relative z-10">{variant}</h4>
                  <p className="text-sm text-muted-foreground mb-4 relative z-10">
                    Premium quality {variant.toLowerCase()} with professional finishing
                  </p>
                  
                  <Button
                    onClick={() => handleOrder(selectedPrint.name, variant)}
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
