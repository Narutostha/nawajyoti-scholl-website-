import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { supabase } from '../lib/supabase';

interface Program {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  features?: string[];
}

export const ProgramsPage = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPrograms(data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-lg mb-4" />
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Our Programs
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our comprehensive educational programs designed to nurture talent, foster growth, and prepare students for future success.
        </p>
      </div>

      <div className="space-y-12">
        {programs.map((program, index) => (
          <Card key={program.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className={`grid grid-cols-1 lg:grid-cols-2 ${
                index % 2 === 0 ? '' : 'lg:flex-row-reverse'
              }`}>
                <div className="relative h-[300px] lg:h-auto">
                  {program.image_url ? (
                    <img
                      src={program.image_url}
                      alt={program.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                </div>
                <div className="p-8 lg:p-12">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {program.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {program.description}
                  </p>
                  {program.features && program.features.length > 0 && (
                    <div className="space-y-3 mb-8">
                      <h3 className="font-semibold text-gray-900">Key Features:</h3>
                      <ul className="space-y-2">
                        {program.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#12A5BF] rounded-full" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Button className="bg-[#12A5BF] hover:bg-[#0f8fa6]">
                    Learn More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {programs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No programs available at the moment.</p>
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <Card className="bg-[#12A5BF]/5 border-none">
          <CardContent className="py-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Join Our School?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Take the first step towards quality education. Apply now for admission 
              to our academic programs.
            </p>
            <Button 
              size="lg"
              className="bg-[#12A5BF] hover:bg-[#0f8fa6]"
              onClick={() => window.location.href = '/apply'}
            >
              Apply Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};