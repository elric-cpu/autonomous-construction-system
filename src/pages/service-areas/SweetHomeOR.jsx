import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SweetHomeOR = () => {
  const services = [
    {
      name: 'Water Damage Mitigation',
      description: 'Emergency water extraction and drying for Sweet Home homeowners.',
      link: '/services/water-damage-mitigation',
    },
    {
      name: 'Mold Remediation',
      description: 'Professional mold assessment and removal in Sweet Home.',
      link: '/services/mold-remediation',
    },
    {
      name: 'Bathroom Remodels',
      description: 'Complete bathroom renovations throughout Sweet Home and Linn County.',
      link: '/services/bathroom-remodels',
    },
    {
      name: 'Kitchen Remodels',
      description: 'Custom kitchen transformations for Sweet Home area homes.',
      link: '/services/kitchen-remodels',
    },
    {
      name: 'General Contracting',
      description: 'Home additions, repairs, and renovations in Sweet Home, OR.',
      link: '/services/general-contracting',
    },
  ];

  const faqs = [
    {
      question: 'Do you provide emergency water damage services in Sweet Home?',
      answer: 'Yes. We respond quickly to water damage emergencies in Sweet Home and throughout the Mid-Willamette Valley. Call us immediately when water damage occurs.',
    },
    {
      question: 'Are you licensed to work in Sweet Home and Linn County?',
      answer: 'Absolutely. Oregon CCB# 258533 covers all our work statewide. We\'re fully licensed, bonded, and insured for projects in Sweet Home and throughout Oregon.',
    },
    {
      question: 'Do you offer free estimates in Sweet Home?',
      answer: 'Yes. We provide free, no-obligation estimates for all services in Sweet Home and surrounding Mid-Valley areas.',
    },
    {
      question: 'Can you help with insurance claims for Sweet Home residents?',
      answer: 'Definitely. We have extensive experience working with insurance companies on behalf of Sweet Home homeowners. We document damage, provide detailed estimates, and coordinate with adjusters.',
    },
    {
      question: 'How far beyond Sweet Home do you travel?',
      answer: 'We serve Sweet Home, Lebanon, Albany, and surrounding Mid-Valley communities. Contact us to confirm service availability for your specific location.',
    },
    {
      question: 'What makes you different from other contractors in the Sweet Home area?',
      answer: 'We\'re licensed (CCB# 258533), experienced in both emergency restoration and planned remodels, and committed to clear communication and quality work. Professional service, local presence.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Sweet Home OR Construction & Restoration | Remodels, Water Damage - Benson Home Solutions</title>
        <meta name="description" content="Licensed contractor serving Sweet Home, Oregon. Water damage mitigation, mold remediation, kitchen & bathroom remodels. CCB# 258533. Call (541) 321-5115." />
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
              <span className="text-cream text-lg">Mid-Willamette Valley</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Construction & Restoration in Sweet Home, Oregon
            </h1>
            <p className="text-xl text-cream mb-6">
              Professional water damage mitigation, mold remediation, and home remodeling services for Sweet Home and the Mid-Valley.
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
            Trusted Contractor Serving Sweet Home, Oregon
          </h2>
          <p className="text-lg text-restoration-gray mb-6">
            Benson Home Solutions brings licensed, professional construction and restoration services to Sweet Home and the Mid-Willamette Valley. Whether you're dealing with water damage, planning a bathroom remodel, or need general contracting services, we deliver quality workmanship and reliable communication.
          </p>
          <p className="text-lg text-restoration-gray">
            Sweet Home homeowners choose us for our professional approach, transparent pricing, and commitment to doing the job right. We understand the unique needs of Mid-Valley homes and bring the expertise to handle everything from emergency situations to complete renovations.
          </p>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-12 text-center">
            Our Services in Sweet Home, Oregon
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
            Why Sweet Home Homeowners Trust Benson Home Solutions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-contractor-black mb-3">Mid-Valley Expertise</h3>
              <p className="text-restoration-gray">
                We understand the construction and restoration needs specific to the Mid-Willamette Valley. Professional service with local accessibility.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-contractor-black mb-3">Fast Response for Emergencies</h3>
              <p className="text-restoration-gray">
                Water damage requires immediate action. We prioritize emergency calls from Sweet Home residents to minimize damage and protect your property and insurance claim.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-contractor-black mb-3">Transparent Process & Communication</h3>
              <p className="text-restoration-gray">
                From estimate through completion, we keep you informed. You'll know what to expect at each stage—no surprises, just professional service.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-contractor-black mb-3">Licensed & Insured Contractor</h3>
              <p className="text-restoration-gray">
                Oregon CCB# 258533. Fully licensed, bonded, and insured. All work meets Oregon building codes and industry standards.
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
          <p className="text-center text-cream mb-8">
            In addition to Sweet Home, we serve:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <Link to="/service-areas/burns-or" className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg p-6 transition-all">
              <h3 className="font-bold text-xl mb-2">Burns, OR</h3>
              <p className="text-cream text-sm">Harney County service</p>
            </Link>
            <Link to="/service-areas/hines-or" className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg p-6 transition-all">
              <h3 className="font-bold text-xl mb-2">Hines, OR</h3>
              <p className="text-cream text-sm">Harney County service</p>
            </Link>
          </div>
          <p className="text-center text-structural-gray text-sm mt-6">
            Also serving Lebanon, Albany, and other Mid-Valley communities
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-12 text-center">
            Frequently Asked Questions - Sweet Home, OR
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
            Sweet Home, OR Construction & Restoration
          </h2>
          <p className="text-xl mb-8 text-cream">
            Contact us today for professional service and free estimates.
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

export default SweetHomeOR;