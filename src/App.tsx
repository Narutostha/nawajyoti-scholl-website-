import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { TopHeader } from "./components/TopHeader";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { GalleryPage as PublicGalleryPage } from "./pages/GalleryPage";
import { InformationCenterPage } from "./pages/InformationCenterPage";
import { BabylonBudsPage } from "./pages/BabylonBudsPage";
import { ContactPage } from "./pages/ContactPage";
import { NewsPage as PublicNewsPage } from "./pages/NewsPage";
import { ProgramsPage as PublicProgramsPage } from "./pages/ProgramsPage";
import { CareerPage } from "./pages/CareerPage";
import { SyllabusPage } from "./pages/SyllabusPage";
import { CalendarPage } from "./pages/CalendarPage";
import { ApplyNowPage } from "./pages/ApplyNowPage";
import { EventPage } from "./pages/EventPage";
import { EventsListingPage } from "./pages/EventsListingPage";
import { LoginPage } from "./pages/admin/LoginPage";
import { RegisterPage } from "./pages/admin/RegisterPage";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { NewsPage as AdminNewsPage } from "./pages/admin/NewsPage";
import { HeroCarouselPage } from "./pages/admin/HeroCarouselPage";
import { ProgramsPage as AdminProgramsPage } from "./pages/admin/ProgramsPage";
import { GalleryPage as AdminGalleryPage } from "./pages/admin/GalleryPage";
import { StaffPage } from "./pages/admin/StaffPage";
import { SettingsPage } from "./pages/admin/SettingsPage";
import { EventsPage } from "./pages/admin/EventsPage";
import { TestimonialsPage } from "./pages/admin/TestimonialsPage";
import { SyllabusPage as AdminSyllabusPage } from "./pages/admin/SyllabusPage";
import { EnquiriesPage } from "./pages/admin/EnquiriesPage";
import { ContactDetailsPage } from "./pages/admin/ContactDetailsPage";
import { ApplicationsPage } from "./pages/admin/ApplicationPage";
import { ScrollToTop } from "./components/ScrollToTop";
import { AdminProtectedRoute } from "./components/AdminProtectedRoute";

// Layout component for public routes
const PublicLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopHeader data-topheader="true" />
        <Header data-mainheader="true" />
      </div>
      <main className="flex-grow pt-[120px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const App = (): JSX.Element => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/register" element={<RegisterPage />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <AdminProtectedRoute>
              <DashboardPage />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/admin/news" 
          element={
            <AdminProtectedRoute>
              <AdminNewsPage />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/admin/hero-carousel" 
          element={
            <AdminProtectedRoute>
              <HeroCarouselPage />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/admin/programs" 
          element={
            <AdminProtectedRoute>
              <AdminProgramsPage />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/admin/gallery" 
          element={
            <AdminProtectedRoute>
              <AdminGalleryPage />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/admin/staff" 
          element={
            <AdminProtectedRoute>
              <StaffPage />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/admin/settings" 
          element={
            <AdminProtectedRoute>
              <SettingsPage />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/admin/events" 
          element={
            <AdminProtectedRoute>
              <EventsPage />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/admin/testimonials" 
          element={
            <AdminProtectedRoute>
              <TestimonialsPage />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/admin/syllabus" 
          element={
            <AdminProtectedRoute>
              <AdminSyllabusPage />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/admin/enquiries" 
          element={
            <AdminProtectedRoute>
              <EnquiriesPage />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/admin/contact-details" 
          element={
            <AdminProtectedRoute>
              <ContactDetailsPage />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/admin/applications" 
          element={
            <AdminProtectedRoute>
              <ApplicationsPage />
            </AdminProtectedRoute>
          } 
        />
        {/* Redirect /admin to /admin/login */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        
        {/* Public Routes with Layout */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
        <Route path="/gallery" element={<PublicLayout><PublicGalleryPage /></PublicLayout>} />
        <Route path="/information-center" element={<PublicLayout><InformationCenterPage /></PublicLayout>} />
        <Route path="/babylon-buds" element={<PublicLayout><BabylonBudsPage /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
        <Route path="/news" element={<PublicLayout><PublicNewsPage /></PublicLayout>} />
        <Route path="/syllabus" element={<PublicLayout><SyllabusPage /></PublicLayout>} />
        <Route path="/calendar" element={<PublicLayout><CalendarPage /></PublicLayout>} />
        <Route path="/programs" element={<PublicLayout><PublicProgramsPage /></PublicLayout>} />
        <Route path="/career" element={<PublicLayout><CareerPage /></PublicLayout>} />
        <Route path="/apply" element={<PublicLayout><ApplyNowPage /></PublicLayout>} />
        <Route path="/events" element={<PublicLayout><EventsListingPage /></PublicLayout>} />
        <Route path="/events/:eventId" element={<PublicLayout><EventPage /></PublicLayout>} />
        
        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;