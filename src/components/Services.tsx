import { useState } from "react";
import {
  Heart,
  Sparkles,
  Film,
  Music,
  BookOpen,
  Mic,
  Baby,
  Home,
  Cake,
  PartyPopper,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  {
    icon: Heart,
    title: "Wedding",
    description: "Capturing timeless wedding moments with elegance and love.",
    category: "Wedding"
  },
  {
    icon: Sparkles,
    title: "Engagement",
    description: "Beautiful engagement stories told through cinematic frames.",
    category: "Engagement"
  },
  {
    icon: Sparkles,
    title: "Pre Wedding",
    description: "Romantic pre-wedding photoshoots at stunning locations.",
    category: "Engagement"
  },
  {
    icon: Film,
    title: "Stories",
    description: "Personalized love and life stories woven into visuals.",
    category: "Wedding"
  },
  {
    icon: Music,
    title: "Reception",
    description: "Joyful receptions captured with vibrant details.",
    category: "Wedding"
  },
  {
    icon: PartyPopper,
    title: "Haldi",
    description: "Colorful haldi ceremonies with vibrant traditions.",
    category: "Wedding"
  },
  {
    icon: Sparkles,
    title: "Mehandi",
    description: "Intricate mehandi designs and joyful celebrations.",
    category: "Wedding"
  },
  {
    icon: Baby,
    title: "Baby Shower",
    description: "Cherishing the joy of parenthood with adorable clicks.",
    category: "Maternity"
  },
  {
    icon: Baby,
    title: "Annaprasanna",
    description: "First feeding ceremony captured with love and tradition.",
    category: "Maternity"
  },
  {
    icon: Home,
    title: "House Warming",
    description: "Memorable beginnings in your dream home.",
    category: "House Warming"
  },
  {
    icon: Music,
    title: "Sangeeth",
    description: "Vibrant music and dance nights captured beautifully.",
    category: "Wedding"
  },
  {
    icon: Cake,
    title: "Birthday",
    description: "Fun and colorful birthday celebrations.",
    category: "Birthday"
  },
  {
    icon: PartyPopper,
    title: "Concerts",
    description: "Live concert energy captured with passion.",
    category: "Concert"
  },
  {
    icon: Baby,
    title: "Maternity",
    description: "Beautiful maternity moments filled with love & hope.",
    category: "Maternity"
  },
];

const Services = () => {
  const { ref, isVisible } = useScrollReveal();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(5deg);
          }
          50% {
            transform: translateY(-5px) rotate(-5deg);
          }
          75% {
            transform: translateY(-12px) rotate(3deg);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(139, 92, 246, 0);
          }
          50% {
            box-shadow: 0 0 20px 5px rgba(139, 92, 246, 0.3);
          }
        }

        @keyframes bounce-soft {
          0%, 100% {
            transform: translateY(0) scale(1) rotate(0deg);
          }
          25% {
            transform: translateY(-8px) scale(1.1) rotate(-5deg);
          }
          50% {
            transform: translateY(-12px) scale(1.15) rotate(5deg);
          }
          75% {
            transform: translateY(-6px) scale(1.08) rotate(-3deg);
          }
        }

        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-10deg);
          }
          50% {
            transform: rotate(10deg);
          }
          75% {
            transform: rotate(-5deg);
          }
        }

        .icon-float {
          animation: float 3s ease-in-out infinite;
        }

        .icon-pulse {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .icon-bounce {
          animation: bounce-soft 0.6s ease-in-out;
        }

        .icon-wiggle {
          animation: wiggle 0.5s ease-in-out;
        }

        .card-glow:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12), 0 0 20px rgba(139, 92, 246, 0.2);
        }

        .icon-container {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .icon-container:hover {
          transform: scale(1.1);
        }
      `}</style>

      <section id="services" className="py-24 bg-muted/30" ref={ref}>
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our work across different occasions and celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`group hover-lift cursor-pointer border-0 bg-card card-elegant card-glow transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transitionDelay: `${index * 0.05}s`
                }}
              >
                <CardContent className="p-6">
                  <div 
                    className={`mb-4 inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 icon-container ${
                      hoveredIndex === index ? 'icon-bounce icon-pulse' : 'icon-float'
                    }`}
                    style={{
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    <service.icon 
                      className={`w-8 h-8 ${hoveredIndex === index ? 'icon-wiggle' : ''}`}
                    />
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
    </>
  );
};

export default Services;