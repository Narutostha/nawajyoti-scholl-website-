import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { supabase } from '../../lib/supabase';

const settingsSchema = z.object({
  school_name: z.string().min(1, 'School name is required'),
  contact_email: z.string().email('Invalid email address'),
  contact_phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  social_media: z.object({
    facebook: z.string().url('Must be a valid URL').optional(),
    twitter: z.string().url('Must be a valid URL').optional(),
    instagram: z.string().url('Must be a valid URL').optional(),
    linkedin: z.string().url('Must be a valid URL').optional(),
  }),
});

export const SettingsPage = () => {
  const [settings, setSettings] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(settingsSchema),
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('key', 'general_settings')
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching settings:', error);
      return;
    }

    if (data) {
      setSettings(data.value);
      reset(data.value);
    }
  };

  const onSubmit = async (data) => {
    try {
      const { error } = await supabase
        .from('settings')
        .upsert({
          key: 'general_settings',
          value: data,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      setSettings(data);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Website Settings</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">General Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    School Name
                  </label>
                  <input
                    type="text"
                    {...register('school_name')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                  />
                  {errors.school_name && (
                    <p className="mt-1 text-sm text-red-600">{errors.school_name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    {...register('contact_email')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                  />
                  {errors.contact_email && (
                    <p className="mt-1 text-sm text-red-600">{errors.contact_email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    {...register('contact_phone')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                  />
                  {errors.contact_phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.contact_phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <textarea
                    {...register('address')}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Social Media Links</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Facebook
                  </label>
                  <input
                    type="url"
                    {...register('social_media.facebook')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                  />
                  {errors.social_media?.facebook && (
                    <p className="mt-1 text-sm text-red-600">{errors.social_media.facebook.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Twitter
                  </label>
                  <input
                    type="url"
                    {...register('social_media.twitter')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                  />
                  {errors.social_media?.twitter && (
                    <p className="mt-1 text-sm text-red-600">{errors.social_media.twitter.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Instagram
                  </label>
                  <input
                    type="url"
                    {...register('social_media.instagram')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                  />
                  {errors.social_media?.instagram && (
                    <p className="mt-1 text-sm text-red-600">{errors.social_media.instagram.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    {...register('social_media.linkedin')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                  />
                  {errors.social_media?.linkedin && (
                    <p className="mt-1 text-sm text-red-600">{errors.social_media.linkedin.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-[#12A5BF] hover:bg-[#0f8fa6]"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Settings'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};