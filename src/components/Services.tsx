import {
  Heart,
  Sparkles,
  Film,
  Music,
  BookOpen,
  Mic,
  Baby,
  Home,
  Users,
  Cake,
  PartyPopper,
  BabyIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  {
    icon: Heart,
    title: "Wedding",
    description: "Capturing timeless wedding moments with elegance and love.",
  },
  {
    icon: Sparkles,
    title: "Engagement",
    description: "Beautiful engagement stories told through cinematic frames.",
  },
  {
    icon: Film,
    title: "Stories",
    description: "Personalized love and life stories woven into visuals.",
  },
  {
    icon: Music,
    title: "Reception",
    description: "Joyful receptions captured with vibrant details.",
  },
  {
    icon: BookOpen,
    title: "Magazine",
    description: "Creative magazine-style photography & design.",
  },
  {
    icon: Mic,
    title: "Podcast",
    description: "Engaging podcasts to tell inspiring stories.",
  },
  {
    icon: Baby,
    title: "Baby Shower",
    description: "Cherishing the joy of parenthood with adorable clicks.",
  },
  {
    icon: Home,
    title: "House Warming",
    description: "Memorable beginnings in your dream home.",
  },
  {
    icon: Users,
    title: "Get Together",
    description: "Celebrating friendships and reunions in style.",
  },
  {
    icon: Music,
    title: "Sangeeth",
    description: "Vibrant music and dance nights captured beautifully.",
  },
  {
    icon: Cake,
    title: "Birthday",
    description: "Fun and colorful birthday celebrations.",
  },
  {
    icon: PartyPopper,
    title: "Concerts",
    description: "Live concert energy captured with passion.",
  },
  {
    icon: BabyIcon,
    title: "Maternity",
    description: "Beautiful maternity moments filled with love & hope.",
  },
];

const Services = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="services" className="py-24 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We offer a variety of premium services to capture your special moments beautifully.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`group hover-lift cursor-pointer border-0 bg-card card-elegant transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                transitionDelay: `${index * 0.05}s`
              }}
            >
              <CardContent className="p-6">
                <div className="mb-4 inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
