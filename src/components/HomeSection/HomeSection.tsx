import React from "react";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { ServicesSection } from "./sections/ServicesSection";
import { TestimonialSection } from "./sections/TestimonialSection";
import { EventsSection } from "./sections/EventsSection";
import { CoursesSection } from "./sections/CoursesSection";
import { BlogSection } from "./sections/BlogSection";

export const HomeSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-center">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialSection />
      <EventsSection />
      <CoursesSection />
      <BlogSection />
    </section>
  );
};

