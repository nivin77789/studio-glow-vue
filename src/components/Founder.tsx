import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Instagram, Facebook, Linkedin, Twitter, Award, Camera, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Founder = () => {
  const { ref, isVisible } = useScrollReveal();

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-500" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-600" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-400" }
  ];

  const achievements = [
    { icon: Award, label: "15+ Years Experience" },
    { icon: Camera, label: "5000+ Projects" },
    { icon: Heart, label: "1000+ Happy Clients" }
  ];

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Animated floating elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-3 h-3 bg-primary rounded-full animate-float opacity-40" style={{ animationDuration: '6s' }} />
        <div className="absolute top-40 right-1/3 w-2 h-2 bg-accent rounded-full animate-float opacity-30" style={{ animationDuration: '7s', animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/2 w-4 h-4 bg-primary rounded-full animate-float opacity-20" style={{ animationDuration: '8s', animationDelay: '2s' }} />
        <div className="absolute top-60 right-1/4 w-2 h-2 bg-accent rounded-full animate-float opacity-40" style={{ animationDuration: '5s', animationDelay: '0.5s' }} />
      </div>

      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Meet the Visionary</h2>
          <p className="text-muted-foreground text-lg">The creative mind behind Nivin Studio</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image Section with animations */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative group">
              {/* Animated gradient border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-[gradient_3s_ease_infinite]" 
                   style={{ animation: 'gradient 3s ease infinite' }} />
              
              {/* Main image container */}
              <div className="relative rounded-3xl overflow-hidden">
                <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Camera className="w-32 h-32 text-primary/30" />
                </div>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              </div>

              {/* Floating achievement badges */}
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.label}
                    className="absolute glass rounded-2xl p-4 shadow-lg hover-lift animate-float"
                    style={{
                      top: `${20 + index * 25}%`,
                      right: index % 2 === 0 ? '-1rem' : 'auto',
                      left: index % 2 !== 0 ? '-1rem' : 'auto',
                      animationDelay: `${index * 0.5}s`,
                      animationDuration: '6s'
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <span className="font-semibold text-sm whitespace-nowrap">{achievement.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content Section */}
          <div className={`space-y-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div>
              <h3 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                John Nivin
              </h3>
              <p className="text-xl text-muted-foreground mb-4">Founder & Lead Photographer</p>
            </div>

            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                With over 15 years of experience in photography and videography, John Nivin has established 
                himself as one of the most sought-after photographers in the region. His passion for capturing 
                life's precious moments began at a young age and has evolved into a thriving studio.
              </p>
              <p>
                Specializing in weddings, portraits, and creative storytelling, John brings a unique blend 
                of technical expertise and artistic vision to every project. His work has been featured in 
                numerous publications and has earned recognition from industry peers worldwide.
              </p>
              <p>
                At Nivin Studio, we believe every moment deserves to be captured beautifully. Our mission 
                is to transform your special occasions into timeless memories that you'll cherish forever.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="pt-6">
              <h4 className="text-lg font-semibold mb-4">Connect with John</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                    >
                      <div className="w-12 h-12 rounded-full glass flex items-center justify-center hover-lift transition-all duration-300 group-hover:scale-110">
                        <Icon className={`w-5 h-5 transition-colors duration-300 ${social.color}`} />
                      </div>
                      {/* Tooltip */}
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {social.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <Button size="lg" className="group">
                <span>Let's Create Something Amazing</span>
                <Heart className="ml-2 w-5 h-5 group-hover:scale-125 group-hover:fill-current transition-all duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
};

export default Founder;
