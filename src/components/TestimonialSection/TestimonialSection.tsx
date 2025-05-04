import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

const testimonials = [
  {
    id: 1,
    name: "Sushil Poudyal",
    role: "Parent of Shuravi Poudyal & Suyog Poudyal",
    image: "/image-1.png",
    quote: {
      question: "तपाईंको विचारमा, स्कूलहरूले नेपालको सांस्कृतिक र परम्परालाईपाठ्यक्रममा कसरी अझ राम्रोसँग समावेश गर्न सक्छन् ?",
      answer: "धन्यवाद दुईचार शब्द राख्न दिनु भएकोमा,\n१. सर्वप्रथम भिन्न भिन्न सांस्कृतिक परम्परा मान्ने हामी नेपाली नेपालीबिच सद्भाव कायम राख्नका लागि एकले अर्काको संस्कृति र परम्परालाई सम्मान अनि आफ्नै पनि हो भन्ने खालका शब्दहरू चयन गरी पाठ्यक्रममा समावेश गर्नुपर्छ ।"
    }
  },
  {
    id: 2,
    name: "Prakash Timilsina",
    role: "Parent of Taranath Timilsina",
    image: "/background.png",
    quote: {
      question: "How can schools better integrate Nepali culture in education?",
      answer: "Schools should create an environment where students can learn about and appreciate different cultural practices. This helps build understanding and respect among students from diverse backgrounds."
    }
  }
];

export const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="border-none shadow-xl bg-gradient-to-br from-[#12A5BF]/5 to-white">
            <CardContent className="p-6 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="space-y-6">
                  <div className="w-10 h-10 bg-[#12A5BF] rounded-full flex items-center justify-center">
                    <img
                      src="/component-1-30.svg"
                      alt="Quote icon"
                      className="w-6 h-6"
                    />
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {testimonials[currentIndex].quote.question}
                  </h2>

                  <div className="text-gray-600 whitespace-pre-line">
                    {testimonials[currentIndex].quote.answer}
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <div className="font-bold text-xl text-gray-900">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-gray-600">
                      {testimonials[currentIndex].role}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      onClick={prevTestimonial}
                      variant="outline"
                      className="rounded-full p-3 hover:bg-[#12A5BF]/10"
                    >
                      <img
                        src="/component-1-50.svg"
                        alt="Previous"
                        className="w-6 h-6"
                      />
                    </Button>
                    <Button
                      onClick={nextTestimonial}
                      variant="outline"
                      className="rounded-full p-3 hover:bg-[#12A5BF]/10"
                    >
                      <img
                        src="/component-1-31.svg"
                        alt="Next"
                        className="w-6 h-6"
                      />
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-square rounded-full overflow-hidden relative z-10">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-[#12A5BF]/20 rounded-full transform translate-x-4 translate-y-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};