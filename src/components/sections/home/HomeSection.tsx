// src/sections/home/HomeSection.tsx

import React from "react";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
// Import other section components as needed

export const HomeSection: React.FC = () => {
  return (
    <section className="flex flex-col w-full items-center">
      {/* Hero Section */}
      <div className="relative w-full h-[450px] sm:h-[600px] md:h-[750px] lg:h-[900px] [background:url(..//section.png)_50%_50%_/_cover]">
        <div className="w-full h-full [background:linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0.01)_12%,rgba(0,0,0,0.04)_22%,rgba(0,0,0,0.07)_31%,rgba(0,0,0,0.12)_39%,rgba(0,0,0,0.18)_47%,rgba(0,0,0,0.25)_53%,rgba(0,0,0,0.32)_59%,rgba(0,0,0,0.39)_64%,rgba(0,0,0,0.47)_69%,rgba(0,0,0,0.54)_74%,rgba(0,0,0,0.61)_79%,rgba(0,0,0,0.67)_84%,rgba(0,0,0,0.72)_89%,rgba(0,0,0,0.76)_94%,rgba(0,0,0,0.79)_100%)]" />
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Services Section */}
      <ServicesSection />
      
      {/* You would add other sections here */}
      {/* <TestimonialSection /> */}
      {/* <EventsSection /> */}
      {/* <CourseCategoriesSection /> */}
      {/* <BlogSection /> */}
    </section>
  );
};

export default HomeSection;