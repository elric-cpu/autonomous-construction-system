import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HinesOR = () => {
  const services = [
    {
      name: 'Water Damage Mitigation',
      description: '24/7 emergency water extraction and drying in Hines.',
      link: '/services/water-damage-mitigation',
    },
    {
      name: 'Mold Remediation',
      description: 'Safe, professional mold removal for Hines residents.',
      link: '/services/mold-remediation',
    },
    {
      name: 'Bathroom Remodels',
      description: 'Custom bathroom renovations in Hines and Harney County.',
      link: '/services/bathroom-remodels',
    },
    {
      name: 'Kitchen Remodels',
      description: 'Complete kitchen transformations for Hines homes.',
      link: '/services/kitchen-remodels',
    },
    {
      name: 'General Contracting',
      description: 'Additions, repairs, and remodeling in Hines, Oregon.',
      link: '/services/general-contracting',
    },
  ];

  const faqs = [
    {
      question: 'How quickly can you respond to emergencies in Hines?',
      answer: 'We serve Hines with the same priority as Burns—typically within a few hours for emergency water damage situations. We\'re local to Harney County and committed to fast response.',
    },
    {
      question: 'Do you provide free estimates in Hines?',
      answer: 'Yes. We offer free, no-obligation estimates for all services throughout Hines and the surrounding area.',
    },
    {
      question: 'Are you licensed to work in Hines, Oregon?',
      answer: 'Absolutely. Oregon CCB# 258533 covers all our work statewide, including Hines and Harney County. We\'re fully licensed, bonded, and insured.',
    },
    {
      question: 'Can you help coordinate insurance claims for Hines homeowners?',
      answer: 'Yes. We work directly with insurance companies, provide detailed documentation, and help streamline the claims process for water damage, mold remediation, and restoration projects.',
    },
    {
      question: 'What sets you apart from other contractors serving Hines?',
      answer: 'We\'re local, professional, and dedicated to quality work. Licensed contractor, clear communication, and we treat every home with care and respect.',
    },
    {
      question: 'Do you serve rural areas around Hines?',
      answer: 'Yes. We serve Hines, Burns, and the surrounding rural Harney County areas. Contact us to confirm service availability for your specific location.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Hines OR Construction & Restoration | Water Damage, Remodels - Benson Home Solutions</title>
        <meta name="description" content="Professional contractor serving Hines, Oregon. Water damage mitigation, mold remediation, kitchen & bathroom remodels. Licensed CCB# 258533. Call (541) 321-5115." />
      </Helmet>

      <section className="bg-contractor-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-maroon" />
              <span className="text-cream text-lg">Harney County</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Construction & Restoration in Hines, Oregon
            </h1>
            <p className="text-xl text-cream mb-6">
              Licensed contractor providing water damage mitigation, mold remediation, and home remodeling services for Hines and Harney County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:5413215115">
                <Button size="lg" className="bg-maroon hover:bg-opacity-90 text-white w-full sm:w-auto">
                  <Phone className="w-5 h-5 mr-2" />
                  Call: (541) 321-5115
                </Button>
              </a>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-contractor-black w-full sm:w-auto">
                  Request Estimate
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-6">
            Professional Services for Hines, Oregon
          </h2>
          <p className="text-lg text-restoration-gray mb-6">
            Benson Home Solutions serves Hines with the same professional construction and restoration services we provide throughout Harney County. From emergency water damage response to planned home remodels, our licensed team delivers quality workmanship and reliable service.
          </p>
          <p className="text-lg text-restoration-gray">
            Hines homeowners appreciate our straightforward approach—clear communication, transparent pricing, and respect for your property. Whether you need emergency mitigation or are planning a kitchen renovation, we bring professionalism to every project.
          </p>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-12 text-center">
            Services in Hines, Oregon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={service.link}>
                  <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all h-full border-2 border-transparent hover:border-maroon">
                    <h3 className="text-xl font-bold text-contractor-black mb-3">
                      {service.name}
                    </h3>
                    <p className="text-restoration-gray mb-4">
                      {service.description}
                    </p>
                    <span className="text-maroon font-semibold flex items-center gap-2">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-6">
            Why Choose Benson Home Solutions in Hines
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-contractor-black mb-3">Local Harney County Contractor</h3>
              <p className="text-restoration-gray">
                We understand Eastern Oregon construction challenges and bring local knowledge combined with professional standards to every project in Hines.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-contractor-black mb-3">Emergency Response Available</h3>
              <p className="text-restoration-gray">
                Water damage requires immediate action. We offer 24/7 emergency mitigation services for Hines residents to minimize damage and protect your property.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-contractor-black mb-3">Quality Workmanship & Clear Communication</h3>
              <p className="text-restoration-gray">
                From the initial estimate through project completion, we keep you informed and deliver work that meets professional standards.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-contractor-black mb-3">Fully Licensed & Insured</h3>
              <p className="text-restoration-gray">
                CCB# 258533. All work is performed by licensed, insured professionals who follow Oregon building codes and industry best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-mitigation-graphite text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Additional Service Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <Link to="/service-areas/burns-or" className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg p-6 transition-all">
              <h3 className="font-bold text-xl mb-2">Burns, OR</h3>
            </Link>
            <Link to="/service-areas/sweet-home-or" className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg p-6 transition-all">
              <h3 className="font-bold text-xl mb-2">Sweet Home, OR</h3>
            </Link>
          </div>
          <p className="text-center text-structural-gray text-sm mt-6">
            Also serving Lebanon, Albany, and Mid-Valley Oregon
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-12 text-center">
            Frequently Asked Questions - Hines, OR
          </h2>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-structural-gray pb-6"
              >
                <h3 className="text-xl font-bold text-contractor-black mb-3">
                  {faq.question}
                </h3>
                <p className="text-restoration-gray">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-maroon text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Hines, OR Construction & Restoration Services
          </h2>
          <p className="text-xl mb-8 text-cream">
            Contact us for fast, professional service. Free estimates available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5413215115">
              <Button size="lg" className="bg-white text-maroon hover:bg-cream w-full sm:w-auto text-lg px-8 py-6">
                <Phone className="w-5 h-5 mr-2" />
                Call: (541) 321-5115
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-maroon w-full sm:w-auto text-lg px-8 py-6">
                Request Estimate
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HinesOR;