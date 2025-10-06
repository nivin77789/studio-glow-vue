import { useState } from "react";
import { Camera, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const footerLinks = {
    Services: ["Wedding", "Engagement", "Maternity", "Birthday", "Concerts"],
    Company: ["About Us", "Our Team", "Careers", "Blog", "Press"],
    Support: ["Contact", "FAQ", "Pricing", "Terms", "Privacy"],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-4 group">
              <Camera className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
              <span className="text-2xl font-bold gradient-text">Premium Studio</span>
            </a>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Professional photography and videography services capturing your most precious moments with creativity and elegance.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="pt-8 border-t border-border">
          <div className="max-w-md mx-auto text-center mb-8">
            <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter for the latest updates and exclusive offers
            </p>
            <form className="flex gap-2" onSubmit={async (e) => {
              e.preventDefault();
              try {
                await addDoc(collection(db, "newsletterSubscribers"), {
                  email: email,
                  timestamp: serverTimestamp(),
                  status: "active"
                });
                toast.success("Successfully subscribed to newsletter!");
                setEmail("");
              } catch (error) {
                toast.error("Failed to subscribe. Please try again.");
                console.error("Error subscribing:", error);
              }
            }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; {currentYear} Premium Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
