import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { supabase } from '../../lib/supabase';
import { FileUpload } from '../../components/FileUpload/FileUpload';
import { AdminLayout } from '../../components/AdminLayout';
import { Download, FileText, Trash2, Plus, Edit, Check, X } from 'lucide-react';

// Define the syllabus schema
const syllabusSchema = z.object({
  grade: z.string().min(1, 'Grade is required'),
  level: z.string().min(1, 'Level is required'),
  description: z.string().optional(),
  file_url: z.string().url('Must be a valid URL').min(1, 'File URL is required'),
});

export const SyllabusPage = () => {
  const [syllabusList, setSyllabusList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [activeTab, setActiveTab] = useState('primary');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(syllabusSchema),
    defaultValues: {
      level: 'primary',
    }
  });

  useEffect(() => {
    fetchSyllabus();
  }, []);

  const fetchSyllabus = async () => {
    try {
      const { data, error } = await supabase
        .from('syllabus')
        .select('*')
        .order('grade');

      if (error) throw error;

      setSyllabusList(data || []);
    } catch (error) {
      console.error('Error fetching syllabus:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        const { error } = await supabase
          .from('syllabus')
          .update({
            ...data,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('syllabus')
          .insert([{
            ...data,
            created_at: new Date().toISOString(),
          }]);

        if (error) throw error;
      }

      reset({
        grade: '',
        level: 'primary',
        description: '',
        file_url: '',
      });
      setEditingId(null);
      fetchSyllabus();
    } catch (error) {
      console.error('Error saving syllabus:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    reset({
      grade: item.grade,
      level: item.level,
      description: item.description || '',
      file_url: item.file_url,
    });
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('syllabus')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchSyllabus();
      setDeleteConfirmId(null);
    } catch (error) {
      console.error('Error deleting syllabus:', error);
    }
  };

  const handleFileUpload = (url) => {
    setValue('file_url', url);
  };

  const getFilteredSyllabus = () => {
    return syllabusList.filter(item => item.level === activeTab);
  };

  if (isLoading) {
    return (
      <AdminLayout title="Manage Syllabus">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#12A5BF]"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Manage Syllabus">
      {/* Level tabs */}
      <div className="mb-6">
        <div className="bg-gray-100 rounded-lg p-1 inline-flex">
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'primary' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('primary')}
          >
            Primary
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'secondary' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('secondary')}
          >
            Secondary
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'higher' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('higher')}
          >
            Higher Secondary
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Syllabus Form */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? 'Edit Syllabus' : 'Add Syllabus'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Grade
                </label>
                <input
                  type="text"
                  {...register('grade')}
                  placeholder="e.g. Grade 1 or Grade 11 Science"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                />
                {errors.grade && (
                  <p className="mt-1 text-sm text-red-600">{errors.grade.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Level
                </label>
                <select
                  {...register('level')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="higher">Higher Secondary</option>
                </select>
                {errors.level && (
                  <p className="mt-1 text-sm text-red-600">{errors.level.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description (Optional)
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  placeholder="Brief description of the syllabus"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  PDF File
                </label>
                <div className="mt-1 flex items-center gap-4">
                  <input
                    type="text"
                    {...register('file_url')}
                    placeholder="URL to PDF file"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#12A5BF] focus:ring-[#12A5BF]"
                  />
                  <FileUpload onUpload={handleFileUpload} />
                </div>
                {errors.file_url && (
                  <p className="mt-1 text-sm text-red-600">{errors.file_url.message}</p>
                )}
                {watch('file_url') && (
                  <div className="mt-2 flex items-center text-sm text-gray-600">
                    <FileText className="w-4 h-4 mr-2" />
                    <span className="truncate">{watch('file_url').split('/').pop()}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="bg-[#12A5BF] hover:bg-[#0f8fa6]"
                >
                  {editingId ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Update
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </>
                  )}
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      reset({
                        grade: '',
                        level: 'primary',
                        description: '',
                        file_url: '',
                      });
                    }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Syllabus List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            {activeTab === 'primary' ? 'Primary Level Syllabus' : 
             activeTab === 'secondary' ? 'Secondary Level Syllabus' : 
             'Higher Secondary Level Syllabus'}
          </h2>

          {getFilteredSyllabus().length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-700">No syllabus found</h3>
                <p className="text-gray-500 mt-1">
                  Add your first syllabus for this level using the form.
                </p>
              </CardContent>
            </Card>
          ) : (
            getFilteredSyllabus().map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{item.grade}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      )}
                      <div className="mt-4">
                        <a 
                          href={item.file_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-[#12A5BF] hover:text-[#0f8fa6]"
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          {item.file_url.split('/').pop()}
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      
                      {deleteConfirmId === item.id ? (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-red-600 text-white hover:bg-red-700 h-8"
                            onClick={() => handleDelete(item.id)}
                          >
                            Confirm
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8"
                            onClick={() => setDeleteConfirmId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 h-8"
                          onClick={() => setDeleteConfirmId(item.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Added: {new Date(item.created_at).toLocaleDateString()}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8"
                      asChild
                    >
                      <a 
                        href={item.file_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};