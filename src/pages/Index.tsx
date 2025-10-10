import { useState } from "react";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import Founder from "@/components/Founder";
import Courses from "@/components/Courses";
import Services from "@/components/Services";
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
    setTimeout(() => setShutter(false), 800); // reset after animation
  };

  return (
    <div
      className="min-h-screen relative"
      onClick={triggerShutter} // trigger camera shutter on click
    >
      {/* 3D Photography-inspired background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-accent/15 to-primary/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-40 left-40 w-24 h-24 bg-accent/10 rounded-full blur-lg animate-float" />
        
        <div className="absolute top-1/3 right-1/3 w-48 h-48 border-2 border-primary/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        
        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-repeat animate-grain" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }} />
        
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

    

      {/* Sections */}
      <Header />
      <HeroCarousel />
      <Founder />
      <Courses />
      <Services />
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
