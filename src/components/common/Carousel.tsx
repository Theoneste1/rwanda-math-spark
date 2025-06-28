
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Interface for carousel items
interface CarouselItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  image?: string;
}

// Props interface for the Carousel component
interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  className?: string;
}

// Reusable horizontal carousel component with touch support
const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
  showArrows = true,
  className = ""
}) => {
  // State for current slide index
  const [currentIndex, setCurrentIndex] = useState(0);
  // State for touch/drag handling
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  
  // Ref for the carousel container
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isDragging) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isDragging, items.length]);

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  // Touch event handlers for mobile swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    setTranslateX(-diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const threshold = 50; // Minimum swipe distance
    if (Math.abs(translateX) > threshold) {
      if (translateX > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
    
    setIsDragging(false);
    setStartX(0);
    setTranslateX(0);
  };

  // Mouse event handlers for desktop drag support
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = startX - currentX;
    setTranslateX(-diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const threshold = 50;
    if (Math.abs(translateX) > threshold) {
      if (translateX > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
    
    setIsDragging(false);
    setStartX(0);
    setTranslateX(0);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Carousel container */}
      <div
        ref={carouselRef}
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%) translateX(${isDragging ? translateX : 0}px)`
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {items.map((item) => (
          <div key={item.id} className="w-full flex-shrink-0 px-4">
            {/* Story card */}
            <div className="bg-white rounded-lg shadow-lg p-8 mx-auto max-w-2xl">
              <div className="flex items-center mb-6">
                {/* Profile image */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-blue-600 font-medium">{item.role}</p>
                </div>
              </div>
              {/* Quote */}
              <p className="text-gray-700 text-lg italic leading-relaxed">
                "{item.quote}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {showArrows && items.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors duration-200 z-10"
            aria-label="Previous story"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors duration-200 z-10"
            aria-label="Next story"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {items.length > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Go to story ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
