import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    news: 0,
    events: 0,
    gallery: 0,
    syllabus: 0,
    users: 0,
    enquiries: 0,
    applications: 0,
    pendingApplications: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch counts from various tables
      const fetchCount = async (table) => {
        const { count, error } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });
        
        if (error) throw error;
        return count;
      };
      
      // Get new enquiries count
      const getNewEnquiries = async () => {
        const { count, error } = await supabase
          .from('enquiries')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'new');
        
        if (error) throw error;
        return count;
      };
      
      // Get pending applications count
      const getPendingApplications = async () => {
        const { count, error } = await supabase
          .from('applications')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');
        
        if (error) throw error;
        return count;
      };
      
      // Get counts in parallel
      const [
        eventsCount, 
        syllabusCount, 
        usersCount, 
        enquiriesCount, 
        newEnquiriesCount,
        applicationsCount,
        pendingApplicationsCount
      ] = await Promise.all([
        fetchCount('events'),
        fetchCount('syllabus'),
        fetchCount('users'),
        fetchCount('enquiries'),
        getNewEnquiries(),
        fetchCount('applications'),
        getPendingApplications()
      ]);
      
      setStats({
        events: eventsCount || 0,
        syllabus: syllabusCount || 0,
        users: usersCount || 0,
        enquiries: newEnquiriesCount || 0,
        applications: applicationsCount || 0,
        pendingApplications: pendingApplicationsCount || 0,
        // These might be added later when you have these tables
        news: 0,
        gallery: 0
      });
      
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const menuItems = [
    {
      title: 'Content Management',
      items: [
        { name: 'News & Events', link: '/admin/news' },
        { name: 'Events', link: '/admin/events' },
        { name: 'Gallery', link: '/admin/gallery' },
        { name: 'Programs', link: '/admin/programs' },
        { name: 'Staff', link: '/admin/staff' },
        { name: 'Testimonials', link: '/admin/testimonials' },
        { name: 'Syllabus', link: '/admin/syllabus' },
      ],
    },
    {
      title: 'Contact & Admissions',
      items: [
        { name: 'Enquiries', link: '/admin/enquiries', badge: stats.enquiries > 0 ? stats.enquiries : null },
        { name: 'Contact Details', link: '/admin/contact-details' },
        { name: 'Applications', link: '/admin/applications', badge: stats.pendingApplications > 0 ? stats.pendingApplications : null },
      ],
    },
    {
      title: 'Website Settings',
      items: [
        { name: 'Homepage', link: '/admin/hero-carousel' },
        { name: 'Navigation', link: '/admin/navigation' },
        { name: 'Footer', link: '/admin/footer' },
      ],
    },
    {
      title: 'User Management',
      items: [
        { name: 'Admins', link: '/admin/users' },
        { name: 'Roles', link: '/admin/roles' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/navajyoti.jpg"
              alt="Nava Jyoti School"
              className="h-10 w-10 rounded"
            />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="text-gray-600 hover:text-gray-900"
          >
            Sign out
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((section) => (
              <Card key={section.title}>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <Button
                        key={item.name}
                        variant="outline"
                        className="w-full justify-between text-left"
                        onClick={() => navigate(item.link)}
                      >
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { title: 'Total Events', value: loading ? '...' : stats.events.toString() },
              { title: 'Syllabus Files', value: loading ? '...' : stats.syllabus.toString() },
              { title: 'Gallery Items', value: loading ? '...' : stats.gallery.toString() },
              { title: 'New Enquiries', value: loading ? '...' : stats.enquiries.toString() },
              { title: 'Pending Applications', value: loading ? '...' : stats.pendingApplications.toString() },
              { title: 'Active Users', value: loading ? '...' : stats.users.toString() },
            ].map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <h3 className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </h3>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};