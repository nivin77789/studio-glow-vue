import Header from "@/components/Header";
import Prints from "@/components/Prints";
import Footer from "@/components/Footer";

const PrintsPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/5" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl animate-float" />
      </div>
      <Header />
      <div className="pt-20">
        <Prints />
      </div>
      <Footer />
    </div>
  );
};

export default PrintsPage;
