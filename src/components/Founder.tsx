import React, { useState, useRef, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Instagram, Facebook, Linkedin, Twitter, Award, Heart, Camera, Film, Zap, TrendingUp, X, ZoomIn, ZoomOut, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Founder = () => {
  const { ref, isVisible } = useScrollReveal();

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/markyoureventz/", color: "hover:text-pink-500" },
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/MARKHANDEYA/?locale=hi_IN&_rdr", color: "hover:text-blue-500" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/markhandeya-m-v-09a110192/?originalSubdomain=in", color: "hover:text-blue-600" },
    { name: "Twitter", icon: Twitter, href: "https://x.com/Callme_Krack", color: "hover:text-sky-400" }
  ];

  const achievements = [
    { icon: Camera, label: "100+ Weddings", color: "from-pink-500 to-rose-500" },
    { icon: Film, label: "800+ Events", color: "from-purple-500 to-indigo-500" },
    { icon: Award, label: "Award Winner", color: "from-amber-500 to-orange-500" }
  ];

  // Zoom modal state and handlers
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openZoom = () => {
    setZoomOpen(true);
    setZoomScale(1);
    setTranslate({ x: 0, y: 0 });
  };

  const closeZoom = () => setZoomOpen(false);

  const clamp = (v: number, a = 0.5, b = 4) => Math.max(a, Math.min(b, v));

  const handleWheelZoom = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.12 : -0.12;
    setZoomScale((prev) => +clamp(+(prev + delta).toFixed(2), 0.5, 4));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale <= 1) return;
    draggingRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    setTranslate((p) => ({ x: p.x + dx, y: p.y + dy }));
  };

  const handleMouseUp = () => {
    draggingRef.current = false;
  };

  const zoomIn = () => setZoomScale((s) => clamp(+(s + 0.25).toFixed(2), 0.5, 4));
  const zoomOut = () => setZoomScale((s) => clamp(+(s - 0.25).toFixed(2), 0.5, 4));
  const resetZoom = () => {
    setZoomScale(1);
    setTranslate({ x: 0, y: 0 });
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left Column - Image Section */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative group">
              {/* Main image container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="images/founder.png"
                  alt="Markhandeya - Founder"
                  ref={imgRef}
                  onClick={openZoom}
                  className="aspect-[3/4] w-full object-cover object-top rounded-3xl group-hover:scale-105 transition-transform duration-700 cursor-zoom-in"
                  style={{
                    maskImage: 'radial-gradient(circle at 50% 40%, black 70%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black 70%, transparent 100%)'
                  }}
                />
                {/* Subtler overlays for better merging */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40 pointer-events-none" />
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent opacity-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent opacity-20 pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent opacity-10 pointer-events-none" />
              </div>

              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-primary rounded-tl-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-accent rounded-br-3xl pointer-events-none" />

              {/* Floating achievement badges */}
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.label}
                    className="absolute glass rounded-lg md:rounded-2xl p-1.5 md:p-4 shadow-xl hover-lift animate-float backdrop-blur-md border border-white/20 z-20"
                    style={{
                      top: `${15 + index * 28}%`,
                      right: index % 2 === 0 ? (window.innerWidth < 768 ? '0.25rem' : '-2rem') : 'auto',
                      left: index % 2 !== 0 ? (window.innerWidth < 768 ? '0.25rem' : '-2rem') : 'auto',
                      animationDelay: `${index * 0.5}s`,
                      animationDuration: '6s'
                    }}
                  >
                    <div className="flex items-center gap-1.5 md:gap-3">
                      <div className={`w-6 h-6 md:w-12 md:h-12 rounded-md md:rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-3 h-3 md:w-6 md:h-6 text-white" />
                      </div>
                      <span className="font-bold text-[8px] md:text-sm whitespace-nowrap">{achievement.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Media Links - Below Image */}
            <div className="flex justify-center gap-4 mt-8">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social relative animate-float"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 backdrop-blur-xl flex items-center justify-center hover-lift transition-all duration-500 group-hover/social:scale-110 shadow-2xl group-hover/social:shadow-primary/60 border-2 border-white/30 group-hover/social:border-white/60 group-hover/social:from-primary/50 group-hover/social:to-accent/50">
                      <Icon className="w-7 h-7 text-white/80 group-hover/social:text-white transition-all duration-300 group-hover/social:rotate-12 drop-shadow-lg" />
                    </div>
                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gradient-to-r from-primary to-accent text-white text-xs font-medium rounded-lg opacity-0 group-hover/social:opacity-100 transition-all duration-300 whitespace-nowrap shadow-xl">
                      {social.name}
                    </span>
                  </a>
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

      {zoomOpen && (
        <div
          className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onWheel={handleWheelZoom}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="absolute top-6 right-6 flex items-center gap-2">
            <button onClick={zoomOut} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white">
              <ZoomOut className="w-5 h-5" />
            </button>
            <button onClick={resetZoom} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white">
              <RefreshCw className="w-5 h-5" />
            </button>
            <button onClick={zoomIn} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white">
              <ZoomIn className="w-5 h-5" />
            </button>
            <button onClick={closeZoom} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            className="max-w-[92vw] max-h-[92vh] overflow-hidden rounded-lg"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <img
              src="images/founder.png"
              alt="Markhandeya - Founder Large"
              className="block select-none touch-none"
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px) scale(${zoomScale})`,
                transition: draggingRef.current ? "none" : "transform 160ms ease-out",
                maxHeight: "90vh",
                maxWidth: "90vw",
                cursor: zoomScale > 1 ? "grab" : "zoom-out"
              }}
              draggable={false}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Founder;