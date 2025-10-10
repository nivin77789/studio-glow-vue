import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Bride",
    content: "Nivin Studio captured our wedding day perfectly! Every moment was beautifully documented. The team was professional, creative, and made us feel comfortable throughout. We couldn't be happier with the results!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Corporate Client",
    content: "Exceptional quality and professionalism. The portfolio shots they created for our company exceeded all expectations. Highly recommend their services for any professional photography needs.",
    rating: 5,
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Maternity Photoshoot",
    content: "The maternity photoshoot was an amazing experience. The team made me feel beautiful and comfortable. The photos are absolutely stunning and capture this special time perfectly!",
    rating: 5,
  },
  {
    id: 4,
    name: "David Williams",
    role: "Birthday Event",
    content: "They made our daughter's birthday party memorable! The candid shots and video coverage were fantastic. Great attention to detail and wonderful to work with.",
    rating: 5,
  },
  {
    id: 5,
    name: "Anita Patel",
    role: "Engagement Photoshoot",
    content: "Our engagement photos are like a dream! The creative concepts and locations suggested by the team were perfect. We received so many compliments from family and friends!",
    rating: 5,
  },
  {
    id: 6,
    name: "Robert Martinez",
    role: "Concert Documentation",
    content: "As a musician, finding a photographer who understands live music is crucial. Nivin Studio delivered outstanding concert photos that captured the energy and emotion of our performance perfectly!",
    rating: 5,
  },
];

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 relative overflow-hidden bg-muted/30">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-3xl animate-float" />
      </div>

      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>

        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="group relative h-full">
                    <div className="glass rounded-2xl p-8 h-full hover-lift card-elegant relative overflow-hidden">
                      {/* Animated gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Quote icon */}
                      <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Quote className="w-16 h-16 text-primary" />
                      </div>

                      <div className="relative z-10">
                        {/* Rating */}
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 fill-accent text-accent group-hover:scale-110 transition-transform"
                              style={{ transitionDelay: `${i * 50}ms` }}
                            />
                          ))}
                        </div>

                        {/* Content */}
                        <p className="text-foreground/80 mb-6 leading-relaxed">
                          "{testimonial.content}"
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                          <Avatar className="w-12 h-12 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold">
                              {testimonial.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-lg text-muted-foreground mb-4">
            Ready to create your own success story?
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full font-semibold hover-lift transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
          >
            Start Your Journey with Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
