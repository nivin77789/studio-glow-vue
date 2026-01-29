import { useState } from "react";
import { Camera, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const footerLinks = {
    Services: ["Wedding", "Engagement", "Birthday", "Concerts"],
    Company: ["About Us", "Our Team", "Careers", "Blog", "Press"],
    Support: ["Contact", "FAQ", "Pricing", "Terms", "Privacy"],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/MARKHANDEYA/?locale=hi_IN&_rdr", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/markyoureventz/", label: "Instagram" },
    { icon: Twitter, href: "https://x.com/Callme_Krack", label: "Twitter" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/markhandeya-m-v-09a110192/?originalSubdomain=in", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-1.5 md:gap-2 mb-4 group">
              <img src="/logo.png" alt="Trixietales Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain group-hover:scale-110 transition-transform" />
              <span className="text-xl md:text-2xl font-bold gradient-text">Trixietales</span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Professional photography and videography services capturing your most precious moments with creativity and elegance.
            </p>

            {/* Newsletter Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Subscribe to our newsletter for the latest updates and exclusive offers
              </p>
              <form
                className="relative flex items-center max-w-sm"
                onSubmit={async (e) => {
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
                }}
              >
                <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pr-32 rounded-xl border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm placeholder:text-muted-foreground"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Social Links */}
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

        <div className="pt-8 text-center text-muted-foreground">
          <p>
            &copy; {currentYear} Trixietales. All rights reserved. | Designed by{" "}
            <a
              href="https://nivinmathew.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-primary hover:text-primary/80 transition-colors"
            >
              Nivin Mathew S
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;