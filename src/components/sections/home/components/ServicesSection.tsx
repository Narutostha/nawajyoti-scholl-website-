// src/sections/home/components/ServicesSection.tsx

import React from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import ServicesCarousel from "../../../components/carousel/ServicesCarousel";
import { services } from "../data/homeData";

export const ServicesSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-16 md:py-24 w-full bg-babylonschooledunpmagnolia relative">
      {/* Decorative wave */}
      <div className="hidden md:flex flex-col w-full items-start absolute top-0 left-0 overflow-hidden">
        <img
          className="relative w-full h-[83px]"
          alt="Wave decoration"
          src="/component-1-14.svg"
        />
      </div>
      
      <div className="container mx-auto px-4 flex flex-col items-center gap-8 md:gap-12 relative">
        <h2 className="font-bold text-babylonschooledunptundora text-2xl md:text-3xl lg:text-4xl text-center">
          Services We Provide
        </h2>
        
        {/* Services Carousel */}
        <ServicesCarousel services={services} />
        
        {/* Featured Service - Cafeteria */}
        <Card className="w-full rounded-[15px] overflow-hidden border-none shadow-none bg-babylonschooledunpwhite mt-8">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 md:h-[450px] overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="Cafeteria"
                  src="/image.png"
                />
              </div>
              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
                <h3 className="font-bold text-2xl md:text-[32px] text-babylonschooledunptundora mb-4 md:mb-6">
                  Cafeteria
                </h3>
                <div className="text-babylonschooledunptuna text-base leading-7 mb-6">
                  <p>Indulge in a healthy culinary experience at our school cafeteria, where we prioritize the well-being of our students.</p>
                  <p className="mt-3">Our hygienic cafeteria is dedicated to serving nutritious meals, providing a foundation for their overall growth and development.</p>
                  <p className="mt-3">With a meticulously crafted and well-developed kitchen menu, we ensure that every meal supplies the es...</p>
                </div>
                <div className="mt-auto">
                  <Button 
                    className="bg-[#12a5bf] rounded-[10px] shadow-[0px_60px_45px_#2836491a] text-babylonschooledunpwhite"
                  >
                    
                      href="http://localhost:5173/p/cafeteria-10639"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="font-medium text-babylonschooledunpwhite text-sm whitespace-nowrap flex items-center"
                    >
                      Read More
                      <img
                        className="ml-2 w-[22px] h-[22px]"
                        alt="Arrow icon"
                        src="/component-1-32.svg"
                      />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServicesSection;