import { useRef, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// Temporary team data
const teamMembers = [
    {
        name: "Alex Morgan",
        role: "Lead Photographer",
        experience: "12+ Years Experience",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
        bio: "Specializing in wedding and portrait photography with a keen eye for candid moments.",
        social: {
            instagram: "#",
            twitter: "#",
            linkedin: "#"
        }
    },
    {
        name: "Sarah Chen",
        role: "Creative Director",
        experience: "8+ Years Experience",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80",
        bio: "Bringing artistic vision to life through innovative concepts and visual storytelling.",
        social: {
            instagram: "#",
            linkedin: "#"
        }
    },
    {
        name: "Marcus Johnson",
        role: "Cinematographer",
        experience: "10+ Years Experience",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80",
        bio: "Expert in capturing cinematic wedding films and documentary-style storytelling.",
        social: {
            instagram: "#",
            twitter: "#"
        }
    },
    {
        name: "Emily Davis",
        role: "Senior Editor",
        experience: "6+ Years Experience",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=80",
        bio: "Master of post-production, ensuring every image and video meets our high standards.",
        social: {
            instagram: "#",
            linkedin: "#"
        }
    },
    {
        name: "David Wilson",
        role: "Drone Operator",
        experience: "5+ Years Experience",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80",
        bio: "Licensed drone pilot capturing breathtaking aerial perspectives for your special events.",
        social: {
            instagram: "#",
            twitter: "#"
        }
    }
];

const OurTeam = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const plugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <section ref={ref} className="py-24 relative overflow-hidden bg-black/5">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Badge className="mb-4 px-4 py-2 text-sm">Our Experts</Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Meet The Team</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        The creative minds and talented professionals behind every capture
                    </p>
                </div>

                <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Carousel
                        plugins={[plugin.current]}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                    >
                        <CarouselContent className="-ml-4">
                            {teamMembers.map((member, index) => (
                                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/4">
                                    <div className="h-full">
                                        <Card className="border-0 overflow-hidden bg-white/50 dark:bg-black/40 backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full group my-[5px] pb-[5px]">
                                            <CardContent className="p-0 h-full flex flex-col">
                                                <div className="relative overflow-hidden aspect-square shrink-0">
                                                    <img
                                                        src={member.image}
                                                        alt={member.name}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />

                                                    {/* Overlay Content */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 transition-opacity duration-300">
                                                        <div className="flex flex-col items-center gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                            {/* Social Icons */}
                                                            <div className="flex gap-3 justify-center">
                                                                {member.social.instagram && (
                                                                    <a href={member.social.instagram} className="p-2 bg-pink-600/80 text-white hover:bg-pink-600 rounded-full transition-all duration-300 backdrop-blur-sm" title="Instagram">
                                                                        <Instagram className="w-4 h-4" />
                                                                    </a>
                                                                )}
                                                                {member.social.twitter && (
                                                                    <a href={member.social.twitter} className="p-2 bg-white/20 text-white hover:bg-white hover:text-black rounded-full transition-all duration-300 backdrop-blur-sm">
                                                                        <Twitter className="w-4 h-4" />
                                                                    </a>
                                                                )}
                                                                {member.social.linkedin && (
                                                                    <a href={member.social.linkedin} className="p-2 bg-white/20 text-white hover:bg-white hover:text-black rounded-full transition-all duration-300 backdrop-blur-sm">
                                                                        <Linkedin className="w-4 h-4" />
                                                                    </a>
                                                                )}
                                                            </div>

                                                            {/* Experience Badge */}
                                                            <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-md border-0">
                                                                {member.experience}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-6 text-center relative flex-grow flex flex-col items-center">
                                                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                                    <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                                                    <p className="text-muted-foreground text-sm line-clamp-3">
                                                        {member.bio}
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex -left-12" />
                        <CarouselNext className="hidden md:flex -right-12" />
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default OurTeam;
