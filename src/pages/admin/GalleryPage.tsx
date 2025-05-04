import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { supabase } from '../../lib/supabase';
import { FileUpload } from '../../components/FileUpload/FileUpload';

const gallerySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  image_url: z.string().url('Must be a valid URL'),
  category: z.string().optional(),
});

export const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(gallerySchema),
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching images:', error);
      return;
    }

    setImages(data);
  };

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        const { error } = await supabase
          .from('gallery')
          .update(data)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('gallery')
          .insert([data]);

        if (error) throw error;
      }

      reset();
      setEditingId(null);
      fetchImages();
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const handleEdit = (image) => {
    setEditingId(image.id);
    reset(image);
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleImageUpload = (url: string) => {
    setValue('image_url', url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manage Gallery</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? 'Edit Image' : 'Add Image'}
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
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  {...register('category')}
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
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((image) => (
            <Card key={image.id}>
              <CardContent className="p-4">
                <img
                  src={image.image_url}
                  alt={image.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{image.title}</h3>
                    {image.category && (
                      <span className="text-sm text-gray-500">{image.category}</span>
                    )}
                    {image.description && (
                      <p className="text-sm text-gray-600 mt-1">{image.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(image)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(image.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};