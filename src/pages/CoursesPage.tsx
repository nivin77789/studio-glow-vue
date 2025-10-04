import Header from "@/components/Header";
import Courses from "@/components/Courses";
import Footer from "@/components/Footer";

const CoursesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <Header />
      <div className="pt-20">
        <Courses />
      </div>
      <Footer />
    </div>
  );
};

export default CoursesPage;
