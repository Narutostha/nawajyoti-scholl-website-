import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { supabase } from '../../lib/supabase';
import { AdminLayout } from '../../components/AdminLayout';
import { Mail, Phone, MapPin, Clock, Save, AlertCircle } from 'lucide-react';

const iconMap = {
  phone: Phone,
  email: Mail,
  address: MapPin,
  hours: Clock
};

export const ContactDetailsPage = () => {
  const [contactDetails, setContactDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    fetchContactDetails();
  }, []);

  const fetchContactDetails = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_details')
        .select('*')
        .order('display_order');

      if (error) throw error;

      setContactDetails(data || []);
    } catch (error) {
      console.error('Error fetching contact details:', error);
      showAlert('Failed to load contact details', 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateContactDetail = async (id, field, value) => {
    const updatedDetails = contactDetails.map(detail => 
      detail.id === id ? { ...detail, [field]: value } : detail
    );
    setContactDetails(updatedDetails);
  };

  const saveChanges = async () => {
    try {
      setSaving(true);
      
      // Update each contact detail
      for (const detail of contactDetails) {
        const { error } = await supabase
          .from('contact_details')
          .update({
            title: detail.title,
            value: detail.value,
            action: detail.action
          })
          .eq('id', detail.id);
          
        if (error) throw error;
      }
      
      showAlert('Contact details updated successfully', 'success');
    } catch (error) {
      console.error('Error saving contact details:', error);
      showAlert('Failed to save changes', 'error');
    } finally {
      setSaving(false);
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
  };

  if (loading) {
    return (
      <AdminLayout title="Contact Information">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#12A5BF]"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Contact Information">
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Edit Contact Information</CardTitle>
          <p className="text-sm text-gray-500">
            Update the contact information displayed on the Contact Us page.
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-end">
            <Button 
              onClick={saveChanges} 
              disabled={saving}
              className="bg-[#12A5BF] hover:bg-[#0f8fa6]"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>

          {/* Alert */}
          {alert.show && (
            <div className={`mb-4 p-3 rounded-md ${
              alert.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                {alert.message}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactDetails.map((detail) => {
              const Icon = iconMap[detail.type];
              
              return (
                <Card key={detail.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-[#12A5BF]/10 rounded-full flex items-center justify-center mr-3 text-[#12A5BF]">
                        {Icon && <Icon className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={detail.title}
                          onChange={(e) => updateContactDetail(detail.id, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12A5BF]"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {detail.type === 'phone' ? 'Phone Number' : 
                         detail.type === 'email' ? 'Email Address' : 
                         detail.type === 'address' ? 'Address' : 'Working Hours'}
                      </label>
                      <input
                        type="text"
                        value={detail.value}
                        onChange={(e) => updateContactDetail(detail.id, 'value', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12A5BF]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Button Text
                      </label>
                      <input
                        type="text"
                        value={detail.action}
                        onChange={(e) => updateContactDetail(detail.id, 'action', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12A5BF]"
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Contact Information Preview</CardTitle>
          <p className="text-sm text-gray-500">
            This is how your contact information will appear on the website
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactDetails.map((item) => {
              const Icon = iconMap[item.type];
              
              return (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-[#12A5BF]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#12A5BF]">
                      {Icon && <Icon className="w-6 h-6" />}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.value}</p>
                    <Button variant="link" className="text-[#12A5BF]">
                      {item.action}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};