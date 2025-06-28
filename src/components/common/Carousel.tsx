
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Interface for carousel item
interface CarouselItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
}

// Props interface for Carousel component
interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  className?: string;
  itemsPerView?: number; // New prop for controlling how many items to show
}

/**
 * Reusable Carousel component for success stories
 * Purpose: Display success stories in a horizontally scrollable format
 * Features: Manual navigation, responsive design, customizable items per view
 */
const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = false, // Disabled by default for manual control
  autoPlayInterval = 5000,
  showArrows = true,
  className = "",
  itemsPerView = 2 // Show 2 items by default as requested
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Calculate total slides based on items per view
  const totalSlides = Math.ceil(items.length / itemsPerView);
  const maxIndex = totalSlides - 1;

  /**
   * Navigate to the next set of items
   */
  const nextSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  /**
   * Navigate to the previous set of items
   */
  const prevSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };

  /**
   * Get items for current slide
   */
  const getCurrentItems = () => {
    const startIndex = currentIndex * itemsPerView;
    const endIndex = startIndex + itemsPerView;
    return items.slice(startIndex, endIndex);
  };

  // Don't render if no items
  if (!items || items.length === 0) {
    return null;
  }

  const currentItems = getCurrentItems();

  return (
    <div className={`relative w-full ${className}`}>
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out">
          <div className={`grid ${itemsPerView === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-8 w-full flex-shrink-0`}>
            {currentItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-8">
                  {/* Profile Image */}
                  <div className="flex items-center mb-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-blue-100"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                      <p className="text-blue-600 font-medium text-sm">{item.role}</p>
                    </div>
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "{item.quote}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Only show if there are multiple slides */}
      {showArrows && totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50 z-10"
            aria-label="Previous stories"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50 z-10"
            aria-label="Next stories"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </>
      )}

      {/* Slide Indicators - Only show if there are multiple slides */}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-blue-600 scale-110' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Info */}
      <div className="text-center mt-4 text-sm text-gray-500">
        Showing {currentIndex * itemsPerView + 1} - {Math.min((currentIndex + 1) * itemsPerView, items.length)} of {items.length} stories
      </div>
    </div>
  );
};

export default Carousel;
