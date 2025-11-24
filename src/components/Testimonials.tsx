import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Testimonial {
  id: string;
  clientName: string;
  category: string;
  description: string;
  rating: number;
  youtubeLink?: string;
  avatarUrl?: string;
}

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data: Testimonial[] = [];
      snapshot.forEach((doc) => {
        const d = doc.data() as Omit<Testimonial, "id">;
        data.push({ id: doc.id, ...d });
      });
      setTestimonials(data);
    });
    return () => unsub();
  }, []);

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
            plugins={[Autoplay({ delay: 4000 })]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="group relative h-full">
                    <div className="glass rounded-2xl h-[500px] md:h-[600px] relative overflow-hidden border-0 p-0">
                      {/* Video Background / Thumbnail */}
                      {testimonial.youtubeLink && extractYTId(testimonial.youtubeLink) ? (
                        <div className="absolute inset-0 z-0 bg-black">
                          {playingId === testimonial.id ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${extractYTId(testimonial.youtubeLink)}?autoplay=1&playsinline=1&controls=1&modestbranding=1&rel=0&iv_load_policy=3&fs=0`}
                              title="YouTube video"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div
                              className="w-full h-full relative cursor-pointer group/video"
                              onClick={() => setPlayingId(testimonial.id)}
                            >
                              <img
                                src={`https://img.youtube.com/vi/${extractYTId(testimonial.youtubeLink)}/maxresdefault.jpg`}
                                alt="Video thumbnail"
                                className="w-full h-full object-cover opacity-80 group-hover/video:opacity-60 transition-opacity"
                                onError={(e) => {
                                  // Fallback to hqdefault if maxresdefault doesn't exist
                                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${extractYTId(testimonial.youtubeLink)}/hqdefault.jpg`;
                                }}
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover/video:scale-110 transition-transform">
                                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                                </div>
                              </div>
                            </div>
                          )}
                          {/* Dark Overlay for readability - only show when not playing */}
                          {playingId !== testimonial.id && (
                            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/90 z-10 pointer-events-none" />
                          )}
                        </div>
                      ) : (
                        /* Fallback background if no video */
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0" />
                      )}

                      {/* Content Overlay - Hide when playing */}
                      {playingId !== testimonial.id && (
                        <div className="relative z-20 h-full flex flex-col justify-end p-6 text-white pointer-events-none">

                          {/* Quote Icon */}
                          <div className="absolute top-6 right-6 opacity-50">
                            <Quote className="w-8 h-8 text-white/80" />
                          </div>

                          {/* Rating */}
                          <div className="flex gap-1 mb-3">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 drop-shadow-md" />
                            ))}
                          </div>

                          {/* Description */}
                          <p className="text-white/90 mb-4 text-sm md:text-base leading-relaxed line-clamp-4 drop-shadow-sm font-medium">
                            "{testimonial.description}"
                          </p>

                          {/* User Info */}
                          <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                            <Avatar className="w-10 h-10 ring-2 ring-white/30">
                              {testimonial.avatarUrl ? <AvatarImage src={testimonial.avatarUrl} alt={testimonial.clientName} /> : null}
                              <AvatarFallback className="bg-white/10 text-white font-semibold backdrop-blur-sm">
                                {testimonial.clientName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-bold text-white text-sm drop-shadow-md">{testimonial.clientName}</p>
                              <p className="text-xs text-white/70">{testimonial.category}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-white/10 hover:bg-white/20 border-white/20 text-white" />
            <CarouselNext className="hidden md:flex -right-12 bg-white/10 hover:bg-white/20 border-white/20 text-white" />
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

function extractYTId(url: string): string {
  if (!url) return "";
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : "";
}

export default Testimonials;
