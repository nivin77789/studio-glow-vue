import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Instagram, Facebook, Linkedin, Twitter, Award, Heart, Camera, Film, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Founder = () => {
  const { ref, isVisible } = useScrollReveal();

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-500" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-600" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-400" }
  ];

  const achievements = [
    { icon: Camera, label: "100+ Weddings", color: "from-pink-500 to-rose-500" },
    { icon: Film, label: "800+ Events", color: "from-purple-500 to-indigo-500" },
    { icon: Award, label: "Award Winner", color: "from-amber-500 to-orange-500" }
  ];

  
  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Photography-themed background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Rotating camera icons */}
        {[...Array(6)].map((_, i) => (
          <Camera
            key={i}
            className="absolute text-foreground/5 w-32 h-32 animate-spin-slow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${i * 1.5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Badge className="mb-4 px-4 py-2 text-sm">The Visionary</Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">Meet Markhandeya</h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            From teenage filmmaker to industry innovator – transforming moments into timeless stories
          </p>
        </div>

        {/* What Sets Us Apart - Centered Between Columns */}
        

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left Column - Image Section */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative group">
              {/* Main image container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1755104572227-904d7a0758fb?w=600&q=80" 
                  alt="Markhandeya - Founder" 
                  className="aspect-[3/4] w-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-primary rounded-tl-3xl" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-accent rounded-br-3xl" />
              </div>

              {/* Floating achievement badges */}
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.label}
                    className="absolute glass rounded-2xl p-4 shadow-xl hover-lift animate-float backdrop-blur-md border border-white/20"
                    style={{
                      top: `${15 + index * 28}%`,
                      right: index % 2 === 0 ? '-2rem' : 'auto',
                      left: index % 2 !== 0 ? '-2rem' : 'auto',
                      animationDelay: `${index * 0.5}s`,
                      animationDuration: '6s'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-bold text-sm whitespace-nowrap">{achievement.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Content Section */}
          <div className={`space-y-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div>
              <h3 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
                Markhandeya
              </h3>
              <p className="text-2xl text-muted-foreground mb-2">Founder & Creative Director</p>
              <Badge variant="outline" className="text-sm">
                <Film className="w-3 h-3 mr-1" />
                Since 2007
              </Badge>
            </div>

            {/* Journey Story */}
            <div className="space-y-5 text-foreground/90 leading-relaxed text-lg">
              <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                <p className="font-semibold text-primary mb-2">The Beginning</p>
                <p>
                  It all started at age 17 with a camera and a dream. Markhandeya shot his first short film 
                  with friends, igniting a passion that would define his future. His creative storytelling 
                  earned him awards at inter-college competitions, proving his natural talent.
                </p>
              </div>

              <p>
                Driven by vision and determination, Markhandeya assembled a team of passionate professionals 
                to fulfill his dream of leading the creative industry. What began as a teenage experiment 
                has evolved into <span className="font-bold text-primary">900+ unforgettable stories</span> captured 
                across 100+ weddings and 800+ events.
              </p>
            </div>

            {/* Mission Statement */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30">
              <p className="text-lg font-medium text-center leading-relaxed">
                "In the era of social media and content revolution, we don't just capture moments – 
                we craft <span className="font-bold text-primary">cinematic experiences</span> and deliver 
                them at lightning speed, so you can share your joy instantly."
              </p>
            </div>

            {/* Social Media Links */}
            <div className="pt-4">
              <h4 className="text-lg font-semibold mb-4">Connect with Markhandeya</h4>
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
                      <div className="w-14 h-14 rounded-xl glass border border-primary/20 flex items-center justify-center hover-lift transition-all duration-300 group-hover:scale-110 group-hover:border-primary/50">
                        <Icon className={`w-6 h-6 transition-colors duration-300 ${social.color}`} />
                      </div>
                      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {social.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom tagline */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-2xl font-bold gradient-text">
            Stay tuned for latest trends and world-class experiences
          </p>
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};

export default Founder;