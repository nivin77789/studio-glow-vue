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
  return (
    <div className="min-h-screen relative">
      {/* Animated moving background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/5" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDuration: '20s' }} />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-accent/15 to-transparent rounded-full blur-3xl animate-float" style={{ animationDuration: '25s', animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-gradient-to-tr from-primary/15 to-transparent rounded-full blur-3xl animate-float" style={{ animationDuration: '30s', animationDelay: '4s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-[350px] h-[350px] bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDuration: '22s', animationDelay: '6s' }} />
        
        {/* Moving particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary/40 rounded-full animate-float" style={{ animationDuration: '15s' }} />
        <div className="absolute top-40 right-40 w-3 h-3 bg-accent/40 rounded-full animate-float" style={{ animationDuration: '18s', animationDelay: '3s' }} />
        <div className="absolute bottom-40 left-1/2 w-2 h-2 bg-primary/30 rounded-full animate-float" style={{ animationDuration: '20s', animationDelay: '5s' }} />
        <div className="absolute top-1/2 right-20 w-2 h-2 bg-accent/30 rounded-full animate-float" style={{ animationDuration: '17s', animationDelay: '2s' }} />
      </div>

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
