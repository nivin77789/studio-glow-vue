import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Camera, 
  Trophy, 
  Calendar, 
  Users, 
  Sparkles, 
  Award,
  MapPin,
  Clock,
  Eye
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const workshops = [
  {
    id: 1,
    title: "Portrait Photography Masterclass",
    date: "March 15, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Studio Center, Mumbai",
    image: "/images/1.jpeg",
    category: "Workshop",
    spots: 12
  },
  {
    id: 2,
    title: "Wedding Photography Basics",
    date: "March 22, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Convention Hall, Bangalore",
    image: "/images/2.jpeg",
    category: "Workshop",
    spots: 20
  },
  {
    id: 3,
    title: "Street Photography Walk",
    date: "March 28, 2025",
    time: "6:00 AM - 10:00 AM",
    location: "Old City, Delhi",
    image: "/images/3.jpeg",
    category: "Workshop",
    spots: 15
  },
  {
    id: 4,
    title: "Lighting Techniques for Beginners",
    date: "April 5, 2025",
    time: "11:00 AM - 3:00 PM",
    location: "Photography Hub, Pune",
    image: "/images/4.jpeg",
    category: "Workshop",
    spots: 10
  },
];

const competitions = [
  {
    id: 1,
    title: "Best Portrait 2025",
    deadline: "April 30, 2025",
    prize: "₹50,000",
    image: "/images/5.jpeg",
    category: "Competition"
  },
  {
    id: 2,
    title: "Wedding Moments Challenge",
    deadline: "May 15, 2025",
    prize: "₹75,000",
    image: "/images/6.jpeg",
    category: "Competition"
  },
  {
    id: 3,
    title: "Nature Photography Contest",
    deadline: "June 1, 2025",
    prize: "₹40,000",
    image: "/images/7.jpeg",
    category: "Competition"
  },
  {
    id: 4,
    title: "Street Life Photo Challenge",
    deadline: "June 20, 2025",
    prize: "₹30,000",
    image: "/images/8.jpeg",
    category: "Competition"
  },
];

const ExperiencePage = () => {
  const { ref, isVisible } = useScrollReveal();
  const [showAllWorkshops, setShowAllWorkshops] = useState(false);
  const [showAllCompetitions, setShowAllCompetitions] = useState(false);

  const displayedWorkshops = showAllWorkshops ? workshops : workshops.slice(0, 4);
  const displayedCompetitions = showAllCompetitions ? competitions : competitions.slice(0, 4);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Photography Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/5" />
        
        {/* Floating camera elements */}
        <div className="absolute top-20 left-10 w-20 h-20 opacity-20 animate-float">
          <Camera className="w-full h-full text-primary" />
        </div>
        <div className="absolute top-40 right-20 w-16 h-16 opacity-15 animate-float" style={{ animationDelay: '1s' }}>
          <Sparkles className="w-full h-full text-accent" />
        </div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 opacity-10 animate-float" style={{ animationDelay: '2s' }}>
          <Trophy className="w-full h-full text-primary" />
        </div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 opacity-20 animate-float" style={{ animationDelay: '1.5s' }}>
          <Award className="w-full h-full text-accent" />
        </div>
        
        {/* Light effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      </div>

      <Header />
      
      <main className="pt-20">
        {/* Hero Banner */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90" />
            <div className="absolute inset-0" style={{
              backgroundImage: 'url(/images/hero1.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.3
            }} />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
                <span className="text-white font-semibold">Upcoming Event Alert!</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
                Photography Competition 2025
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-lg">
                Join India's biggest photography competition with prizes worth ₹2 Lakhs! 
                Registration closes on March 31st, 2025
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-2xl">
                  <Trophy className="w-5 h-5 mr-2" />
                  Register Now
                </Button>
                <Button size="lg" variant="outline" className="border-white text-grey hover:bg-white/20 text-lg px-8 py-6 backdrop-blur-sm">
                  <Eye className="w-5 h-5 mr-2" />
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-10 left-10 w-32 h-32 opacity-30 animate-float">
            <Camera className="w-full h-full text-white" />
          </div>
          <div className="absolute bottom-10 right-10 w-24 h-24 opacity-30 animate-float" style={{ animationDelay: '1.5s' }}>
            <Trophy className="w-full h-full text-white" />
          </div>
        </section>

        {/* Workshops Section */}
        <section ref={ref} className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Photography Workshops
                </span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Learn from industry experts and enhance your photography skills
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {displayedWorkshops.map((workshop, index) => (
                <motion.div
                  key={workshop.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden hover-lift card-elegant h-full">
                    <div className="relative overflow-hidden h-48">
                      <img 
                        src={workshop.image} 
                        alt={workshop.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full mb-2">
                          {workshop.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm mb-3 group-hover:text-primary transition-colors">
                        {workshop.title}
                      </h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          {workshop.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          {workshop.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          {workshop.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          {workshop.spots} spots left
                        </div>
                      </div>
                      <Button className="w-full mt-4" size="sm">
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {!showAllWorkshops && workshops.length > 4 && (
              <div className="text-center">
                <Button 
                  size="lg" 
                  onClick={() => setShowAllWorkshops(true)}
                  className="bg-gradient-to-r from-primary to-accent"
                >
                  View More Workshops
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Competitions Section */}
        <section className="py-20 bg-muted/30 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Photography Competitions
                </span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Showcase your talent and win exciting prizes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {displayedCompetitions.map((competition, index) => (
                <motion.div
                  key={competition.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="group overflow-hidden hover-lift card-elegant h-full">
                    <div className="relative overflow-hidden h-48">
                      <img 
                        src={competition.image} 
                        alt={competition.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                          {competition.prize}
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                          {competition.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors">
                        {competition.title}
                      </h3>
                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-accent" />
                          Deadline: {competition.deadline}
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-accent" />
                          Prize: {competition.prize}
                        </div>
                      </div>
                      <Button className="w-full" variant="outline" size="sm">
                        Submit Entry
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {!showAllCompetitions && competitions.length > 4 && (
              <div className="text-center">
                <Button 
                  size="lg" 
                  onClick={() => setShowAllCompetitions(true)}
                  className="bg-gradient-to-r from-accent to-primary"
                >
                  View More Competitions
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ExperiencePage;
