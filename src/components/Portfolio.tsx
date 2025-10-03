import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const categories = [
  "All",
  "Wedding",
  "Birthday",
  "Maternity",
  "Concert",
  "Engagement",
  "House Warming",
];

const portfolioItems = [
  { id: 1, category: "Wedding", title: "Elegant Wedding Ceremony" },
  { id: 2, category: "Birthday", title: "Children's Birthday Party" },
  { id: 3, category: "Maternity", title: "Expecting Joy" },
  { id: 4, category: "Concert", title: "Live Music Performance" },
  { id: 5, category: "Engagement", title: "Romantic Engagement Session" },
  { id: 6, category: "House Warming", title: "New Home Celebration" },
  { id: 7, category: "Wedding", title: "Beach Wedding" },
  { id: 8, category: "Birthday", title: "Milestone Birthday" },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { ref, isVisible } = useScrollReveal();

  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of beautifully captured moments across various events and celebrations.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative aspect-square rounded-xl overflow-hidden cursor-pointer hover-lift card-elegant transition-all duration-500 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                transitionDelay: `${index * 0.05}s`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-accent/60 flex items-center justify-center">
                <div className="text-center text-white p-6">
                  <Badge className="mb-2 bg-white/20 backdrop-blur-sm">
                    {item.category}
                  </Badge>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
              </div>
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
