import { motion } from "framer-motion";
import { Camera, Aperture, Sparkles, Video, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroLanding = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden text-white"
    >
      {/* --- Cinematic 3D background overlays --- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Light leaks */}
        <div className="absolute inset-0 bg-gold-soft mix-blend-screen animate-pulse" />
        <div
          className="absolute inset-0 bg-gradient-to-tl from-yellow-400/10 via-transparent to-red-400/10 mix-blend-screen animate-pulse"
          style={{ animationDuration: "10s" }}
        />

        {/* 3D floating spheres */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float-rotate" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDuration: "7s" }} />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-primary/3 rounded-full blur-3xl animate-cube" />
        <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-spin-slow" />

        {/* Lens flare beam */}
        <div className="absolute w-[200%] h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 animate-lensflare" />

        {/* Focus rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[200px] h-[200px] border border-white/20 rounded-full animate-focus" />
          <div className="w-[300px] h-[300px] border border-white/10 rounded-full animate-focus" style={{ animationDelay: "0.5s" }} />
          <div className="w-[400px] h-[400px] border border-white/5 rounded-full animate-focus" style={{ animationDelay: "1s" }} />
        </div>

        {/* Subtle film grain texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-15 mix-blend-overlay animate-grain" />
      </div>

      {/* --- Floating animated icons --- */}
      <motion.div
        className="absolute top-1/4 left-10 hidden md:block"
        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        <Camera className="w-10 h-10 text-yellow-300/80" />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-12 hidden md:block"
        animate={{ y: [0, -15, 0], rotate: [0, -5, 5, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
      >
        <Aperture className="w-10 h-10 text-yellow-200/80" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/3 hidden md:block"
        animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      >
        <Video className="w-10 h-10 text-amber-300/80" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/3 hidden md:block"
        animate={{ y: [0, -12, 0], rotate: [0, -6, 6, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
      >
        <Heart className="w-10 h-10 text-amber-200/80" />
      </motion.div>

      <motion.div
        className="absolute top-12 right-1/2 hidden md:block"
        animate={{ y: [0, -8, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 9 }}
      >
        <Sparkles className="w-10 h-10 text-yellow-300/80" />
      </motion.div>

      {/* --- Main content --- */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3 }}
        className="z-10 px-6 max-w-3xl"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 gradient-text">
          Mark Studio
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed"
        >
          We capture the light, emotion, and story behind every frame. 
          From weddings to cinematic storytelling — your memories deserve magic.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button
            size="lg"
            className="btn-gold px-8 py-6"
          >
            Book a Shoot
          </Button>
          <Button
            size="lg"
            className="btn-gold-outline px-8 py-6 border-white/30 text-white hover:bg-white/10"
          >
            View Portfolio
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  );
};

export default HeroLanding;
