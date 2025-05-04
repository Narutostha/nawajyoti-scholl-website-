import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { supabase } from '../../lib/supabase';
import { FileUpload } from '../../components/FileUpload/FileUpload';

const programSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  image_url: z.string().url('Must be a valid URL').optional(),
  features: z.array(z.string()).optional(),
});

export const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [features, setFeatures] = useState(['']);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(programSchema),
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching programs:', error);
      return;
    }

    setPrograms(data);
  };

  const onSubmit = async (data) => {
    const filteredFeatures = features.filter(feature => feature.trim() !== '');
    const programData = {
      ...data,
      features: filteredFeatures,
    };

    try {
      if (editingId) {
        const { error } = await supabase
          .from('programs')
          .update({
            ...programData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('programs')
          .insert([programData]);

        if (error) throw error;
      }

      reset();
      setEditingId(null);
      setFeatures(['']);
      fetchPrograms();
    } catch (error) {
      console.error('Error saving program:', error);
    }
  };

  const handleEdit = (program) => {
    setEditingId(program.id);
    reset(program);
    setFeatures(program.features || ['']);
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchPrograms();
    } catch (error) {
      console.error('Error deleting program:', error);
    }
  };

  const handleImageUpload = (url: string) => {
    setValue('image_url', url);
  };

  const addFeature = () => {
    setFeatures([...features, '']);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manage Programs</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? 'Edit Program' : 'Add Program'}
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
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                      placeholder="Enter a feature"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeFeature(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addFeature}
                  className="mt-2"
                >
                  Add Feature
                </Button>
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
                      setFeatures(['']);
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
          {programs.map((program) => (
            <Card key={program.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{program.title}</h3>
                    <p className="text-gray-600 mt-2">{program.description}</p>
                    {program.features && program.features.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-700 mb-2">Features:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {program.features.map((feature, index) => (
                            <li key={index} className="text-gray-600">{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(program)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(program.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                {program.image_url && (
                  <img
                    src={program.image_url}
                    alt={program.title}
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