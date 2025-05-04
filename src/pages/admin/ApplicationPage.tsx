import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { supabase } from '../../lib/supabase';
import { AdminLayout } from '../../components/AdminLayout';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  FileText, 
  School, 
  MapPin, 
  Users, 
  ClipboardCheck, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Search 
} from 'lucide-react';

export const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [note, setNote] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setApplications(applications.map(app => 
        app.id === id ? { ...app, status } : app
      ));
      
      if (selectedApplication && selectedApplication.id === id) {
        setSelectedApplication({ ...selectedApplication, status });
      }
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const addNote = async () => {
    if (!note.trim() || !selectedApplication) return;

    try {
      const updatedNotes = selectedApplication.notes 
        ? `${selectedApplication.notes}\n\n${new Date().toLocaleString()}: ${note}`
        : `${new Date().toLocaleString()}: ${note}`;

      const { error } = await supabase
        .from('applications')
        .update({ notes: updatedNotes })
        .eq('id', selectedApplication.id);

      if (error) throw error;

      // Update local state
      setApplications(applications.map(app => 
        app.id === selectedApplication.id ? { ...app, notes: updatedNotes } : app
      ));
      
      setSelectedApplication({ ...selectedApplication, notes: updatedNotes });
      setNote('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleDeleteApplication = async () => {
    if (!selectedApplication) return;

    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', selectedApplication.id);

      if (error) throw error;

      // Update local state
      setApplications(applications.filter(app => app.id !== selectedApplication.id));
      setSelectedApplication(null);
      setDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const filterApplications = () => {
    let filtered = [...applications];
    
    // Filter by status
    if (filter !== 'all') {
      filtered = filtered.filter(app => app.status === filter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(app => 
        app.first_name.toLowerCase().includes(term) ||
        app.last_name.toLowerCase().includes(term) ||
        app.email.toLowerCase().includes(term) ||
        app.grade.toLowerCase().includes(term) ||
        (app.previous_school && app.previous_school.toLowerCase().includes(term))
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
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'reviewing': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get display text for grade
  const getGradeDisplay = (grade) => {
    if (grade === 'nursery') return 'Nursery';
    if (grade === 'lkg') return 'LKG';
    if (grade === 'ukg') return 'UKG';
    if (grade.startsWith('grade')) {
      const gradeNum = grade.replace('grade', '');
      return `Grade ${gradeNum}`;
    }
    return grade;
  };

  if (loading) {
    return (
      <AdminLayout title="Student Applications">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#12A5BF]"></div>
        </div>
      </AdminLayout>
    );
  }

  const filteredApplications = filterApplications();

  return (
    <AdminLayout title="Student Applications">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application List */}
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search applications..."
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
                  className={`flex-1 py-2 text-sm font-medium rounded-md ${filter === 'pending' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setFilter('pending')}
                >
                  Pending
                </button>
                <button
                  className={`flex-1 py-2 text-sm font-medium rounded-md ${filter === 'reviewing' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setFilter('reviewing')}
                >
                  Reviewing
                </button>
                <button
                  className={`flex-1 py-2 text-sm font-medium rounded-md ${filter === 'approved' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setFilter('approved')}
                >
                  Approved
                </button>
              </div>

              <div className="h-[calc(100vh-280px)] overflow-y-auto">
                {filteredApplications.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>No applications found</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredApplications.map((application) => (
                      <div
                        key={application.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedApplication?.id === application.id
                            ? 'bg-gray-100 border-gray-300'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedApplication(application)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">
                            {application.first_name} {application.last_name}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(application.status)}`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <School className="h-3 w-3 mr-1" />
                          <span>{getGradeDisplay(application.grade)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{formatDate(application.created_at).split(' ')[0]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application Details */}
        <div className="lg:col-span-2">
          {selectedApplication ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold mb-1">
                      {selectedApplication.first_name} {selectedApplication.last_name}
                    </h2>
                    <div className="text-sm text-gray-500">
                      Application for {getGradeDisplay(selectedApplication.grade)}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Submitted: {formatDate(selectedApplication.created_at)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex gap-2">
                      <Button
                        variant={selectedApplication.status === 'pending' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateApplicationStatus(selectedApplication.id, 'pending')}
                        className="flex items-center"
                      >
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Pending
                      </Button>
                      <Button
                        variant={selectedApplication.status === 'reviewing' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateApplicationStatus(selectedApplication.id, 'reviewing')}
                        className="flex items-center"
                      >
                        <ClipboardCheck className="h-4 w-4 mr-1" />
                        Reviewing
                      </Button>
                      <Button
                        variant={selectedApplication.status === 'approved' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateApplicationStatus(selectedApplication.id, 'approved')}
                        className="flex items-center"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approved
                      </Button>
                      <Button
                        variant={selectedApplication.status === 'rejected' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateApplicationStatus(selectedApplication.id, 'rejected')}
                        className="flex items-center"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Rejected
                      </Button>
                    </div>
                    {!deleteConfirm ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => setDeleteConfirm(true)}
                      >
                        Delete
                      </Button>
                    ) : (
                      <div className="flex gap-1">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={handleDeleteApplication}
                        >
                          Confirm
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
                
                {/* Student Information */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-gray-700 mb-3">Student Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <User className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Name:</span>
                        <span className="text-sm text-gray-600 ml-2">
                          {selectedApplication.first_name} {selectedApplication.last_name}
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        <Mail className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Email:</span>
                        <span className="text-sm text-gray-600 ml-2">
                          {selectedApplication.email}
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        <Phone className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Phone:</span>
                        <span className="text-sm text-gray-600 ml-2">
                          {selectedApplication.phone}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <School className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Grade:</span>
                        <span className="text-sm text-gray-600 ml-2">
                          {getGradeDisplay(selectedApplication.grade)}
                        </span>
                      </div>
                      {selectedApplication.previous_school && (
                        <div className="flex items-center mb-2">
                          <FileText className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm font-medium text-gray-700">Previous School:</span>
                          <span className="text-sm text-gray-600 ml-2">
                            {selectedApplication.previous_school}
                          </span>
                        </div>
                      )}
                      <div className="flex items-start mb-2">
                        <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                        <span className="text-sm font-medium text-gray-700">Address:</span>
                        <span className="text-sm text-gray-600 ml-2">
                          {selectedApplication.address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Parent Information */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-gray-700 mb-3">Parent/Guardian Information</h3>
                  <div>
                    <div className="flex items-center mb-2">
                      <Users className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Name:</span>
                      <span className="text-sm text-gray-600 ml-2">
                        {selectedApplication.parent_name}
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      <Phone className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Phone:</span>
                      <span className="text-sm text-gray-600 ml-2">
                        {selectedApplication.parent_phone}
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      <Mail className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Email:</span>
                      <span className="text-sm text-gray-600 ml-2">
                        {selectedApplication.parent_email}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Notes Section */}
                <div className="mb-4">
                  <h3 className="font-medium text-gray-700 mb-2">Notes:</h3>
                  {selectedApplication.notes ? (
                    <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                      {selectedApplication.notes}
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
                <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No Application Selected</h3>
                <p className="text-gray-500">
                  Select an application from the list to view details
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};