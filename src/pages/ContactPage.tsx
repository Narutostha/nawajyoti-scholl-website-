import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Mail, Phone, MapPin, Clock, Check, AlertCircle } from "lucide-react";
import { supabase } from "../lib/supabase";

const iconMap = {
  phone: Phone,
  email: Mail,
  address: MapPin,
  hours: Clock
};

export const ContactPage = (): JSX.Element => {
  const [contactDetails, setContactDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ show: false, success: false, message: '' });

  useEffect(() => {
    fetchContactDetails();
  }, []);

  const fetchContactDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_details')
        .select('*')
        .order('display_order');

      if (error) throw error;

      setContactDetails(data || []);
    } catch (error) {
      console.error('Error fetching contact details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.first_name.trim()) errors.first_name = 'First name is required';
    if (!formData.last_name.trim()) errors.last_name = 'Last name is required';
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const { error } = await supabase
        .from('enquiries')
        .insert([
          {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            status: 'new'
          }
        ]);

      if (error) throw error;

      // Reset form
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Show success message
      setSubmitStatus({ 
        show: true, 
        success: true, 
        message: 'Your message has been sent successfully! We will get back to you soon.' 
      });
      
      // Hide message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ show: false, success: false, message: '' });
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ 
        show: true, 
        success: false, 
        message: 'There was an error sending your message. Please try again later.' 
      });
    }
  };

  // Helper to get correct icon for contact detail
  const getIcon = (type) => {
    const Icon = iconMap[type];
    return Icon ? <Icon className="w-6 h-6" /> : null;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Contact Us
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have questions? We're here to help. Reach out to us through any of the channels below.
        </p>
      </div>

      {/* Contact Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {loading ? (
          // Loading skeleton
          Array(4).fill(0).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-5 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </CardContent>
            </Card>
          ))
        ) : (
          contactDetails.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#12A5BF]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#12A5BF]">
                  {getIcon(item.type)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.value}</p>
                <Button variant="link" className="text-[#12A5BF]">
                  {item.action}
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Contact Form */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            {/* Form Status Alert */}
            {submitStatus.show && (
              <div className={`mb-6 p-4 rounded-lg flex items-start ${
                submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}>
                {submitStatus.success ? (
                  <Check className="w-5 h-5 mr-3 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                )}
                <p>{submitStatus.message}</p>
              </div>
            )}
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12A5BF] ${
                      formErrors.first_name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.first_name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.first_name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12A5BF] ${
                      formErrors.last_name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.last_name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.last_name}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12A5BF] ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12A5BF] ${
                    formErrors.subject ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.subject && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.subject}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12A5BF] ${
                    formErrors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full bg-[#12A5BF] hover:bg-[#0f8fa6]"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Map */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Location</h2>
            <div className="aspect-square w-full bg-gray-200 rounded-lg">
              {/* Map will be integrated here */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Map Integration
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card className="bg-gray-50 border-none">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "What are the school hours?",
                answer: "Our school operates from 9:00 AM to 4:00 PM, Sunday through Friday."
              },
              {
                question: "How can I apply for admission?",
                answer: "You can apply online through our admissions portal or visit our office during working hours."
              },
              {
                question: "Do you provide transportation?",
                answer: "Yes, we offer transportation services covering major areas of Kathmandu valley."
              },
              {
                question: "What is the admission process?",
                answer: "The admission process includes form submission, entrance test, and interview."
              }
            ].map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};