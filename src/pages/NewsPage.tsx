import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const newsItems = [
  {
    id: 1,
    title: "Annual Sports Meet 2024",
    date: "February 15, 2024",
    category: "Sports",
    image: "/background-1.png",
    excerpt: "Join us for our annual sports meet featuring various athletic competitions and team events."
  },
  {
    id: 2,
    title: "Science Fair Winners Announced",
    date: "February 10, 2024",
    category: "Academics",
    image: "/background-2.png",
    excerpt: "Congratulations to all participants and winners of this year's Science Fair exhibition."
  },
  {
    id: 3,
    title: "New Computer Lab Inauguration",
    date: "February 5, 2024",
    category: "Infrastructure",
    image: "/background-3.png",
    excerpt: "State-of-the-art computer lab with latest technology to enhance digital learning experience."
  },
  {
    id: 4,
    title: "Parent-Teacher Meeting Schedule",
    date: "February 1, 2024",
    category: "Events",
    image: "/background-4.png",
    excerpt: "Important announcement regarding the upcoming parent-teacher meeting dates and schedule."
  }
];

export const NewsPage = (): JSX.Element => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative h-[200px] md:h-[300px] rounded-xl overflow-hidden mb-12">
        <div className="absolute inset-0 bg-[#12A5BF] bg-opacity-10">
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                School News & Updates
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Stay informed about the latest happenings, achievements, and announcements at our school.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative h-48">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-[#12A5BF]">
                  {item.category}
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">{item.date}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <Button 
                  variant="outline"
                  className="w-full text-[#12A5BF] border-[#12A5BF] hover:bg-[#12A5BF] hover:text-white"
                >
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="mt-16 bg-gray-50 rounded-xl p-8 md:p-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 mb-6">
            Get the latest news and updates delivered directly to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#12A5BF] focus:border-transparent"
            />
            <Button className="bg-[#12A5BF] hover:bg-[#0f8fa6]">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};