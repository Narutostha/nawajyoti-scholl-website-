import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const events = [
  {
    date: "2024-02-15",
    title: "Annual Sports Meet",
    type: "Sports",
    time: "9:00 AM - 4:00 PM"
  },
  {
    date: "2024-02-20",
    title: "Parent-Teacher Meeting",
    type: "Academic",
    time: "10:00 AM - 2:00 PM"
  },
  {
    date: "2024-03-01",
    title: "Science Exhibition",
    type: "Academic",
    time: "11:00 AM - 3:00 PM"
  },
  {
    date: "2024-03-08",
    title: "Cultural Program",
    type: "Cultural",
    time: "1:00 PM - 5:00 PM"
  }
];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const CalendarPage = (): JSX.Element => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events.filter(event => event.date === date);
      
      days.push(
        <div 
          key={day}
          className={`h-24 border border-gray-200 p-2 cursor-pointer transition-colors ${
            selectedDate === date ? 'bg-[#12A5BF]/10' : 'hover:bg-gray-50'
          }`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="font-semibold mb-1">{day}</div>
          {dayEvents.map((event, index) => (
            <div 
              key={index}
              className="text-xs bg-[#12A5BF] text-white rounded px-1 py-0.5 mb-1 truncate"
            >
              {event.title}
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (increment: number) => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + increment)));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Academic Calendar</h1>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline"
              onClick={() => changeMonth(-1)}
            >
              Previous
            </Button>
            <span className="text-xl font-semibold">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Button 
              variant="outline"
              onClick={() => changeMonth(1)}
            >
              Next
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px mb-8">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-semibold py-2 bg-gray-50">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px mb-8">
          {renderCalendar()}
        </div>

        {selectedDate && (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Events on {selectedDate}</h2>
              {events.filter(event => event.date === selectedDate).map((event, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <div className="text-gray-600">
                    <p>Time: {event.time}</p>
                    <p>Type: {event.type}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};