import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useLocation } from "react-router-dom";

const Contact = () => {
  const location = useLocation();
  const { ref, isVisible } = useScrollReveal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const service = params.get("service");
    if (service) {
      setFormData(prev => ({
        ...prev,
        message: `I'm interested in booking the ${service} service. Please provide more details.`
      }));
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "contactSubmissions"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        timestamp: serverTimestamp(),
        status: "unread"
      });

      toast.success("Message Sent!", {
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.error("Error", {
        description: "Failed to send message. Please try again.",
      });
      console.error("Error submitting form:", error);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: "+91 861 822 3659",
      link: "tel:+918618223659",
    },
    {
      icon: Mail,
      title: "Email",
      value: "hello@trixietales.com",
      link: "mailto:hello@trixietales.com",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Trixietales - Photography & videography, Bangalore",
      link: "https://www.google.com/maps/search/?api=1&query=Trixietales+Photography+videography+Bangalore",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to capture your special moments? Let's discuss your vision and create something beautiful together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className={`border-0 shadow-lg transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <Input
                    type="tel"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    placeholder="Tell us about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Send Message
                  <Send className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  size="lg"
                  onClick={() => window.open("https://wa.me/918618223659", "_blank")}
                >
                  Chat on WhatsApp
                  <MessageCircle className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className={`space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '0.2s' }}>
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="group hover-lift cursor-pointer border-0 shadow-lg"
              >
                <CardContent className="p-6">
                  <a
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : undefined}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-4"
                  >
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{info.title}</h3>
                      <p className="text-muted-foreground">{info.value}</p>
                    </div>
                  </a>
                </CardContent>
              </Card>
            ))}

            {/* Google Maps Embed */}
            <div className="rounded-xl overflow-hidden h-64 border-0 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.2617447839787!2d77.75727371482186!3d13.004553990819894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae0fafe1c1e5e9%3A0x697f3a7d629a588a!2sSaycheezz%20-%20Photography%20%26%20Videography!5e0!3m2!1sen!2sin!4v1696420000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Saycheezz Location"
                className="dark:invert dark:hue-rotate-180 dark:brightness-90 dark:contrast-125 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;