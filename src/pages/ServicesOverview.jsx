import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ServicesOverview = () => {
  const services = [
    {
      title: 'Water Damage Mitigation & Dry-Out',
      description: 'Immediate emergency response to extract standing water, dry out structures, and prevent secondary damage. We use professional-grade equipment and work directly with insurance companies to document and restore your property.',
      icon: '💧',
      link: '/services/water-damage-mitigation',
      benefits: ['24/7 Emergency Response', 'Insurance Coordination', 'Professional Equipment', 'Moisture Monitoring'],
    },
    {
      title: 'Mold Remediation',
      description: 'Comprehensive mold assessment, containment, removal, and prevention following industry-standard protocols. We identify the source, eliminate the growth, and implement solutions to prevent recurrence.',
      icon: '🛡️',
      link: '/services/mold-remediation',
      benefits: ['Air Quality Testing', 'Safe Containment', 'Source Identification', 'Prevention Plans'],
    },
    {
      title: 'Bathroom Remodels',
      description: 'Complete bathroom renovations tailored to your style and needs—from accessible modifications to luxury upgrades. We handle everything: fixtures, tile, vanities, lighting, and ventilation.',
      icon: '🚿',
      link: '/services/bathroom-remodels',
      benefits: ['Custom Design', 'ADA Accessible Options', 'Quality Materials', 'Efficient Timeline'],
    },
    {
      title: 'Kitchen Remodels',
      description: 'Transform your kitchen into a functional, beautiful space. Cabinet installation, countertop upgrades, appliance coordination, and layout optimization to match how you cook and live.',
      icon: '🏠',
      link: '/services/kitchen-remodels',
      benefits: ['Layout Planning', 'Custom Cabinetry', 'Modern Appliances', 'Quality Finishes'],
    },
    {
      title: 'General Contracting',
      description: 'Comprehensive construction services including home additions, structural repairs, aging-in-place modifications, window/door installation, and insurance restoration work. Your one-stop solution for quality construction.',
      icon: '🔨',
      link: '/services/general-contracting',
      benefits: ['Licensed & Insured', 'Project Management', 'Quality Craftsmanship', 'Clear Communication'],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Our Services | Benson Home Solutions - Oregon Construction & Restoration</title>
        <meta name="description" content="Complete construction and restoration services: water damage mitigation, mold remediation, bathroom & kitchen remodels, general contracting. Licensed Oregon contractor CCB# 258533." />
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
              Professional Construction & Restoration Services
            </h1>
            <p className="text-xl text-cream">
              From emergency water mitigation to complete home renovations, Benson Home Solutions delivers quality workmanship and reliable service across Oregon.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="text-6xl mb-6">{service.icon}</div>
                  <h2 className="text-3xl font-bold text-contractor-black mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-restoration-gray mb-6">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {service.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-maroon rounded-full" />
                        <span className="text-sm text-contractor-black">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={service.link}>
                    <Button className="bg-maroon hover:bg-opacity-90 text-white">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="bg-cream rounded-lg p-8 shadow-lg">
                    <img className="w-full h-64 object-cover rounded" alt={`Professional ${service.title.toLowerCase()} service in Oregon`} src="https://images.unsplash.com/photo-1659648419581-2d65722c2605" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-contractor-black mb-6">
            Not Sure What You Need?
          </h2>
          <p className="text-xl text-restoration-gray mb-8">
            Our experienced team can assess your situation and recommend the right solution. Contact us for a free consultation and estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5413215115">
              <Button size="lg" className="bg-maroon hover:bg-opacity-90 text-white w-full sm:w-auto">
                <Phone className="w-5 h-5 mr-2" />
                Call: (541) 321-5115
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-2 border-maroon text-maroon hover:bg-maroon hover:text-white w-full sm:w-auto">
                Request Estimate
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-restoration-gray mt-6">
            Licensed, Bonded & Insured • CCB# 258533 • Serving Harney County & Mid-Valley Oregon
          </p>
        </div>
      </section>
    </>
  );
};

export default ServicesOverview;