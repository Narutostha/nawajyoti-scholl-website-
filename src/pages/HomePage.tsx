import React from "react";
import { ServicesSection } from "../components/ServicesSection";
import { TestimonialSection } from "../components/TestimonialSection";
import { EventsSection } from "../components/EventsSection";
import { HeroCarousel } from "../components/HeroCarousel/HeroCarousel";

export const HomePage = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* About Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative">
              <img 
                src="/students.jpg" 
                alt="Students" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                About Our School
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Nava Jyoti School is committed to providing quality education and fostering 
                an environment where students can grow academically, personally, and socially.
              </p>
              <button className="px-6 py-3 bg-[#12A5BF] text-white rounded-lg hover:bg-[#0f8fa6] transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* Events Section */}
      <EventsSection />

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Faculty",
                description: "Experienced teachers dedicated to student success"
              },
              {
                title: "Modern Facilities",
                description: "State-of-the-art infrastructure and learning resources"
              },
              {
                title: "Holistic Development",
                description: "Focus on academic, physical, and personal growth"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};