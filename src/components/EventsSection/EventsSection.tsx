import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const events = [
  {
    id: 'pre-school-convocation-ceremony',
    title: "Pre-school Convocation Ceremony",
    date: "4",
    month: "Apr",
    image: "/background-1.png"
  },
  {
    id: 'book-talk',
    title: "Book Talk",
    date: "3",
    month: "Mar",
    image: "/background-2.png"
  },
  {
    id: 'pre-primary-exhibition',
    title: "Pre-primary 7th Exhibition 2081",
    date: "28",
    month: "Feb",
    image: "/background-3.png"
  },
  {
    id: 'saraswati-puja',
    title: "Saraswati Puja - 2081",
    date: "3",
    month: "Feb",
    image: "/background-4.png",
    isWide: true
  }
];

export const EventsSection = () => {
  const navigate = useNavigate();

  const handleViewAllClick = () => {
    navigate('/events');
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Latest Events
          </h2>
          <Button 
            variant="ghost"
            className="hidden md:flex items-center gap-2 text-[#12A5BF] hover:text-[#0f8fa6]"
            onClick={handleViewAllClick}
          >
            View All Events
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured Event */}
          <Card className="col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-2 overflow-hidden group">
            <CardContent className="p-0 h-full">
              <Link to={`/events/${events[0].id}`} className="block h-full">
                <div className="relative h-full min-h-[400px] overflow-hidden">
                  <img
                    src={events[0].image}
                    alt={events[0].title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
                  
                  <div className="absolute top-4 left-4 bg-[#12A5BF] text-white p-2 text-center rounded">
                    <div className="text-2xl font-bold leading-tight">{events[0].date}</div>
                    <div className="text-sm">{events[0].month}</div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {events[0].title}
                    </h3>
                    <Button 
                      variant="outline" 
                      className="text-white border-white hover:bg-white hover:text-gray-900"
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>

          {/* Other Events */}
          {events.slice(1).map((event) => (
            <Card 
              key={event.id} 
              className={`overflow-hidden group ${
                event.isWide ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <CardContent className="p-0">
                <Link to={`/events/${event.id}`} className="block">
                  <div className="relative h-[250px] overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
                    
                    <div className="absolute top-4 left-4 bg-[#12A5BF] text-white p-2 text-center rounded">
                      <div className="text-2xl font-bold leading-tight">{event.date}</div>
                      <div className="text-sm">{event.month}</div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        {event.title}
                      </h3>
                      <Button 
                        variant="outline" 
                        className="text-white border-white hover:bg-white hover:text-gray-900"
                      >
                        Read More
                      </Button>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button 
            variant="outline"
            className="text-[#12A5BF] border-[#12A5BF] hover:bg-[#12A5BF] hover:text-white"
            onClick={handleViewAllClick}
          >
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};