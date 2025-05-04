import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { supabase } from '../../lib/supabase';
import { FileUpload } from '../../components/FileUpload/FileUpload';

const newsSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  image_url: z.string().url('Must be a valid URL').optional(),
});

export const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newsSchema),
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching news:', error);
      return;
    }

    setNews(data);
  };

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        const { error } = await supabase
          .from('news')
          .update({
            ...data,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('news')
          .insert([{ ...data }]);

        if (error) throw error;
      }

      reset();
      setEditingId(null);
      fetchNews();
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };

  const handleEdit = (newsItem) => {
    setEditingId(newsItem.id);
    reset(newsItem);
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchNews();
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  const handleImageUpload = (url: string) => {
    setValue('image_url', url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manage News</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? 'Edit News' : 'Add News'}
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
                  Content
                </label>
                <textarea
                  {...register('content')}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                )}
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

        <div className="space-y-4">
          {news.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <p className="mt-2 text-gray-600">{item.content}</p>
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="mt-4 rounded-lg w-full h-48 object-cover"
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};