import { useState } from "react";
import { Building2, Mic2, Music, Palette as PaletteIcon, Sparkles, Users, Phone, Mail, MapPin, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useToast } from "@/hooks/use-toast";

// Firebase imports
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZCNRSPlDFTzK_HNBKxRYQkX7XJIzSSW4",
  authDomain: "mark-studio-4b30a.firebaseapp.com",
  projectId: "mark-studio-4b30a",
  storageBucket: "mark-studio-4b30a.firebasestorage.app",
  messagingSenderId: "717134874279",
  appId: "1:717134874279:web:e2d5ac9923c79ae21e3d82",
  measurementId: "G-NNNZWPJ6X1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
  const [showAll, setShowAll] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const itemsPerRow = 3;
  const displayedCollaborations = showAll ? collaborations : collaborations.slice(0, itemsPerRow);

  const [partnerForm, setPartnerForm] = useState({
    serviceName: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    message: ""
  });

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
      // Add document to Firestore
      await addDoc(collection(db, "partnerSubmissions"), {
        ...partnerForm,
        timestamp: new Date(),
        status: "pending"
      });

      toast({
        title: "Application Submitted!",
        description: "We'll get back to you soon. Thank you for your interest!",
      });

      // Reset form and close modal
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
            {displayedCollaborations.map((collab, index) => (
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

          {collaborations.length > itemsPerRow && (
            <div className="flex justify-center mt-12">
              <Button
                onClick={() => setShowAll(!showAll)}
                variant="outline"
                size="lg"
                className="group"
              >
                {showAll ? (
                  <>
                    Show Less
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 transition-transform group-hover:-translate-y-1"
                    >
                      <path d="m18 15-6-6-6 6"/>
                    </svg>
                  </>
                ) : (
                  <>
                    Show More ({collaborations.length - itemsPerRow} more)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 transition-transform group-hover:translate-y-1"
                    >
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </>
                )}
              </Button>
            </div>
          )}

          {/* CTA Section */}
          <div className={`mt-16 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Card className="card-elegant inline-block">
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
      </section>

      {/* Collaboration Details Modal */}
      {selectedCollab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <Card className="max-w-lg w-full animate-scale-in overflow-hidden rounded-xl">
            <CardContent className="p-0">
              {/* Header with matching border radius */}
              <div className="p-8 bg-gradient-to-br from-primary to-accent text-white relative overflow-hidden rounded-t-xl">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="inline-flex p-4 rounded-xl bg-white/20 backdrop-blur-sm mb-4">
                    <selectedCollab.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{selectedCollab.title}</h3>
                  <p className="text-white/90">{selectedCollab.description}</p>
                </div>
              </div>

              {/* Content */}
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

      {/* Partner Form Modal */}
      {showPartnerForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <Card className="max-w-md w-full animate-scale-in overflow-hidden rounded-xl max-h-[90vh] overflow-y-auto">
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
              <form onSubmit={handlePartnerSubmit} className="p-8 space-y-6">
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
                  type="submit"
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
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Collaborations;