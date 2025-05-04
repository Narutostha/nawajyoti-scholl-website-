import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { supabase } from '../lib/supabase';

interface StaffMember {
  id: string;
  name: string;
  position: string;
  image_url?: string;
  bio?: string;
}

export const AboutPage = () => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setStaff(data || []);
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const milestones = [
    { year: "2038 B.S.", event: "School Establishment" },
    { year: "2045 B.S.", event: "Secondary Level Addition" },
    { year: "2055 B.S.", event: "Higher Secondary Level Addition" },
    { year: "2065 B.S.", event: "Modern Infrastructure Development" }
  ];

  const values = [
    {
      title: "Academic Excellence",
      description: "Commitment to highest standards of education and learning"
    },
    {
      title: "Character Development",
      description: "Fostering moral values and ethical behavior"
    },
    {
      title: "Innovation",
      description: "Embracing modern teaching methods and technology"
    },
    {
      title: "Inclusivity",
      description: "Creating a welcoming environment for all students"
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px]">
        <div className="absolute inset-0 bg-[url('/students.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-lg text-white/90">
              Building futures through quality education since 2038 B.S.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Our Story
              </h2>
              <div className="prose max-w-none text-gray-600">
                <p>
                  Nava Jyoti Higher Secondary School has been a cornerstone of education in Kathmandu 
                  since its establishment in 2038 B.S. Our journey began with a vision to provide 
                  quality education that combines academic excellence with character development.
                </p>
                <p>
                  Over the years, we have grown from a small school to a leading educational 
                  institution, consistently adapting our methods while maintaining our core values 
                  and traditions.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/teachers.jpg" 
                alt="School History" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-[#12A5BF] rounded-lg -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Our Team
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {staff.map(member => (
                <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    {member.image_url ? (
                      <img
                        src={member.image_url}
                        alt={member.name}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.position}</p>
                      {member.bio && (
                        <p className="mt-2 text-sm text-gray-500 line-clamp-2">{member.bio}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Our Journey
          </h2>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0 w-24 md:w-32 pt-1">
                  <div className="text-lg font-bold text-[#12A5BF]">{milestone.year}</div>
                </div>
                <div className="flex-grow">
                  <Card className="border-none shadow">
                    <CardContent className="p-4">
                      <p className="text-gray-800">{milestone.event}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};