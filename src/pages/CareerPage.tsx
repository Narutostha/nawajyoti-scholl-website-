import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const jobOpenings = [
  {
    id: 1,
    title: "Mathematics Teacher",
    department: "Secondary Level",
    type: "Full-time",
    experience: "3-5 years",
    deadline: "March 15, 2024",
    requirements: [
      "Master's degree in Mathematics",
      "Teaching experience at secondary level",
      "Excellent communication skills",
      "Knowledge of modern teaching methods"
    ]
  },
  {
    id: 2,
    title: "Science Lab Assistant",
    department: "Science Department",
    type: "Full-time",
    experience: "2-3 years",
    deadline: "March 20, 2024",
    requirements: [
      "Bachelor's degree in Science",
      "Lab management experience",
      "Safety protocol knowledge",
      "Equipment maintenance skills"
    ]
  },
  {
    id: 3,
    title: "Primary Level Teacher",
    department: "Primary Section",
    type: "Full-time",
    experience: "2-4 years",
    deadline: "March 25, 2024",
    requirements: [
      "Bachelor's in Education",
      "Experience with young learners",
      "Creative teaching methods",
      "Patient and nurturing attitude"
    ]
  }
];

export const CareerPage = (): JSX.Element => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Career Opportunities
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join our team of dedicated educators and staff. We're looking for passionate 
          individuals who want to make a difference in education.
        </p>
      </div>

      {/* Why Join Us Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            title: "Professional Growth",
            description: "Continuous learning and development opportunities for all staff members.",
            icon: "🎯"
          },
          {
            title: "Supportive Environment",
            description: "Collaborative workspace with mentoring and team support.",
            icon: "🤝"
          },
          {
            title: "Work-Life Balance",
            description: "Flexible scheduling and comprehensive benefits package.",
            icon: "⚖️"
          }
        ].map((item, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Openings */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Openings</h2>
      <div className="space-y-6 mb-12">
        {jobOpenings.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-[#12A5BF]/10 text-[#12A5BF] px-3 py-1 rounded-full">
                      {job.department}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                      {job.type}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {job.experience}
                    </span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="text-sm text-gray-600">
                    Application Deadline: <span className="font-semibold">{job.deadline}</span>
                  </p>
                </div>
              </div>
              <div className="space-y-2 mb-6">
                <h4 className="font-semibold text-gray-900">Requirements:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              <Button className="bg-[#12A5BF] hover:bg-[#0f8fa6]">
                Apply Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Application Process */}
      <Card className="bg-gray-50 border-none">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Submit Application",
                description: "Fill out the online application form with your details and upload required documents."
              },
              {
                step: "2",
                title: "Initial Screening",
                description: "Our HR team will review your application and contact shortlisted candidates."
              },
              {
                step: "3",
                title: "Interview Process",
                description: "Selected candidates will be invited for interviews and teaching demonstrations."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-[#12A5BF] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};