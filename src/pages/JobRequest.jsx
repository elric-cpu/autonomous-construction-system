import React from 'react';
import { ClipboardList, Mail, Phone, User } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const JobRequest = () => {
  return (
    <>
      <SEO
        title="Request a Job | Benson Home Solutions"
        description="Submit a job request to start the agentic construction workflow for restoration, remodels, and general contracting."
      />
      <Breadcrumbs />

      <section className="bg-contractor-black text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <ClipboardList className="w-6 h-6 text-maroon" />
            <span className="uppercase tracking-widest text-sm text-gray-300">Job Request</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Start a Construction Workflow</h1>
          <p className="text-gray-300">
            Share the essentials and our digital operations team will qualify the lead, draft scope, and build a baseline estimate.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form className="space-y-6 bg-white shadow-lg rounded-lg border border-gray-100 p-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="name">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input id="name" name="name" placeholder="Jane Doe" className="pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input id="email" name="email" type="email" placeholder="jane@email.com" className="pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input id="phone" name="phone" type="tel" placeholder="(541) 321-5115" className="pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="project">
                  Project Description
                </label>
                <textarea
                  id="project"
                  name="project"
                  rows="5"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-maroon focus:outline-none focus:ring-1 focus:ring-maroon"
                  placeholder="Tell us about the scope, timeline, and priorities."
                />
              </div>
              <Button type="submit" className="bg-maroon text-white hover:bg-red-700">
                Submit Request
              </Button>
            </form>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h2 className="text-lg font-semibold text-contractor-black mb-2">What Happens Next</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Lead qualification within one business day</li>
                <li>Scope drafted from historical and inspection data</li>
                <li>Baseline estimate and subcontractor outreach</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-contractor-black mb-2">Need Immediate Help?</h3>
              <p className="text-sm text-gray-600 mb-3">
                For emergency restoration, call our team directly.
              </p>
              <Button asChild className="w-full bg-contractor-black text-white hover:bg-gray-900">
                <a href="tel:5413215115">Call (541) 321-5115</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobRequest;
