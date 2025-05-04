// src/sections/home/components/AboutSection.tsx

import React from "react";
import { Button } from "../../../components/ui/button";

export const AboutSection: React.FC = () => {
  return (
    <div className="relative w-full px-4 py-12 md:py-16 lg:py-0 lg:h-[650px]">
      <div className="container mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
        <div className="relative w-full max-w-[560px] order-2 lg:order-1">
          <img
            className="w-full h-auto max-h-[450px] object-cover rounded-lg shadow-lg relative z-10"
            alt="School building"
            src="/image-shadow.png"
          />
          <div className="absolute -bottom-4 -right-4 w-full h-full bg-babylonschooledunpeastern-blue/10 rounded-lg z-0"></div>
        </div>
        
        <div className="w-full lg:max-w-[545px] order-1 lg:order-2">
          <div className="text-babylonschooledunpeastern-blue text-base mb-1">
            Welcome To
          </div>
          <h2 className="font-bold text-babylonschooledunptundora text-2xl sm:text-3xl md:text-[32px] mb-4 sm:mb-6">
            Babylon National School
          </h2>
          <div className="text-babylonschooledunptuna text-base leading-7 mb-6">
            <p>We are a community of passionate educators dedicated since 1996 to providing a dynamic and engaging learning environment for all our students. We are located at Shantinagar, Kathmandu.</p>
            <p className="mt-3">Our team of experienced teachers works tirelessly to inspire and motivate students to achieve their full potential. We strive to create a welcoming and inclusive school culture that fosters a love of learning, creativity, and collaboration.</p>
            <p className="mt-3">We are committed to empowering students to become lifelong learners who are equipped with the 21st-century skills and knowledge they need to succeed in a rapidly changing wor...</p>
          </div>
          <Button 
            variant="outline" 
            className="h-[39px] rounded-[10px] border border-babylonschooledunpeastern-blue shadow-[0px_30px_20px_#12a5bf26] bg-babylonschooledunpwhite-02"
          >
            
              href="http://localhost:5173/p/babylon-national-school-4051"
              rel="noopener noreferrer"
              target="_blank"
              className="font-medium text-babylonschooledunpeastern-blue text-sm leading-[24.5px]"
            >
              Read More
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;