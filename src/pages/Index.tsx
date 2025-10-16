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
      {/* Enhanced Photography-inspired background with animations */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-background via-background to-background/95">
        {/* Larger animated grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1.5px, transparent 1.5px),
              linear-gradient(to bottom, currentColor 1.5px, transparent 1.5px)
            `,
            backgroundSize: '120px 120px',
            animation: 'gridMove 25s linear infinite'
          }}
        />

        {/* Diagonal grid overlay - less dense */}
        <div 
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 70px, currentColor 70px, currentColor 71px),
              repeating-linear-gradient(-45deg, transparent, transparent 70px, currentColor 70px, currentColor 71px)
            `,
            animation: 'gridMoveDiagonal 30s linear infinite reverse'
          }}
        />
        
        {/* Large gradient orbs with more movement */}
        <div className="absolute top-1/4 left-1/4 w-[550px] h-[550px] bg-gradient-to-br from-primary/15 to-accent/15 dark:from-primary/20 dark:to-accent/20 rounded-full blur-3xl animate-floatLarge" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-accent/12 to-primary/12 dark:from-accent/18 dark:to-primary/18 rounded-full blur-3xl animate-floatLarge" style={{ animationDelay: '2s', animationDuration: '15s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/15 dark:to-accent/15 rounded-full blur-3xl animate-breathe" />
        
        {/* Medium orbs with rotation */}
        <div className="absolute top-20 right-20 w-48 h-48 bg-primary/10 dark:bg-primary/15 rounded-full blur-2xl animate-orbit" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-40 left-40 w-40 h-40 bg-accent/10 dark:bg-accent/15 rounded-full blur-xl animate-orbit" style={{ animationDelay: '2s', animationDuration: '18s' }} />
        <div className="absolute top-1/2 right-10 w-44 h-44 bg-primary/8 dark:bg-primary/12 rounded-full blur-2xl animate-floatLarge" style={{ animationDelay: '4s' }} />
        <div className="absolute top-10 left-1/3 w-36 h-36 bg-accent/8 dark:bg-accent/12 rounded-full blur-2xl animate-orbit" style={{ animationDelay: '1s', animationDuration: '22s' }} />
        
        {/* Pulsing rings with scale animation */}
        <div className="absolute top-1/3 right-1/3 w-72 h-72 border-2 border-primary/15 dark:border-primary/25 rounded-full animate-pulseRing" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-56 h-56 border border-accent/15 dark:border-accent/25 rounded-full animate-pulseRing" style={{ animationDuration: '5s', animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 border-2 border-primary/10 dark:border-primary/20 rounded-full animate-pulseRing" style={{ animationDuration: '6s', animationDelay: '3s' }} />
        
        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay bg-repeat animate-grain" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }} />
        
        {/* Floating particles with varied animations */}
        {[...Array(35)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`absolute rounded-full ${i % 3 === 0 ? 'animate-floatSlow' : i % 3 === 1 ? 'animate-floatMedium' : 'animate-floatFast'}`}
            style={{
              width: `${2 + (i % 4)}px`,
              height: `${2 + (i % 4)}px`,
              background: i % 2 === 0 ? 'rgba(var(--primary), 0.3)' : 'rgba(var(--accent), 0.3)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Moving camera focus squares with rotation */}
        {[...Array(7)].map((_, i) => (
          <div
            key={`focus-${i}`}
            className="absolute border-2 border-primary/25 dark:border-primary/35 animate-rotateFloat"
            style={{
              width: `${60 + i * 10}px`,
              height: `${60 + i * 10}px`,
              left: `${15 + i * 12}%`,
              top: `${5 + (i % 4) * 25}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${10 + i * 2}s`,
            }}
          />
        ))}

        {/* Scanning lines effect */}
        <div 
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035] pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, currentColor 3px, currentColor 5px)',
            animation: 'scanlines 12s linear infinite'
          }}
        />

        {/* Corner lens flares with pulse */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-radial from-primary/10 via-transparent to-transparent dark:from-primary/15 blur-2xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-radial from-accent/10 via-transparent to-transparent dark:from-accent/15 blur-2xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-radial from-primary/8 via-transparent to-transparent dark:from-primary/12 blur-2xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        
        {/* Vignette effect for dark theme */}
        <div className="absolute inset-0 pointer-events-none dark:block hidden" 
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.6) 100%)'
          }} 
        />

        {/* Radial light beams */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`beam-${i}`}
            className="absolute top-1/2 left-1/2 origin-left opacity-5 dark:opacity-10 animate-rotate"
            style={{
              width: '50%',
              height: '2px',
              background: `linear-gradient(90deg, ${i % 2 === 0 ? 'var(--primary)' : 'var(--accent)'}, transparent)`,
              transform: `rotate(${i * 30}deg)`,
              transformOrigin: '0 50%',
              animationDelay: `${i * 0.5}s`,
              animationDuration: '20s'
            }}
          />
        ))}

        {/* Floating rectangles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`rect-${i}`}
            className="absolute border border-accent/20 dark:border-accent/30 animate-floatRotate"
            style={{
              width: `${80 + i * 15}px`,
              height: `${50 + i * 10}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${12 + i * 2}s`,
            }}
          />
        ))}

        {/* Crosshair elements */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`cross-${i}`}
            className="absolute animate-crosshair"
            style={{
              width: '40px',
              height: '40px',
              left: `${25 + i * 20}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 2}s`,
            }}
          >
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-primary/30 dark:bg-primary/40" />
            <div className="absolute left-0 top-1/2 h-0.5 w-full bg-primary/30 dark:bg-primary/40" />
          </div>
        ))}
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(120px, 120px); }
        }
        @keyframes gridMoveDiagonal {
          0% { transform: translate(0, 0); }
          100% { transform: translate(140px, -140px); }
        }
        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(15px); }
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
        @keyframes floatMedium {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, -30px); }
        }
        @keyframes floatFast {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -20px); }
          50% { transform: translate(-15px, -35px); }
          75% { transform: translate(15px, -15px); }
        }
        @keyframes breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.15; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.25; }
        }
        @keyframes orbit {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(40px, -30px) rotate(90deg); }
          50% { transform: translate(0, -60px) rotate(180deg); }
          75% { transform: translate(-40px, -30px) rotate(270deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.1; }
        }
        @keyframes rotateFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-20px, -30px) rotate(120deg); }
          66% { transform: translate(20px, -20px) rotate(240deg); }
        }
        @keyframes floatRotate {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-30px, -40px) rotate(180deg); }
        }
        @keyframes expand {
          0%, 100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.4; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.1; }
        }
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes crosshair {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.5; }
          50% { transform: scale(1.3) rotate(90deg); opacity: 0.2; }
        }
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
        }
        .animate-floatLarge {
          animation: floatLarge 12s ease-in-out infinite;
        }
        .animate-floatSlow {
          animation: floatSlow 15s ease-in-out infinite;
        }
        .animate-floatMedium {
          animation: floatMedium 10s ease-in-out infinite;
        }
        .animate-floatFast {
          animation: floatFast 8s ease-in-out infinite;
        }
        .animate-breathe {
          animation: breathe 8s ease-in-out infinite;
        }
        .animate-orbit {
          animation: orbit 20s ease-in-out infinite;
        }
        .animate-pulseRing {
          animation: pulseRing 4s ease-in-out infinite;
        }
        .animate-rotateFloat {
          animation: rotateFloat 15s ease-in-out infinite;
        }
        .animate-floatRotate {
          animation: floatRotate 14s ease-in-out infinite;
        }
        .animate-expand {
          animation: expand 6s ease-in-out infinite;
        }
        .animate-rotate {
          animation: rotate 20s linear infinite;
        }
        .animate-crosshair {
          animation: crosshair 8s ease-in-out infinite;
        }
        .animate-grain {
          animation: grain 8s steps(10) infinite;
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
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;