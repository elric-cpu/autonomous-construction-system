import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BurnsOR = () => {
  const services = [
    {
      name: 'Water Damage Mitigation',
      description: 'Emergency water extraction and drying services available 24/7 in Burns.',
      link: '/services/water-damage-mitigation',
    },
    {
      name: 'Mold Remediation',
      description: 'Professional mold assessment and removal for Burns homeowners.',
      link: '/services/mold-remediation',
    },
    {
      name: 'Bathroom Remodels',
      description: 'Complete bathroom renovations throughout Burns and Harney County.',
      link: '/services/bathroom-remodels',
    },
    {
      name: 'Kitchen Remodels',
      description: 'Custom kitchen transformations for Burns area homes.',
      link: '/services/kitchen-remodels',
    },
    {
      name: 'General Contracting',
      description: 'Home additions, repairs, and renovations in Burns, Oregon.',
      link: '/services/general-contracting',
    },
  ];

  const faqs = [
    {
      question: 'How quickly can you respond to water damage emergencies in Burns?',
      answer: 'We prioritize emergency water damage calls in Burns and Harney County. In most cases, we can be on-site within a few hours during business hours, and we offer 24/7 emergency response for critical situations.',
    },
    {
      question: 'Do you serve areas outside of Burns proper?',
      answer: 'Yes. We serve all of Harney County including Burns, Hines, and surrounding rural areas. If you\'re unsure whether we cover your location, give us a call—we\'re happy to help.',
    },
    {
      question: 'Are you licensed to work in Harney County?',
      answer: 'Absolutely. We hold Oregon CCB# 258533 and are fully licensed, bonded, and insured to work throughout the state, including Harney County.',
    },
    {
      question: 'Do you provide free estimates for Burns homeowners?',
      answer: 'Yes. We offer free, no-obligation estimates for all services in Burns and the surrounding area. Contact us to schedule an assessment.',
    },
    {
      question: 'Can you help with insurance claims for Burns residents?',
      answer: 'Definitely. We work directly with insurance companies, document damage thoroughly, and provide detailed estimates to support your claim process.',
    },
    {
      question: 'What makes Benson Home Solutions different from other contractors in Burns?',
      answer: 'We\'re local, licensed (CCB# 258533), and committed to quality work and clear communication. We treat every project—whether emergency mitigation or a planned remodel—with professionalism and care.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Burns OR Construction & Restoration | Water Damage, Remodels - Benson Home Solutions</title>
        <meta name="description" content="Licensed contractor serving Burns, Oregon. Water damage mitigation, mold remediation, bathroom & kitchen remodels. Emergency service available. CCB# 258533. Call (541) 321-5115." />
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
              Construction & Restoration in Burns, Oregon
            </h1>
            <p className="text-xl text-cream mb-6">
              Professional water damage mitigation, mold remediation, and home remodeling services for Burns and Harney County residents.
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
            Professional Contractor Serving Burns, Oregon
          </h2>
          <p className="text-lg text-restoration-gray mb-6">
            Benson Home Solutions brings licensed, professional construction and restoration services to Burns and Harney County. Whether you're dealing with an emergency water damage situation or planning a kitchen remodel, our team responds quickly and delivers quality workmanship.
          </p>
          <p className="text-lg text-restoration-gray mb-6">
            Burns homeowners trust us for our straightforward communication, attention to detail, and commitment to doing the job right. We understand the unique challenges of working in Eastern Oregon and bring the expertise needed to handle everything from emergency mitigation to complete home renovations.
          </p>
          <div className="bg-cream rounded-lg p-6 mb-6">
            <div className="flex items-start gap-4">
              <Clock className="w-8 h-8 text-maroon flex-shrink-0" />
              <div>
                <p className="font-bold text-contractor-black mb-2">Emergency Service Available</p>
                <p className="text-restoration-gray">
                  Water damage doesn't wait for business hours. We offer 24/7 emergency response for water damage mitigation in Burns and Harney County.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-12 text-center">
            Our Services in Burns, Oregon
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
            Why Burns Homeowners Choose Benson Home Solutions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-contractor-black mb-3">Local Knowledge, Professional Standards</h3>
              <p className="text-restoration-gray">
                We understand the climate and construction challenges specific to Eastern Oregon. Our team brings professional expertise while maintaining the personal service you'd expect from a local company.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-contractor-black mb-3">Fast Emergency Response</h3>
              <p className="text-restoration-gray">
                When water damage strikes your Burns home, every minute matters. We respond quickly to extract water, begin drying, and prevent secondary damage that could compromise your property and insurance claim.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-contractor-black mb-3">Clear Process, No Surprises</h3>
              <p className="text-restoration-gray">
                From initial estimate through final walkthrough, we communicate clearly and keep you informed. You'll know what to expect at each stage of your project—whether it's emergency mitigation or a planned renovation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-contractor-black mb-3">Licensed & Insured Contractor</h3>
              <p className="text-restoration-gray">
                Oregon CCB# 258533. We carry full licensing, bonding, and insurance, giving you peace of mind that your project is protected and our work meets state standards.
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
            In addition to Burns, we proudly serve:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <Link to="/service-areas/hines-or" className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg p-6 transition-all">
              <h3 className="font-bold text-xl mb-2">Hines, OR</h3>
              <p className="text-cream text-sm">Full service availability</p>
            </Link>
            <Link to="/service-areas/sweet-home-or" className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg p-6 transition-all">
              <h3 className="font-bold text-xl mb-2">Sweet Home, OR</h3>
              <p className="text-cream text-sm">Mid-Valley service</p>
            </Link>
          </div>
          <p className="text-center text-structural-gray text-sm mt-6">
            We also serve Lebanon, Albany, and other Mid-Willamette Valley communities
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-12 text-center">
            Frequently Asked Questions - Burns, OR
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
            Need Construction or Restoration Services in Burns?
          </h2>
          <p className="text-xl mb-8 text-cream">
            Call us today for fast service, quality workmanship, and professional results.
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
          <p className="text-sm text-cream mt-6">
            Licensed, Bonded & Insured • CCB# 258533 • Free Estimates Available
          </p>
        </div>
      </section>
    </>
  );
};

export default BurnsOR;