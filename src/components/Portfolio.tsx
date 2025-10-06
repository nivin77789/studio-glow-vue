import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  "All",
  "Wedding",
  "Birthday",
  "Maternity",
  "Concert",
  "Engagement",
  "House Warming",
];

// Generate 50 portfolio items with categories
const portfolioItems = Array.from({ length: 50 }, (_, i) => {
  const id = i + 1;
  const catList = [
    "Wedding",
    "Birthday",
    "Maternity",
    "Concert",
    "Engagement",
    "House Warming",
  ];
  return {
    id,
    category: catList[i % catList.length],
    title: `${catList[i % catList.length]} Event ${id}`,
    image: `/images/${id}.jpeg`,
    featured: id % 10 === 0, // every 10th image is featured
  };
});

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAll, setShowAll] = useState(false);

  // Filter images based on active category
  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  const featuredItem = filteredItems[currentSlide % filteredItems.length];

  // Show only 1 row (4 images) or all
  const gridImages = showAll
    ? filteredItems.filter((item) => item.id !== featuredItem.id)
    : filteredItems.filter((item) => item.id !== featuredItem.id).slice(0, 4);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % filteredItems.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
    );

  return (
    <section
      id="portfolio"
      className="min-h-screen bg-gradient-to-b from-gray-100 to-white text-gray-900 dark:from-gray-900 dark:to-black dark:text-white py-20 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Our{" "}
          <span className="text-[#5033E8] dark:text-[#5033E8]">
            Portfolio
          </span>
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Explore our finest photography and videography works across various
          occasions and themes.
        </p>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className={`px-6 py-2 rounded-full text-sm ${
              activeCategory === category
                ? "bg-[#5033E8] text-white"
                : "border border-gray-300 text-gray-800 dark:border-white/30 dark:text-white/80 hover:bg-gray-200 dark:hover:bg-white/10"
            }`}
            onClick={() => {
              setActiveCategory(category);
              setCurrentSlide(0); // reset featured slider
              setShowAll(false); // reset show more
            }}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Featured Image */}
      {filteredItems.length > 0 ? (
        <div className="relative max-w-5xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={featuredItem.id}
              src={featuredItem.image}
              alt={featuredItem.title}
              className="w-full h-[500px] object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8">
            <h3 className="text-2xl md:text-3xl font-semibold text-white">
              {featuredItem.title}
            </h3>
            <p className="text-white/70">{featuredItem.category}</p>
          </div>

          {/* Slider Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 dark:bg-white/20 hover:bg-white/20 dark:hover:bg-white/30 p-3 rounded-full border border-white/20 dark:border-white/40 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 dark:bg-white/20 hover:bg-white/20 dark:hover:bg-white/30 p-3 rounded-full border border-white/20 dark:border-white/40 transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-700 dark:text-gray-300 text-lg mb-16">
          No images found for this category.
        </p>
      )}

      {/* Grid of Images */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto mb-6"
      >
        {gridImages.map((item) => (
          <motion.div
            key={item.id}
            className="relative rounded-xl overflow-hidden group shadow-lg"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 dark:bg-white/10 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-all duration-500">
              <h4 className="text-lg font-semibold mb-2 text-white dark:text-black">
                {item.title}
              </h4>
              <p className="text-white/70 dark:text-black/70 mb-2">{item.category}</p>
              <Button
                variant="outline"
                size="sm"
                className="border-white text-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-gray-200 dark:hover:text-black"
              >
                <Eye className="w-4 h-4 mr-2" /> View
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* See More Button */}
      {!showAll && filteredItems.length > 5 && (
        <div className="text-center mt-4">
          <Button
            size="lg"
            onClick={() => setShowAll(true)}
            className="bg-[#5033E8] text-white hover:bg-[#3a28b0]"
          >
            See More
          </Button>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
