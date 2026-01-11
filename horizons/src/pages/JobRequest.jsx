import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';

/*
 * JobRequest page
 *
 * This page defines a customer-facing form for requesting new construction jobs.
 * It collects detailed information about the customer, property type and
 * service categories so the agentic GC system can route the request to the
 * appropriate agents.  The design follows the existing Benson Home Solutions
 * theme with maroon accents and clean spacing.  On submission the form
 * currently logs the data and shows a toast notification; integration with
 * backend systems can be added later.
 */

const serviceCategories = [
  'Framing',
  'Finish Carpentry',
  'Plumbing',
  'HVAC',
  'Electrical',
  'Roofing',
  'Painting',
  'Flooring',
  'Drywall',
  'Landscaping',
  'Other',
];

const JobRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    propertyType: '',
    categories: [],
    location: '',
    timeline: '',
    budget: '',
    description: '',
    preferredSub: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (category) => {
    setFormData((prev) => {
      const isSelected = prev.categories.includes(category);
      return {
        ...prev,
        categories: isSelected
          ? prev.categories.filter((c) => c !== category)
          : [...prev.categories, category],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit to your backend or trigger the agentic workflow
    console.log('Job request submitted:', formData);
    toast({
      title: 'Request Submitted',
      description:
        'Thank you for submitting your job request. Our digital contracting system will reach out shortly.',
    });
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      propertyType: '',
      categories: [],
      location: '',
      timeline: '',
      budget: '',
      description: '',
      preferredSub: '',
    });
  };

  return (
    <>
      <Helmet>
        <title>Request a Job | Benson Home Solutions</title>
        <meta
          name="description"
          content="Start your construction project with Benson Home Solutions. Provide job details and we'll match you with the right subcontractors."
        />
      </Helmet>

      <section className="bg-contractor-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            Request a Construction Job
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl text-cream max-w-3xl mx-auto"
          >
            Share your project details and our autonomous agentic system will handle the rest—matching your
            project with the right team and subcontractors.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-contractor-black mb-6">Job Request Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(541) 555-0123"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Project Location (City & State)</Label>
                  <Input
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Burns, OR"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    required
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon"
                  >
                    <option value="">Select property type...</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline">Desired Start Date</Label>
                  <Input
                    id="timeline"
                    name="timeline"
                    type="date"
                    value={formData.timeline}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Service Categories</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {serviceCategories.map((cat) => (
                    <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        id={`cat-${cat}`}
                        checked={formData.categories.includes(cat)}
                        onCheckedChange={() => handleCategoryToggle(cat)}
                      />
                      <span className="text-gray-700 text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="budget">Estimated Budget (USD)</Label>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="e.g. 50000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredSub">Preferred Subcontractor (optional)</Label>
                  <Input
                    id="preferredSub"
                    name="preferredSub"
                    value={formData.preferredSub}
                    onChange={handleChange}
                    placeholder="Company name or contact"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Project Description / Scope</Label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon"
                  placeholder="Provide a brief description of your project, including any details that will help us scope and price it accurately."
                />
              </div>
              <div className="pt-4">
                <Button type="submit" className="w-full bg-maroon hover:bg-opacity-90 text-white text-lg py-6">
                  Submit Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobRequest;