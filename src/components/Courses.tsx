import { Camera, Video, BookImage, Palette, Lightbulb, Clapperboard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const courses = [
  {
    icon: Camera,
    title: "Professional Photography",
    duration: "8 weeks",
    level: "Beginner to Advanced",
    description: "Master the art of photography from basics to advanced techniques. Learn composition, lighting, and post-processing.",
    features: ["Camera fundamentals", "Lighting techniques", "Composition rules", "Photo editing"],
  },
  {
    icon: Video,
    title: "Videography Masterclass",
    duration: "10 weeks",
    level: "Intermediate",
    description: "Learn to create stunning videos with professional techniques, from shooting to editing and color grading.",
    features: ["Video production", "Cinematic techniques", "Editing workflow", "Color grading"],
  },
  {
    icon: BookImage,
    title: "Album Design",
    duration: "6 weeks",
    level: "All Levels",
    description: "Create beautiful photo albums and coffee table books. Learn design principles and storytelling through imagery.",
    features: ["Layout design", "Photo selection", "Print preparation", "Binding techniques"],
  },
  {
    icon: Palette,
    title: "Photo Editing & Retouching",
    duration: "5 weeks",
    level: "Beginner",
    description: "Master Adobe Lightroom and Photoshop for stunning photo enhancements and creative edits.",
    features: ["Lightroom basics", "Photoshop tools", "Color correction", "Portrait retouching"],
  },
  {
    icon: Lightbulb,
    title: "Creative Lighting",
    duration: "4 weeks",
    level: "Intermediate",
    description: "Explore studio and natural lighting techniques to elevate your photography and videography.",
    features: ["Studio setup", "Natural light", "Flash photography", "Light modifiers"],
  },
  {
    icon: Clapperboard,
    title: "Wedding Photography & Video",
    duration: "12 weeks",
    level: "Advanced",
    description: "Specialized course for capturing weddings. Learn to manage events, work with couples, and deliver exceptional results.",
    features: ["Event management", "Couple posing", "Candid shots", "Same-day edits"],
  },
];

const Courses = () => {
  return (
    <section id="courses" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Learn with the Best</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enhance your skills with our professional courses taught by industry experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Card
              key={index}
              className="group hover-lift border-0 bg-card card-elegant overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                {/* Header with gradient */}
                <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <div className="relative">
                    <div className="mb-4 inline-flex p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <course.icon className="w-8 h-8" />
                    </div>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="secondary">{course.duration}</Badge>
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">{course.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full group/btn">
                    Enroll Now
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default Courses;
