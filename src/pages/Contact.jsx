import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const [isInsuranceClaim, setIsInsuranceClaim] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    service: '',
    message: '',
    claimNumber: '',
    policyNumber: '',
    adjusterName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to a backend
    console.log('Form submitted:', { ...formData, isInsuranceClaim });
    
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting Benson Home Solutions. We will respond shortly.",
    });
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      city: '',
      service: '',
      message: '',
      claimNumber: '',
      policyNumber: '',
      adjusterName: '',
    });
    setIsInsuranceClaim(false);
  };

  return (
    <>
      <Helmet>
        <title>Contact Benson Home Solutions | Oregon Construction & Restoration</title>
        <meta name="description" content="Contact Benson Home Solutions for free estimates and emergency service. Serving Burns, Hines, Sweet Home & Mid-Valley. Call (541) 321-5115." />
      </Helmet>

      <section className="bg-contractor-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-cream">
              Ready to start your project or need emergency assistance? We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-contractor-black mb-8">Get in Touch</h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="bg-cream p-3 rounded-full">
                    <Phone className="w-6 h-6 text-maroon" />
                  </div>
                  <div>
                    <p className="font-bold text-contractor-black mb-1">Phone</p>
                    <p className="text-restoration-gray mb-1">
                      <a href="tel:5413215115" className="hover:text-maroon transition-colors">(541) 321-5115</a> (Primary)
                    </p>
                    <p className="text-restoration-gray">
                      <a href="tel:5414130480" className="hover:text-maroon transition-colors">(541) 413-0480</a> (Secondary)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-cream p-3 rounded-full">
                    <Mail className="w-6 h-6 text-maroon" />
                  </div>
                  <div>
                    <p className="font-bold text-contractor-black mb-1">Email</p>
                    <a href="mailto:Office@bensonhomesolutions.com" className="text-restoration-gray hover:text-maroon transition-colors">
                      Office@bensonhomesolutions.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-cream p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-maroon" />
                  </div>
                  <div>
                    <p className="font-bold text-contractor-black mb-1">Service Areas</p>
                    <p className="text-restoration-gray">
                      Harney County: Burns, Hines<br />
                      Mid-Willamette Valley: Sweet Home, Lebanon, Albany
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-cream p-3 rounded-full">
                    <Clock className="w-6 h-6 text-maroon" />
                  </div>
                  <div>
                    <p className="font-bold text-contractor-black mb-1">Hours</p>
                    <p className="text-restoration-gray">
                      Mon-Fri: 8:00 AM - 5:00 PM<br />
                      <span className="font-semibold text-maroon">24/7 Emergency Water Mitigation</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-contractor-black mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <input
                      id="phone"
                      name="phone"
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon"
                      placeholder="(541) 555-0123"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <input
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon"
                      placeholder="e.g. Burns, Sweet Home"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Service Needed</Label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon"
                  >
                    <option value="">Select a service...</option>
                    <option value="Water Mitigation">Water Damage Mitigation</option>
                    <option value="Mold Remediation">Mold Remediation</option>
                    <option value="Bathroom Remodel">Bathroom Remodel</option>
                    <option value="Kitchen Remodel">Kitchen Remodel</option>
                    <option value="General Contracting">General Contracting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2 py-2">
                  <Checkbox 
                    id="insurance" 
                    checked={isInsuranceClaim}
                    onCheckedChange={setIsInsuranceClaim}
                  />
                  <Label htmlFor="insurance" className="font-medium cursor-pointer">
                    This is an insurance claim
                  </Label>
                </div>

                {isInsuranceClaim && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-6 p-4 bg-gray-50 rounded-md border border-gray-200"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="claimNumber">Claim Number</Label>
                        <input
                          id="claimNumber"
                          name="claimNumber"
                          value={formData.claimNumber}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="policyNumber">Policy Number</Label>
                        <input
                          id="policyNumber"
                          name="policyNumber"
                          value={formData.policyNumber}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adjusterName">Adjuster Name (if known)</Label>
                      <input
                        id="adjusterName"
                        name="adjusterName"
                        value={formData.adjusterName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon"
                    placeholder="Tell us about your project or emergency..."
                  />
                </div>

                <Button type="submit" className="w-full bg-maroon hover:bg-opacity-90 text-white text-lg py-6">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/*
        Digital GC Request CTA
        This section promotes the new autonomous contracting system and links to the job request form.  It
        follows the site's color palette (cream background, maroon button) and appears below the contact
        form.  When clicked, users are taken to the job request page defined in JobRequest.jsx.
      */}
      <section className="bg-cream py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-bold text-contractor-black">Start Your Project Online</h2>
          <p className="text-restoration-gray">
            Our autonomous general contracting system is coming soon. Submit a detailed job request and let
            our agents handle the rest.
          </p>
          <Link to="/request-job">
            <Button className="bg-maroon hover:bg-opacity-90 text-white px-8 py-4">
              Request a Job
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Contact;