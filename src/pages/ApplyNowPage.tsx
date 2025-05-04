import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Check, AlertCircle } from "lucide-react";
import { supabase } from "../lib/supabase";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  grade: z.string().min(1, "Please select a grade"),
  previousSchool: z.string().optional(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  parentName: z.string().min(2, "Parent name must be at least 2 characters"),
  parentPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  parentEmail: z.string().email("Invalid email address"),
});

export const ApplyNowPage = (): JSX.Element => {
  const [submitStatus, setSubmitStatus] = useState({
    show: false,
    success: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // Insert data into Supabase
      const { error } = await supabase.from("applications").insert([
        {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          grade: data.grade,
          previous_school: data.previousSchool || null,
          address: data.address,
          parent_name: data.parentName,
          parent_phone: data.parentPhone,
          parent_email: data.parentEmail,
          status: "pending",
        },
      ]);

      if (error) throw error;

      // Show success message
      setSubmitStatus({
        show: true,
        success: true,
        message:
          "Your application has been submitted successfully! We will contact you soon.",
      });

      // Reset form
      reset();

      // Hide message after 8 seconds
      setTimeout(() => {
        setSubmitStatus({ show: false, success: false, message: "" });
      }, 8000);
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitStatus({
        show: true,
        success: false,
        message:
          "There was an error submitting your application. Please try again later.",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Apply for Admission
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Take the first step towards quality education. Fill out the form below to begin your application process.
        </p>
      </div>

      {/* Application Form */}
      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-6">
          {submitStatus.show && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-start ${
                submitStatus.success
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {submitStatus.success ? (
                <Check className="w-5 h-5 mr-3 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
              )}
              <p>{submitStatus.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Student Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    {...register("firstName")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12A5BF] focus:border-transparent"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    {...register("lastName")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12A5BF] focus:border-transparent"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12A5BF] focus:border-transparent"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    {...register("phone")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12A5BF] focus:border-transparent"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Academic Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Applying for Grade *
                  </label>
                  <select
                    {...register("grade")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12A5BF] focus:border-transparent"
                  >
                    <option value="">Select Grade</option>
                    <option value="nursery">Nursery</option>
                    <option value="lkg">LKG</option>
                    <option value="ukg">UKG</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((grade) => (
                      <option key={grade} value={`grade${grade}`}>
                        Grade {grade}
                      </option>
                    ))}
                  </select>
                  {errors.grade && (
                    <p className="text-red-500 text-sm mt-1">{errors.grade.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Previous School (if any)
                  </label>
                  <input
                    type="text"
                    {...register("previousSchool")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12A5BF] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <input
                type="text"
                {...register("address")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12A5BF] focus:border-transparent"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            {/* Parent/Guardian Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Parent/Guardian Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    {...register("parentName")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12A5BF] focus:border-transparent"
                  />
                  {errors.parentName && (
                    <p className="text-red-500 text-sm mt-1">{errors.parentName.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Parent/Guardian Phone *
                    </label>
                    <input
                      type="tel"
                      {...register("parentPhone")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12A5BF] focus:border-transparent"
                    />
                    {errors.parentPhone && (
                      <p className="text-red-500 text-sm mt-1">{errors.parentPhone.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Parent/Guardian Email *
                    </label>
                    <input
                      type="email"
                      {...register("parentEmail")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12A5BF] focus:border-transparent"
                    />
                    {errors.parentEmail && (
                      <p className="text-red-500 text-sm mt-1">{errors.parentEmail.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#12A5BF] hover:bg-[#0f8fa6]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <div className="max-w-3xl mx-auto mt-12">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                After submitting your application:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>You will receive a confirmation email with your application number</li>
                <li>Our admissions team will review your application</li>
                <li>We will contact you to schedule an entrance test and interview</li>
                <li>Final admission decision will be communicated via email</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};