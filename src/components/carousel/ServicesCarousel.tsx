// src/components/carousel/ServicesCarousel.tsx

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "../../ui/card";

interface ServiceItem {
  id: number;
  title: string;
  icon: string;
  bgColor: string;
  textColor: string;
  isImage?: boolean;
}

interface ServicesCarouselProps {
  services: ServiceItem[];
}

export const ServicesCarousel: React.FC<ServicesCarouselProps> = ({ services }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Update visible items based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1); // Mobile: 1 item
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2); // Tablet: 2 items
      } else if (window.innerWidth < 1280) {
        setVisibleItems(3); // Desktop: 3 items
      } else {
        setVisibleItems(4); // Large desktop: 4 items
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Set up autoplay
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused, visibleItems]);
  
  // Handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex >= services.length - visibleItems + 1 ? 0 : newIndex;
    });
  };
  
  // Handle previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? services.length - visibleItems : newIndex;
    });
  };
  
  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  return (
    <div className="w-full">
      <div className="relative">
        {/* Navigation buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center focus:outline-none hover:bg-gray-100 transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        
        {/* Carousel container */}
        <div 
          ref={carouselRef}
          className="overflow-hidden mx-4 md:mx-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
          >
            {services.map((service) => (
              <div 
                key={service.id}
                className="flex-shrink-0 px-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
              >
                <Card 
                  className={`${service.bgColor} rounded-[15px] border-none shadow-none h-full`}
                >
                  <CardContent className="flex flex-col items-center justify-center gap-3.5 py-5 px-4 md:py-[30px] md:px-6 lg:px-10 h-full">
                    {service.isImage ? (
                      <div className="relative w-12 h-12 md:w-[60px] md:h-[60px] bg-[url(/1706777337369-2fcfc559-1cdd-4c0b-963c-817a74b63761-png.png)] bg-cover bg-[50%_50%]" />
                    ) : (
                      <div className="flex items-center justify-center w-12 h-12 md:w-[60px] md:h-[60px]">
                        <img className="w-full h-full object-contain" alt={service.title} src={service.icon} />
                      </div>
                    )}
                    
                    {service.id === 5 ? (
                      
                        href="http://localhost:5173/information-center/facilities"
                        rel="noopener noreferrer"
                        target="_blank"
                        className={`text-sm md:text-base font-bold ${service.textColor} text-center whitespace-nowrap`}
                      >
                        VIEW ALL
                      </a>
                    ) : (
                      <div className={`text-sm md:text-base font-bold ${service.textColor} text-center whitespace-nowrap`}>
                        {service.title}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center focus:outline-none hover:bg-gray-100 transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      
      {/* Pagination dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: services.length - visibleItems + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${currentIndex === index ? 'bg-babylonschooledunpeastern-blue' : 'bg-gray-300'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesCarousel;