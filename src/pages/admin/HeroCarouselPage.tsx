import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { supabase } from '../../lib/supabase';
import { FileUpload } from '../../components/FileUpload/FileUpload';
import { AdminLayout } from '../../components/AdminLayout';

const heroSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  image_url: z.string().url('Must be a valid URL'),
  button_text: z.string().optional(),
  button_link: z.string().url('Must be a valid URL').optional(),
  active: z.boolean().default(true),
  order: z.number().int().default(0),
});

export const HeroCarouselPage = () => {
  const [slides, setSlides] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      active: true,
      order: 0,
    },
  });

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_carousel')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;

      setSlides(data || []);
    } catch (error) {
      console.error('Error fetching slides:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        const { error } = await supabase
          .from('hero_carousel')
          .update({
            ...data,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('hero_carousel')
          .insert([data]);

        if (error) throw error;
      }

      reset();
      setEditingId(null);
      fetchSlides();
    } catch (error) {
      console.error('Error saving slide:', error);
    }
  };

  const handleEdit = (slide) => {
    setEditingId(slide.id);
    reset(slide);
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('hero_carousel')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchSlides();
    } catch (error) {
      console.error('Error deleting slide:', error);
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const currentSlide = slides.find(slide => slide.id === id);
    const currentIndex = slides.findIndex(slide => slide.id === id);
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0 || newIndex >= slides.length) return;

    const targetSlide = slides[newIndex];
    
    try {
      const { error: error1 } = await supabase
        .from('hero_carousel')
        .update({ order: targetSlide.order })
        .eq('id', currentSlide.id);

      const { error: error2 } = await supabase
        .from('hero_carousel')
        .update({ order: currentSlide.order })
        .eq('id', targetSlide.id);

      if (error1 || error2) throw error1 || error2;

      fetchSlides();
    } catch (error) {
      console.error('Error reordering slides:', error);
    }
  };

  const handleImageUpload = (url: string) => {
    setValue('image_url', url);
  };

  if (isLoading) {
    return (
      <AdminLayout title="Manage Hero Carousel">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#12A5BF]"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Manage Hero Carousel">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? 'Edit Slide' : 'Add Slide'}
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
                  Subtitle
                </label>
                <input
                  type="text"
                  {...register('subtitle')}
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

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Button Text
                </label>
                <input
                  type="text"
                  {...register('button_text')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Button Link
                </label>
                <input
                  type="text"
                  {...register('button_link')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                />
                {errors.button_link && (
                  <p className="mt-1 text-sm text-red-600">{errors.button_link.message}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('active')}
                  className="h-4 w-4 text-[#12A5BF] focus:ring-[#12A5BF] border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Active
                </label>
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
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {slides.map((slide, index) => (
            <Card key={slide.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{slide.title}</h3>
                    {slide.subtitle && (
                      <p className="text-gray-600">{slide.subtitle}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-1 text-xs rounded ${
                        slide.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {slide.active ? 'Active' : 'Inactive'}
                      </span>
                      <span className="text-gray-500 text-sm">
                        Order: {slide.order}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReorder(slide.id, 'up')}
                        disabled={index === 0}
                      >
                        ↑
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReorder(slide.id, 'down')}
                        disabled={index === slides.length - 1}
                      >
                        ↓
                      </Button>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(slide)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(slide.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
                {slide.image_url && (
                  <img
                    src={slide.image_url}
                    alt={slide.title}
                    className="mt-4 rounded-lg w-full h-48 object-cover"
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};