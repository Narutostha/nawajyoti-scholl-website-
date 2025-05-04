import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
        {/* Contact Management Routes */}
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
        {/* Application Management Route */}
        <Route 
          path="/admin/applications" 
          element={
            <AdminProtectedRoute>
              <ApplicationsPage />
            </AdminProtectedRoute>
          } 
        />
        
        {/* Public Routes */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen flex flex-col">
              <div className="fixed top-0 left-0 right-0 z-50">
                <TopHeader data-topheader="true" />
                <Header data-mainheader="true" />
              </div>
              <main className="flex-grow pt-[120px]">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/gallery" element={<PublicGalleryPage />} />
                  <Route path="/information-center" element={<InformationCenterPage />} />
                  <Route path="/babylon-buds" element={<BabylonBudsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/news" element={<PublicNewsPage />} />
                  <Route path="/syllabus" element={<SyllabusPage />} />
                  <Route path="/calendar" element={<CalendarPage />} />
                  <Route path="/programs" element={<PublicProgramsPage />} />
                  <Route path="/career" element={<CareerPage />} />
                  <Route path="/apply" element={<ApplyNowPage />} />
                  <Route path="/events" element={<EventsListingPage />} />
                  <Route path="/events/:eventId" element={<EventPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;