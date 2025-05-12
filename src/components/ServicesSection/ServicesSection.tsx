import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";

const services = [
  {
    id: 1,
    title: "CAFETERIA",
    icon: "/component-1-17.svg",
    bgColor: "bg-red-600",
    textColor: "text-white",
    description: "Our cafeteria provides nutritious and delicious meals in a hygienic environment. We focus on balanced nutrition and diverse menu options to support students' health and well-being.",
    features: [
      "Fresh, healthy meals prepared daily",
      "Balanced nutrition guidelines",
      "Clean and hygienic environment",
      "Varied menu options",
      "Special dietary accommodations"
    ]
  },
  {
    id: 2,
    title: "TRANSPORTATION",
    icon: "/component-1-35.svg",
    bgColor: "bg-purple-50",
    textColor: "text-gray-800",
    description: "Safe and reliable transportation service for students with experienced drivers and well-maintained vehicles. We ensure timely pickup and drop-off with GPS tracking.",
    features: [
      "GPS-equipped vehicles",
      "Experienced drivers",
      "Regular maintenance checks",
      "Door-to-door service",
      "Real-time tracking"
    ]
  },
  {
    id: 3,
    title: "LIBRARY",
    icon: "/component-1-29.svg",
    bgColor: "bg-blue-50",
    textColor: "text-gray-800",
    description: "Our modern library features a vast collection of books, digital resources, and quiet study spaces. We promote reading culture and support academic research.",
    features: [
      "Extensive book collection",
      "Digital resources",
      "Quiet study areas",
      "Research support",
      "Regular new additions"
    ]
  },
  {
    id: 4,
    title: "SCOUT",
    icon: "/1706777337369-2fcfc559-1cdd-4c0b-963c-817a74b63761-png.png",
    bgColor: "bg-pink-50",
    textColor: "text-gray-800",
    isImage: true,
    description: "Our scouting program develops leadership, outdoor skills, and character. Students learn valuable life skills through activities and community service.",
    features: [
      "Leadership development",
      "Outdoor activities",
      "Community service",
      "Skill building",
      "Character development"
    ]
  },
  {
    id: 5,
    title: "VIEW ALL",
    icon: "/component-1-33.svg",
    bgColor: "bg-green-50",
    textColor: "text-gray-800",
    description: "Explore all our services and facilities designed to enhance the educational experience of our students.",
    features: [
      "Modern facilities",
      "Quality education",
      "Student support",
      "Extra-curricular activities",
      "Safety and security"
    ]
  }
];

export const ServicesSection = (): JSX.Element => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Services We Provide
        </h2>

        <div className="relative">
          <Button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 -ml-4 hidden md:flex"
            variant="ghost"
            size="icon"
          >
            <img src="/component-1-31.svg" alt="Previous" className="w-6 h-6" />
          </Button>

          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((service) => (
              <Card 
                key={service.id}
                className={`flex-none w-[280px] sm:w-[300px] ${service.bgColor} border-none shadow-lg snap-center cursor-pointer transform transition-transform hover:scale-105`}
                onClick={() => setSelectedService(service)}
              >
                <CardContent className="flex flex-col items-center justify-center gap-4 p-8">
                  {service.isImage ? (
                    <div className="w-16 h-16 bg-cover bg-center rounded-full"
                         style={{ backgroundImage: `url(${service.icon})` }} />
                  ) : (
                    <img src={service.icon} alt={service.title} className="w-16 h-16" />
                  )}
                  <h3 className={`font-bold text-lg ${service.textColor}`}>{service.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 -mr-4 hidden md:flex"
            variant="ghost"
            size="icon"
          >
            <img src="/component-1-32.svg" alt="Next" className="w-6 h-6" />
          </Button>
        </div>

        <div className="mt-20">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-[300px] lg:h-auto">
                  <img
                    src="/image.png"
                    alt="Cafeteria"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 lg:p-12">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                    What Principle Says 
                  </h3>
                  <p className="text-gray-600 mb-8">Helllo 
                  </p>
                  <Button className="bg-[#12A5BF] hover:bg-[#0f8fa6]">
                    Learn More
                    <img src="/component-1-32.svg" alt="Arrow" className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-4">
              {selectedService?.isImage ? (
                <div className="w-12 h-12 bg-cover bg-center rounded-full"
                     style={{ backgroundImage: `url(${selectedService?.icon})` }} />
              ) : (
                <img src={selectedService?.icon} alt={selectedService?.title} className="w-12 h-12" />
              )}
              {selectedService?.title || 'Service Details'}
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600 mt-4">
              {selectedService?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6">
            <h4 className="font-semibold text-lg mb-4">Key Features:</h4>
            <ul className="space-y-2">
              {selectedService?.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#12A5BF] rounded-full" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <Button 
              className="w-full bg-[#12A5BF] hover:bg-[#0f8fa6] text-white"
              onClick={() => setSelectedService(null)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};