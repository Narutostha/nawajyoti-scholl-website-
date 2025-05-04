import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar, Clock, MapPin, Plus, X } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { supabase } from '../../lib/supabase';
import { FileUpload } from '../../components/FileUpload/FileUpload';
import { AdminLayout } from '../../components/AdminLayout';

// Define the event schema
const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().optional(),
  location: z.string().optional(),
  image_url: z.string().url('Must be a valid URL').optional(),
});

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  
  // State for event highlights and schedule
  const [highlights, setHighlights] = useState([]);
  const [newHighlight, setNewHighlight] = useState('');
  const [schedule, setSchedule] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  // Initialize highlights and schedule when editing
  useEffect(() => {
    if (editingId) {
      const event = events.find(e => e.id === editingId);
      if (event) {
        setHighlights(event.highlights || []);
        setSchedule(event.schedule || []);
      }
    } else {
      setHighlights([]);
      setSchedule([]);
    }
  }, [editingId, events]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      // Parse JSON strings if they come as strings
      const processedData = data.map(event => ({
        ...event,
        highlights: parseJsonField(event.highlights),
        schedule: parseJsonField(event.schedule)
      }));

      setEvents(processedData || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to parse JSON fields that might be strings
  const parseJsonField = (field) => {
    if (!field) return [];
    if (typeof field === 'string') {
      try {
        return JSON.parse(field);
      } catch (e) {
        return [];
      }
    }
    return field;
  };

  // Format date for display (like "4 Apr 2024")
  const formatDisplayDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  const onSubmit = async (data) => {
    try {
      // Format the date for display
      const formattedDate = formatDisplayDate(data.date);
      
      // Prepare the event data
      const eventData = {
        ...data,
        highlights: highlights,
        schedule: schedule,
        updated_at: new Date().toISOString(),
      };

      if (editingId) {
        const { error } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('events')
          .insert([{
            ...eventData,
            created_at: new Date().toISOString()
          }]);

        if (error) throw error;
      }

      reset();
      setEditingId(null);
      setHighlights([]);
      setSchedule([]);
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleEdit = (event) => {
    setEditingId(event.id);
    
    // Format the date for the input field (YYYY-MM-DD)
    let formattedDate = event.date;
    try {
      const date = new Date(event.date);
      formattedDate = date.toISOString().split('T')[0];
    } catch (e) {
      console.error("Error formatting date:", e);
    }
    
    reset({
      ...event,
      date: formattedDate
    });
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchEvents();
      setDeleteConfirmId(null);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleImageUpload = (url) => {
    setValue('image_url', url);
  };

  // Add a highlight
  const addHighlight = () => {
    if (newHighlight.trim()) {
      setHighlights([...highlights, newHighlight.trim()]);
      setNewHighlight('');
    }
  };

  // Remove a highlight
  const removeHighlight = (index) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  // Add a schedule item
  const addScheduleItem = () => {
    setSchedule([...schedule, { time: '', activity: '' }]);
  };

  // Update a schedule item
  const updateScheduleItem = (index, field, value) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = value;
    setSchedule(newSchedule);
  };

  // Remove a schedule item
  const removeScheduleItem = (index) => {
    setSchedule(schedule.filter((_, i) => i !== index));
  };

  // Filter events based on selected filter
  const getFilteredEvents = () => {
    if (activeFilter === 'all') return events;
    
    const now = new Date();
    
    if (activeFilter === 'upcoming') {
      return events.filter(event => {
        try {
          const eventDate = new Date(event.date);
          return eventDate >= now;
        } catch (e) {
          return true;
        }
      });
    } else if (activeFilter === 'past') {
      return events.filter(event => {
        try {
          const eventDate = new Date(event.date);
          return eventDate < now;
        } catch (e) {
          return false;
        }
      });
    }
    
    return events;
  };

  if (isLoading) {
    return (
      <AdminLayout title="Manage Events">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#12A5BF]"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Manage Events">
      {/* Filter buttons */}
      <div className="mb-6 flex items-center space-x-4">
        <div className="bg-gray-100 rounded-lg p-1">
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md ${activeFilter === 'all' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveFilter('all')}
          >
            All Events
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md ${activeFilter === 'upcoming' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveFilter('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md ${activeFilter === 'past' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveFilter('past')}
          >
            Past
          </button>
        </div>
        
        {editingId && (
          <Button
            variant="outline"
            onClick={() => {
              setEditingId(null);
              reset();
              setHighlights([]);
              setSchedule([]);
            }}
          >
            Cancel Editing
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Event Form */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">
                {editingId ? 'Edit Event' : 'Add Event'}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    {...register('title')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      {...register('date')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                    />
                    {errors.date && (
                      <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 10:00 AM - 2:00 PM"
                      {...register('time')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    {...register('location')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <div className="mt-1 flex items-center gap-4">
                    <input
                      type="text"
                      {...register('image_url')}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                    />
                    <FileUpload onUpload={handleImageUpload} />
                  </div>
                  {errors.image_url && (
                    <p className="mt-1 text-sm text-red-600">{errors.image_url.message}</p>
                  )}
                  {watch('image_url') && (
                    <img
                      src={watch('image_url')}
                      alt="Preview"
                      className="mt-2 rounded-lg w-full h-48 object-cover"
                    />
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="bg-[#12A5BF] hover:bg-[#0f8fa6]"
                  >
                    {editingId ? 'Update' : 'Create'}
                  </Button>
                  {editingId && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditingId(null);
                        reset();
                        setHighlights([]);
                        setSchedule([]);
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Event Highlights Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Event Highlights</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newHighlight}
                  onChange={(e) => setNewHighlight(e.target.value)}
                  placeholder="Add a highlight"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                />
                <Button
                  type="button"
                  onClick={addHighlight}
                  className="bg-[#12A5BF] hover:bg-[#0f8fa6]"
                >
                  Add
                </Button>
              </div>
              
              {highlights.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No highlights added yet. Add some highlights to make your event stand out.</p>
              ) : (
                <ul className="space-y-2">
                  {highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                      <div className="w-2 h-2 bg-[#12A5BF] rounded-full"></div>
                      <span className="flex-1 text-sm">{highlight}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeHighlight(index)}
                        className="h-6 w-6 p-0"
                      >
                        &times;
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Event Schedule Section */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Event Schedule</h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addScheduleItem}
                  className="text-xs"
                >
                  + Add Item
                </Button>
              </div>
              
              {schedule.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No schedule items added yet. Add some items to help attendees plan their day.</p>
              ) : (
                <div className="space-y-3">
                  {schedule.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <input
                        type="text"
                        value={item.time}
                        onChange={(e) => updateScheduleItem(index, 'time', e.target.value)}
                        placeholder="Time (e.g. 10:00 AM)"
                        className="w-1/3 text-sm rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                      />
                      <input
                        type="text"
                        value={item.activity}
                        onChange={(e) => updateScheduleItem(index, 'activity', e.target.value)}
                        placeholder="Activity description"
                        className="flex-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeScheduleItem(index)}
                        className="h-8 w-8 p-0"
                      >
                        &times;
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Event List */}
        <div className="space-y-4">
          {getFilteredEvents().length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-700">No events found</h3>
                <p className="text-gray-500 mt-1">
                  {activeFilter === 'upcoming' 
                    ? 'There are no upcoming events scheduled.' 
                    : activeFilter === 'past' 
                      ? 'There are no past events to display.'
                      : 'Start by creating your first event.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            getFilteredEvents().map((event) => (
              <Card key={event.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <div className="text-sm text-gray-500 mt-2 space-y-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDisplayDate(event.date)}</span>
                        </div>
                        {event.time && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(event)}
                      >
                        Edit
                      </Button>
                      {deleteConfirmId === event.id ? (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-red-600 text-white hover:bg-red-700"
                            onClick={() => handleDelete(event.id)}
                          >
                            Confirm
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteConfirmId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => setDeleteConfirmId(event.id)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600 line-clamp-2">{event.description}</p>
                  
                  {/* Show highlights preview */}
                  {event.highlights && event.highlights.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Highlights:</h4>
                      <div className="flex flex-wrap gap-2">
                        {event.highlights.slice(0, 2).map((highlight, index) => (
                          <span key={index} className="text-xs bg-gray-50 px-2 py-1 rounded-md flex items-center">
                            <div className="w-1.5 h-1.5 bg-[#12A5BF] rounded-full mr-1"></div>
                            {highlight}
                          </span>
                        ))}
                        {event.highlights.length > 2 && (
                          <span className="text-xs text-gray-500">+{event.highlights.length - 2} more</span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Show schedule preview */}
                  {event.schedule && event.schedule.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Schedule:</h4>
                      <div className="text-xs text-gray-600">
                        {event.schedule.length} item{event.schedule.length !== 1 ? 's' : ''} scheduled
                      </div>
                    </div>
                  )}
                  
                  {event.image_url && (
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="mt-4 rounded-lg w-full h-48 object-cover"
                    />
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};