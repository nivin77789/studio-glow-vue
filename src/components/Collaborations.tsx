import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Building2, Mic2, Music, Palette, Sparkles, Users, Phone, Mail, MapPin, X, Camera, ExternalLink, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useToast } from "@/hooks/use-toast";

// Firebase imports
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

interface Collaborator {
  id: string;
  category: string;
  name: string;
  description: string;
  imageUrl: string;
  address: string;
  location: string;
  whatsappNumber: string;
  contactNumber: string;
  email: string;
  website?: string;
}

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
    icon: Palette,
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

const serviceTypes = [
  "Wedding Halls",
  "Party Halls",
  "Interior Designers",
  "Makeup Artists",
  "Orchestra",
  "DJ Services",
  "Photography",
  "Videography",
  "Catering",
  "Decoration",
  "Other"
];

const Collaborations = () => {
  const { ref, isVisible } = useScrollReveal();
  const [selectedCollab, setSelectedCollab] = useState<typeof collaborations[0] | null>(null);
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoadingCollaborators, setIsLoadingCollaborators] = useState(false);
  const { toast } = useToast();

  const [partnerForm, setPartnerForm] = useState({
    serviceName: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    message: ""
  });

  // Fetch collaborators for selected category
  useEffect(() => {
    const fetchCollaborators = async () => {
      if (!selectedCategory) return;
      
      setIsLoadingCollaborators(true);
      try {
        const q = query(collection(db, "collaborators"), where("category", "==", selectedCategory));
        const querySnapshot = await getDocs(q);
        const collabData: Collaborator[] = [];
        querySnapshot.forEach((doc) => {
          collabData.push({ id: doc.id, ...doc.data() } as Collaborator);
        });
        setCollaborators(collabData);
      } catch (error) {
        console.error("Error fetching collaborators:", error);
        toast({
          title: "Error Loading Data",
          description: "Failed to load collaborators. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingCollaborators(false);
      }
    };

    fetchCollaborators();
  }, [selectedCategory, toast]);

  const handleBookNow = (collab: typeof collaborations[0]) => {
    const message = `Hi! I'm interested in booking your ${collab.title} service. Please provide more details.`;
    const whatsappUrl = `https://wa.me/${collab.contact.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Redirecting to WhatsApp",
      description: `Connecting you with ${collab.title}...`,
    });
  };

  const handlePartnerFormChange = (field: string, value: string) => {
    setPartnerForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "partnerSubmissions"), {
        ...partnerForm,
        timestamp: new Date(),
        status: "pending"
      });

      toast({
        title: "Application Submitted!",
        description: "We'll get back to you soon. Thank you for your interest!",
      });

      setPartnerForm({
        serviceName: "",
        name: "",
        phone: "",
        email: "",
        address: "",
        message: ""
      });
      setShowPartnerForm(false);

    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="collaborations" className="py-24 relative overflow-hidden" ref={ref}>
        {/* Photography-themed background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge className="mb-4 px-4 py-2 text-sm">Our Partners</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Premium Collaborations</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Partner with the best professionals in the industry for your special events
            </p>
          </div>

          <div className="relative">
            <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
            {collaborations.map((collab, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-3/4 md:basis-1/2 lg:basis-1/3">
              <Card
                className={`group hover-lift border-0 shadow-lg overflow-hidden transition-all duration-500 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transitionDelay: `${index * 0.05}s`
                }}
              >
                <CardContent className="p-0">
                  {/* Icon Header */}
                  <div className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden rounded-t-xl">
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

                    <Button 
                      className="w-full"
                      onClick={() => {
                        setSelectedCategory(collab.title);
                        setSelectedCollab(null);
                      }}
                    >
                      View Collaborators
                    </Button>
                  </div>
                </CardContent>
              </Card>
              </CarouselItem>
            ))}
              </CarouselContent>
              <CarouselPrevious className="-left-6 md:-left-10" />
              <CarouselNext className="-right-6 md:-right-10" />
            </Carousel>
          </div>

          {/* CTA Section */}
          <div className={`mt-16 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Card className="border-0 shadow-lg inline-block">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Want to Partner with Us?</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Join our network of premium service providers and grow your business
                </p>
                <Button 
                  size="lg" 
                  className="group"
                  onClick={() => setShowPartnerForm(true)}
                >
                  Become a Partner
                  <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

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

      {/* Collaborators List Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <Card className="max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-scale-in rounded-xl border-0 shadow-2xl">
            <CardContent className="p-0">
              {/* Header */}
              <div className="p-8 bg-gradient-to-br from-primary to-accent text-white relative overflow-hidden rounded-t-xl sticky top-0 z-10">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setCollaborators([]);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="text-3xl font-bold mb-2">{selectedCategory}</h3>
                <p className="text-white/90">Available Collaborators in this category</p>
              </div>

              {/* Collaborators Grid */}
              <div className="p-8">
                {isLoadingCollaborators ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="relative w-20 h-20 mb-6">
                      {/* Outer spinning ring */}
                      <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
                      {/* Inner pulsing circle */}
                      <div className="absolute inset-3 bg-primary/10 rounded-full animate-pulse"></div>
                      {/* Center dot */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-lg font-medium text-muted-foreground animate-pulse">
                      Loading collaborators...
                    </p>
                  </div>
                ) : collaborators.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex p-4 rounded-full bg-muted mb-4">
                      <Camera className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">No collaborators available in this category yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {collaborators.map((collaborator) => (
                      <Card key={collaborator.id} className="group hover-lift overflow-hidden border-0 shadow-lg">
                        <CardContent className="p-0">
                          {/* Image */}
                          <div className="aspect-video relative overflow-hidden bg-muted">
                            <img 
                              src={collaborator.imageUrl} 
                              alt={collaborator.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          
                          {/* Content */}
                          <div className="p-6">
                            <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                              {collaborator.name}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              {collaborator.description}
                            </p>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="truncate">{collaborator.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                                <span>{collaborator.contactNumber}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="truncate">{collaborator.email}</span>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                className="flex-1"
                                onClick={() => {
                                  const message = `Hi! I found you through Trixietales. I'm interested in your ${selectedCategory} services.`;
                                  const whatsappUrl = `https://wa.me/${collaborator.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
                                  window.open(whatsappUrl, '_blank');
                                }}
                              >
                                <MessageCircle className="w-4 h-4 mr-2" />
                                WhatsApp
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  const telUrl = `tel:${collaborator.contactNumber}`;
                                  window.location.href = telUrl;
                                }}
                              >
                                <Phone className="w-4 h-4" />
                              </Button>
                              {collaborator.website && (
                                <Button
                                  variant="outline"
                                  onClick={() => window.open(collaborator.website, '_blank')}
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Partner Form Modal */}
      {showPartnerForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <Card className="max-w-md w-full animate-scale-in overflow-hidden rounded-xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl">
            <CardContent className="p-0">
              {/* Header */}
              <div className="p-8 bg-gradient-to-br from-primary to-accent text-white relative overflow-hidden rounded-t-xl">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <button
                  onClick={() => setShowPartnerForm(false)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="relative">
                  <div className="inline-flex p-4 rounded-xl bg-white/20 backdrop-blur-sm mb-4">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Become a Partner</h3>
                  <p className="text-white/90">Join our network of premium service providers</p>
                </div>
              </div>

              {/* Form */}
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  {/* Service Type */}
                  <div className="space-y-2">
                    <Label htmlFor="serviceName" className="text-sm font-medium">
                      Service Type <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="serviceName"
                      required
                      value={partnerForm.serviceName}
                      onChange={(e) => handlePartnerFormChange("serviceName", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                    >
                      <option value="">Select a service type</option>
                      {serviceTypes.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={partnerForm.name}
                      onChange={(e) => handlePartnerFormChange("name", e.target.value)}
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="Enter your phone number"
                      value={partnerForm.phone}
                      onChange={(e) => handlePartnerFormChange("phone", e.target.value)}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={partnerForm.email}
                      onChange={(e) => handlePartnerFormChange("email", e.target.value)}
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium">
                      Business Address <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="address"
                      required
                      placeholder="Enter your business address"
                      rows={3}
                      value={partnerForm.address}
                      onChange={(e) => handlePartnerFormChange("address", e.target.value)}
                    />
                  </div>

                  {/* Additional Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Additional Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your business and why you want to partner with us..."
                      rows={4}
                      value={partnerForm.message}
                      onChange={(e) => handlePartnerFormChange("message", e.target.value)}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handlePartnerSubmit}
                  className="w-full group"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to our terms and conditions. 
                  We'll contact you within 24-48 hours.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Collaborations;