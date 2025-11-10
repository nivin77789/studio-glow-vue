import { useState } from "react";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import Founder from "@/components/Founder";
import Courses from "@/components/Courses";
import Portfolio from "@/components/Portfolio";
import Collaborations from "@/components/Collaborations";
import Prints from "@/components/Prints";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Faq from "@/components/faq";

const Index = () => {
  const [shutter, setShutter] = useState(false);

  const triggerShutter = () => {
    setShutter(true);
    setTimeout(() => setShutter(false), 800);
  };

  return (
    <div
      className="min-h-screen relative"
      onClick={triggerShutter}
    >
      {/* Optimized Photography-inspired background with minimal animations */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-background via-background to-background/95">
        {/* Single animated grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] motion-safe:animate-grid-move"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1.5px, transparent 1.5px),
              linear-gradient(to bottom, currentColor 1.5px, transparent 1.5px)
            `,
            backgroundSize: '120px 120px',
          }}
        />
        
        {/* Simplified gradient orbs - only 2 */}
        <div className="absolute top-1/4 left-1/4 w-[550px] h-[550px] bg-gradient-to-br from-primary/15 to-accent/15 dark:from-primary/20 dark:to-accent/20 rounded-full blur-3xl motion-safe:animate-float-large" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-accent/12 to-primary/12 dark:from-accent/18 dark:to-primary/18 rounded-full blur-3xl motion-safe:animate-float-large" style={{ animationDelay: '2s', animationDuration: '15s' }} />
        
        {/* Single pulsing ring */}
        <div className="hidden md:block absolute top-1/3 right-1/3 w-72 h-72 border-2 border-primary/15 dark:border-primary/25 rounded-full motion-safe:animate-pulse-ring" style={{ animationDuration: '4s' }} />
        
        {/* Light film grain overlay */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02] mix-blend-overlay bg-repeat pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }} />
        
        {/* Minimal floating particles - only 5 */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="hidden md:block absolute rounded-full motion-safe:animate-float-slow"
            style={{
              width: `${3 + (i % 3)}px`,
              height: `${3 + (i % 3)}px`,
              background: i % 2 === 0 ? 'rgba(var(--primary), 0.3)' : 'rgba(var(--accent), 0.3)',
              left: `${20 + i * 15}%`,
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}

        {/* Simplified corner lens flares */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-radial from-primary/10 via-transparent to-transparent dark:from-primary/15 blur-2xl opacity-50" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-radial from-accent/10 via-transparent to-transparent dark:from-accent/15 blur-2xl opacity-50" />
        
        {/* Vignette effect for dark theme */}
        <div className="absolute inset-0 pointer-events-none dark:block hidden" 
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.6) 100%)'
          }} 
        />
      </div>

      {/* Optimized animations with reduced motion support */}
      <style>{`
        /* Respect user's motion preferences */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(120px, 120px); }
        }
        
        @keyframes floatLarge {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -30px) scale(1.05); }
          50% { transform: translate(-20px, -50px) scale(0.95); }
          75% { transform: translate(-30px, 20px) scale(1.02); }
        }
        
        @keyframes floatSlow {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(-15px, -25px); }
          66% { transform: translate(15px, -15px); }
        }
        
        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.1; }
        }

        .motion-safe\\:animate-grid-move {
          animation: gridMove 25s linear infinite;
        }
        
        .motion-safe\\:animate-float-large {
          animation: floatLarge 12s ease-in-out infinite;
        }
        
        .motion-safe\\:animate-float-slow {
          animation: floatSlow 15s ease-in-out infinite;
        }
        
        .motion-safe\\:animate-pulse-ring {
          animation: pulseRing 4s ease-in-out infinite;
        }
      `}</style>

      {/* Sections */}
      <Header />
      <HeroCarousel />
      <Founder />
      <Courses />
      <Portfolio />
      <Collaborations />
      <Prints />
      <Testimonials />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;