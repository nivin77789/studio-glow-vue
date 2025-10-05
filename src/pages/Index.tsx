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
        {/* Light leaks with 3D effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-purple-500/10 mix-blend-screen animate-pulse" />
        <div
          className="absolute inset-0 bg-gradient-to-tl from-yellow-400/10 via-transparent to-red-400/10 mix-blend-screen animate-pulse"
          style={{ animationDuration: "10s" }}
        />

        {/* 3D Floating spheres with enhanced animations */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float-rotate" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDuration: "7s" }} />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-primary/3 rounded-full blur-3xl animate-cube" />
        <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-spin-slow" />

        {/* Moving lens flare */}
        <div className="absolute w-[200%] h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 animate-lensflare" />

        {/* 3D Focus rings (autofocus animation) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[200px] h-[200px] border border-white/20 rounded-full animate-focus" style={{ transformStyle: 'preserve-3d' }} />
          <div className="w-[300px] h-[300px] border border-white/10 rounded-full animate-focus" style={{ transformStyle: 'preserve-3d', animationDelay: '0.5s' }} />
          <div className="w-[400px] h-[400px] border border-white/5 rounded-full animate-focus" style={{ transformStyle: 'preserve-3d', animationDelay: '1s' }} />
        </div>

        {/* Viewfinder grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Film grain */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-20 mix-blend-overlay animate-grain" />
        
        {/* Floating particles with 3D effect */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              transform: `translateZ(${Math.random() * 100}px)`,
            }}
          />
        ))}
      </div>

      {/* Camera Shutter Animation */}
      {shutter && (
        <>
          {/* Shutter closing effect */}
          <div className="fixed inset-0 bg-black animate-shutter z-40"></div>
          {/* Flash effect */}
          <div className="fixed inset-0 bg-white animate-flash z-40"></div>
        </>
      )}

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
