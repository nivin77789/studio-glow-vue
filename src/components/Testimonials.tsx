import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();

  const testimonialImages = [
    "/images/testinomial/testin1.webp",
    "/images/testinomial/testin2.webp",
    "/images/testinomial/testin3.webp",
    "/images/testinomial/testin4.webp",
    "/images/testinomial/testin5.webp",
  ];

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
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay: 3000 })]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonialImages.map((image, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="group relative h-full">
                    <div className="glass rounded-2xl h-[500px] md:h-[600px] relative overflow-hidden border-0 p-0 shadow-xl transition-transform duration-500 hover:scale-[1.02]">
                      <img
                        src={image}
                        alt={`Testimonial ${index + 1}`}
                        className="w-full h-full object-contain bg-white/5 rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="flex -left-4 md:-left-12 bg-white/10 hover:bg-white/20 border-white/20 text-white" />
            <CarouselNext className="flex -right-4 md:-right-12 bg-white/10 hover:bg-white/20 border-white/20 text-white" />
          </Carousel>
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-lg text-muted-foreground mb-4">Ready to create your own success story?</p>
          <a href="/contact" className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full font-semibold hover-lift transition-all duration-300 hover:shadow-lg hover:shadow-primary/50">
            Start Your Journey with Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
