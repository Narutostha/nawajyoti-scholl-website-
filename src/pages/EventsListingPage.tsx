import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { supabase } from '../lib/supabase';

export const EventsListingPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: false });

        if (error) throw error;
        
        // Format the data to match your expected structure
        const formattedEvents = data.map(event => ({
          id: event.id,
          title: event.title,
          date: event.date,
          time: event.time || '',
          location: event.location || '',
          image: event.image_url || '/background-1.png', // Default image if none provided
          description: event.description
        }));
        
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#12A5BF]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">School Events</h1>
        <p className="text-gray-600 mb-12">
          Stay updated with all the events and activities happening at our school. Join us in creating memorable experiences and fostering a vibrant learning community.
        </p>

        {events.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-700">No events found</h3>
              <p className="text-gray-500 mt-1">
                Check back later for upcoming events.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/events/${event.id}`}>
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/3 relative h-[200px] md:h-auto">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-full md:w-2/3 p-6">
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          {event.time && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{event.time}</span>
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>

                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                          {event.title}
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {event.description}
                        </p>
                        <Button 
                          variant="outline"
                          className="text-[#12A5BF] border-[#12A5BF] hover:bg-[#12A5BF] hover:text-white"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};