import { useState } from "react";
import { Building2, Mic2, Music, Palette as PaletteIcon, Sparkles, Users, Phone, Mail, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useToast } from "@/hooks/use-toast";

const collaborations = [
  {
    icon: Building2,
    title: "Wedding Halls",
    description: "Elegant venues perfect for your dream wedding celebration",
    features: ["Indoor & Outdoor spaces", "Catering services", "Decoration support", "Parking facilities"],
    contact: "+91 98765 43210"
  },
  {
    icon: Users,
    title: "Party Halls",
    description: "Versatile spaces for birthdays, anniversaries, and celebrations",
    features: ["Flexible layouts", "Audio system", "LED lighting", "AC facilities"],
    contact: "+91 98765 43211"
  },
  {
    icon: PaletteIcon,
    title: "Interior Designers",
    description: "Transform your space with creative interior design solutions",
    features: ["Residential design", "Commercial spaces", "3D visualization", "Budget planning"],
    contact: "+91 98765 43212"
  },
  {
    icon: Sparkles,
    title: "Makeup Artists",
    description: "Professional makeup services for weddings and special events",
    features: ["Bridal makeup", "HD makeup", "Hairstyling", "Saree draping"],
    contact: "+91 98765 43213"
  },
  {
    icon: Music,
    title: "Orchestra",
    description: "Live musical performances to elevate your event atmosphere",
    features: ["Classical bands", "Fusion music", "Custom playlists", "Sound equipment"],
    contact: "+91 98765 43214"
  },
  {
    icon: Mic2,
    title: "DJ Services",
    description: "Professional DJs to keep your party energetic and memorable",
    features: ["Latest music", "Light effects", "Professional equipment", "Custom mixes"],
    contact: "+91 98765 43215"
  },
];

const Collaborations = () => {
  const { ref, isVisible } = useScrollReveal();
  const [selectedCollab, setSelectedCollab] = useState<typeof collaborations[0] | null>(null);
  const { toast } = useToast();

  const handleBookNow = (collab: typeof collaborations[0]) => {
    const message = `Hi! I'm interested in booking your ${collab.title} service. Please provide more details.`;
    const whatsappUrl = `https://wa.me/${collab.contact.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Redirecting to WhatsApp",
      description: `Connecting you with ${collab.title}...`,
    });
  };

  return (
    <>
      <section id="collaborations" className="py-24" ref={ref}>
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge className="mb-4 px-4 py-2 text-sm">Our Partners</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Premium Collaborations</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Partner with the best professionals in the industry for your special events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collaborations.map((collab, index) => (
              <Card
                key={index}
                className={`group hover-lift border-0 card-elegant overflow-hidden transition-all duration-500 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transitionDelay: `${index * 0.05}s`
                }}
              >
                <CardContent className="p-0">
                  {/* Icon Header */}
                  <div className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                    <div className="relative">
                      <div className="mb-4 inline-flex p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                        <collab.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {collab.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-muted-foreground mb-4">{collab.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {collab.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1"
                        onClick={() => setSelectedCollab(collab)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => handleBookNow(collab)}
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className={`mt-16 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Card className="card-elegant inline-block">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Want to Partner with Us?</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Join our network of premium service providers and grow your business
                </p>
                <Button size="lg" className="group">
                  Become a Partner
                  <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Details Modal */}
      {selectedCollab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <Card className="max-w-lg w-full animate-scale-in">
            <CardContent className="p-0">
              <div className="p-8 bg-gradient-to-br from-primary to-accent text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="inline-flex p-4 rounded-xl bg-white/20 backdrop-blur-sm mb-4">
                    <selectedCollab.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{selectedCollab.title}</h3>
                  <p className="text-white/90">{selectedCollab.description}</p>
                </div>
              </div>

              <div className="p-8">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Services Offered
                </h4>
                <ul className="space-y-3 mb-6">
                  {selectedCollab.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 mb-6 p-4 rounded-lg bg-accent/5">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="font-medium">{selectedCollab.contact}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>info@nivinstudio.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Trivandrum, Kerala</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    className="flex-1"
                    onClick={() => handleBookNow(selectedCollab)}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Book via WhatsApp
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedCollab(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Collaborations;
