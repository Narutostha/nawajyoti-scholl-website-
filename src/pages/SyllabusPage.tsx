import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Download, FileText } from "lucide-react";
import { supabase } from "../lib/supabase";

export const SyllabusPage = (): JSX.Element => {
  const [syllabusData, setSyllabusData] = useState({
    primary: [],
    secondary: [],
    higher: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSyllabus();
  }, []);

  const fetchSyllabus = async () => {
    try {
      const { data, error } = await supabase
        .from("syllabus")
        .select("*")
        .order("grade");

      if (error) throw error;

      // Group data by level
      const groupedData = {
        primary: data.filter(item => item.level === "primary"),
        secondary: data.filter(item => item.level === "secondary"),
        higher: data.filter(item => item.level === "higher")
      };

      setSyllabusData(groupedData);
    } catch (error) {
      console.error("Error fetching syllabus:", error);
    } finally {
      setLoading(false);
    }
  };

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
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Academic Syllabus</h1>
      <p className="text-gray-600 mb-12 max-w-3xl">
        Access our comprehensive academic syllabi for all grades. Each syllabus outlines the course objectives, 
        learning outcomes, and assessment criteria for the academic year.
      </p>

      <div className="space-y-12">
        {/* Primary Level */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Primary Level</h2>
          {syllabusData.primary.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No syllabus available for this level yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {syllabusData.primary.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.grade}</h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                    )}
                    <Button 
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                      asChild
                    >
                      <a href={item.file_url} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4" />
                        Download Syllabus
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Secondary Level */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Secondary Level</h2>
          {syllabusData.secondary.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No syllabus available for this level yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {syllabusData.secondary.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.grade}</h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                    )}
                    <Button 
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                      asChild
                    >
                      <a href={item.file_url} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4" />
                        Download Syllabus
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Higher Secondary Level */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Higher Secondary Level</h2>
          {syllabusData.higher.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No syllabus available for this level yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {syllabusData.higher.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.grade}</h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                    )}
                    <Button 
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                      asChild
                    >
                      <a href={item.file_url} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4" />
                        Download Syllabus
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};