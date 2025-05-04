import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { supabase } from '../../lib/supabase';
import { AdminLayout } from '../../components/AdminLayout';
import { MessageSquare, Search, Trash2, User, Mail, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export const EnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [note, setNote] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  
  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setEnquiries(data || []);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateEnquiryStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('enquiries')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setEnquiries(enquiries.map(e => 
        e.id === id ? { ...e, status } : e
      ));
      
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status });
      }
    } catch (error) {
      console.error('Error updating enquiry status:', error);
    }
  };

  const addNote = async () => {
    if (!note.trim() || !selectedEnquiry) return;

    try {
      const updatedNotes = selectedEnquiry.notes 
        ? `${selectedEnquiry.notes}\n\n${new Date().toLocaleString()}: ${note}`
        : `${new Date().toLocaleString()}: ${note}`;

      const { error } = await supabase
        .from('enquiries')
        .update({ notes: updatedNotes })
        .eq('id', selectedEnquiry.id);

      if (error) throw error;

      // Update local state
      setEnquiries(enquiries.map(e => 
        e.id === selectedEnquiry.id ? { ...e, notes: updatedNotes } : e
      ));
      
      setSelectedEnquiry({ ...selectedEnquiry, notes: updatedNotes });
      setNote('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleDeleteEnquiry = async () => {
    if (!selectedEnquiry) return;

    try {
      const { error } = await supabase
        .from('enquiries')
        .delete()
        .eq('id', selectedEnquiry.id);

      if (error) throw error;

      // Update local state
      setEnquiries(enquiries.filter(e => e.id !== selectedEnquiry.id));
      setSelectedEnquiry(null);
      setDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting enquiry:', error);
    }
  };

  const filterEnquiries = () => {
    let filtered = [...enquiries];
    
    // Filter by status
    if (filter !== 'all') {
      filtered = filtered.filter(e => e.status === filter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(e => 
        e.first_name.toLowerCase().includes(term) ||
        e.last_name.toLowerCase().includes(term) ||
        e.email.toLowerCase().includes(term) ||
        e.subject.toLowerCase().includes(term) ||
        e.message.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Get status badge className
  const getStatusClass = (status) => {
    switch(status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Contact Enquiries">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#12A5BF]"></div>
        </div>
      </AdminLayout>
    );
  }

  const filteredEnquiries = filterEnquiries();

  return (
    <AdminLayout title="Contact Enquiries">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enquiry List */}
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search enquiries..."
                  className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#12A5BF]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              {/* Simple Filter Buttons */}
              <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
                <button
                  className={`flex-1 py-2 text-sm font-medium rounded-md ${filter === 'all' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button
                  className={`flex-1 py-2 text-sm font-medium rounded-md ${filter === 'new' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setFilter('new')}
                >
                  New
                </button>
                <button
                  className={`flex-1 py-2 text-sm font-medium rounded-md ${filter === 'in_progress' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setFilter('in_progress')}
                >
                  In Progress
                </button>
                <button
                  className={`flex-1 py-2 text-sm font-medium rounded-md ${filter === 'completed' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setFilter('completed')}
                >
                  Completed
                </button>
              </div>

              <div className="h-[calc(100vh-280px)] overflow-y-auto">
                {filteredEnquiries.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>No enquiries found</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredEnquiries.map((enquiry) => (
                      <div
                        key={enquiry.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedEnquiry?.id === enquiry.id
                            ? 'bg-gray-100 border-gray-300'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedEnquiry(enquiry)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium truncate">{enquiry.subject}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(enquiry.status)}`}>
                            {enquiry.status === 'new' ? 'New' : 
                            enquiry.status === 'in_progress' ? 'In Progress' : 'Completed'}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <User className="h-3 w-3 mr-1" />
                          <span>
                            {enquiry.first_name} {enquiry.last_name}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Mail className="h-3 w-3 mr-1" />
                          <span className="truncate">{enquiry.email}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {formatDate(enquiry.created_at)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enquiry Details */}
        <div className="lg:col-span-2">
          {selectedEnquiry ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold mb-1">{selectedEnquiry.subject}</h2>
                    <div className="text-sm text-gray-500">
                      From: {selectedEnquiry.first_name} {selectedEnquiry.last_name} ({selectedEnquiry.email})
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Received: {formatDate(selectedEnquiry.created_at)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex gap-2">
                      <Button
                        variant={selectedEnquiry.status === 'new' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateEnquiryStatus(selectedEnquiry.id, 'new')}
                        className="flex items-center"
                      >
                        <AlertCircle className="h-4 w-4 mr-1" />
                        New
                      </Button>
                      <Button
                        variant={selectedEnquiry.status === 'in_progress' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateEnquiryStatus(selectedEnquiry.id, 'in_progress')}
                        className="flex items-center"
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        In Progress
                      </Button>
                      <Button
                        variant={selectedEnquiry.status === 'completed' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateEnquiryStatus(selectedEnquiry.id, 'completed')}
                        className="flex items-center"
                      >
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Completed
                      </Button>
                    </div>
                    {!deleteConfirm ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => setDeleteConfirm(true)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    ) : (
                      <div className="flex gap-1">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={handleDeleteEnquiry}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeleteConfirm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-gray-700 mb-2">Message:</h3>
                  <p className="whitespace-pre-wrap">{selectedEnquiry.message}</p>
                </div>

                <div className="mb-4">
                  <h3 className="font-medium text-gray-700 mb-2">Notes:</h3>
                  {selectedEnquiry.notes ? (
                    <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                      {selectedEnquiry.notes}
                    </div>
                  ) : (
                    <div className="text-gray-500 italic">No notes yet.</div>
                  )}
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Add Note:</h3>
                  <div className="flex gap-2">
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Add your notes here..."
                      className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#12A5BF]"
                      rows={3}
                    />
                    <Button 
                      onClick={addNote} 
                      disabled={!note.trim()}
                      className="bg-[#12A5BF] hover:bg-[#0f8fa6] self-end"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center p-6">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No Enquiry Selected</h3>
                <p className="text-gray-500">
                  Select an enquiry from the list to view details
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};