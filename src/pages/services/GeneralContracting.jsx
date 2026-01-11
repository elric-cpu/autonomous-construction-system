import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GeneralContracting = () => {
  const services = [
    'Home additions and expansions',
    'Structural repairs and renovations',
    'ADA and aging-in-place modifications',
    'Window and door installation',
    'Siding and exterior improvements',
    'Deck and patio construction',
    'Garage conversions',
    'Insurance restoration work',
  ];

  const processSteps = [
    {
      title: 'Project Consultation',
      description: 'We meet to understand your vision, assess your property, discuss budget, and identify any potential challenges or opportunities.',
    },
    {
      title: 'Planning & Permits',
      description: 'Detailed plans, material specifications, timeline estimates. We handle all necessary permits and ensure compliance with Oregon building codes.',
    },
    {
      title: 'Transparent Estimate',
      description: 'Itemized quote covering labor, materials, subcontractors, and permits. No hidden fees—just honest, professional pricing.',
    },
    {
      title: 'Construction Phase',
      description: 'Professional execution with regular communication. We maintain clean job sites, respect your property, and keep you informed of progress.',
    },
    {
      title: 'Quality Inspection',
      description: 'Throughout construction, we verify workmanship meets our standards and building codes. Final inspection ensures everything is perfect.',
    },
    {
      title: 'Project Completion',
      description: 'Complete walkthrough, address any punch-list items, and ensure you\'re 100% satisfied before we consider the job done.',
    },
  ];

  const faqs = [
    {
      question: 'What types of projects do you handle as a general contractor?',
      answer: 'We handle a wide range: home additions, structural repairs, aging-in-place modifications, window/door installation, exterior improvements, deck construction, and insurance restoration. If it involves construction, we can help.',
    },
    {
      question: 'Do you handle permits and inspections?',
      answer: 'Yes. We manage the entire permit process—applications, inspections, and ensuring all work meets Oregon building codes. This is included in our service.',
    },
    {
      question: 'How long do construction projects typically take?',
      answer: 'It varies by scope. Simple projects (window replacement) may take days; home additions can take several months. We provide realistic timelines upfront and communicate any changes immediately.',
    },
    {
      question: 'Can you work with my budget?',
      answer: 'Absolutely. We help you prioritize features, suggest cost-effective alternatives, and create a plan that maximizes value within your budget. Transparent pricing means no surprises.',
    },
    {
      question: 'Do you subcontract any work?',
      answer: 'For specialized trades (electrical, plumbing, HVAC), we work with licensed professionals we trust. We coordinate all work and maintain quality control throughout.',
    },
    {
      question: 'What if I want to make changes during construction?',
      answer: 'We understand plans evolve. We discuss change orders promptly, explain cost and timeline impacts, and get your approval before proceeding. Clear communication prevents surprises.',
    },
    {
      question: 'Do you offer aging-in-place or ADA modifications?',
      answer: 'Yes. We specialize in accessibility improvements: ramps, wider doorways, barrier-free showers, grab bars, lever handles, and other modifications that help people age safely at home.',
    },
    {
      question: 'Can you help with insurance restoration projects?',
      answer: 'Definitely. We work directly with insurance companies, document damage thoroughly, provide detailed estimates, and restore your property to pre-loss condition or better.',
    },
    {
      question: 'What areas do you serve?',
      answer: 'We serve Harney County (Burns, Hines) and the Mid-Willamette Valley (Sweet Home, Lebanon, Albany, and surrounding areas). Contact us to confirm service availability for your location.',
    },
    {
      question: 'Why should I choose Benson Home Solutions?',
      answer: 'Licensed (CCB# 258533), insured, local company with a reputation for quality work, clear communication, and professional service. We treat your home like our own.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>General Contractor Oregon | Home Additions & Remodels - Benson Home Solutions</title>
        <meta name="description" content="Licensed general contractor in Burns, Hines, Sweet Home & Mid-Valley OR. Home additions, ADA modifications, exterior improvements. CCB# 258533. Free estimates." />
      </Helmet>

      <section className="bg-contractor-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                General Contracting Services
              </h1>
              <p className="text-xl text-cream mb-6">
                Comprehensive construction services for your home. From additions to accessibility upgrades, we deliver quality workmanship and professional service.
              </p>
              <a href="tel:5413215115">
                <Button size="lg" className="bg-maroon hover:bg-opacity-90 text-white">
                  <Phone className="w-5 h-5 mr-2" />
                  Call: (541) 321-5115
                </Button>
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img className="rounded-lg shadow-2xl w-full" alt="Home addition construction with professional framing" src="https://images.unsplash.com/photo-1672627170267-fca17bb54156" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-6">
            What We Do
          </h2>
          <p className="text-lg text-restoration-gray mb-6">
            As a licensed general contractor (CCB# 258533), Benson Home Solutions provides comprehensive construction and renovation services. Whether you're expanding your home, improving accessibility, or restoring property after damage, we bring professional expertise to every project.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {services.map((service) => (
              <div key={service} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-maroon flex-shrink-0 mt-1" />
                <span className="text-restoration-gray">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-12 text-center">
            Our Construction Process
          </h2>
          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-maroon text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-contractor-black mb-2">
                      {step.title}
                    </h3>
                    <p className="text-restoration-gray">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-6">
            What Affects Cost and Timeline?
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">Project Scope:</strong>
                <span className="text-restoration-gray"> Simple repairs vs. major additions or renovations significantly affect cost and duration.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">Material Selection:</strong>
                <span className="text-restoration-gray"> Standard materials vs. custom or premium finishes impact budget.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">Structural Complexity:</strong>
                <span className="text-restoration-gray"> Foundation work, structural modifications, and engineering requirements add time and cost.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">Permit Requirements:</strong>
                <span className="text-restoration-gray"> Some jurisdictions have longer approval processes, which we factor into timelines.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">Weather Conditions:</strong>
                <span className="text-restoration-gray"> Oregon weather can impact exterior work timelines, especially in winter months.</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-20 bg-mitigation-graphite text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Service Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <Link to="/service-areas/burns-or" className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg p-6 transition-all">
              <h3 className="font-bold text-xl mb-2">Burns, OR</h3>
            </Link>
            <Link to="/service-areas/hines-or" className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg p-6 transition-all">
              <h3 className="font-bold text-xl mb-2">Hines, OR</h3>
            </Link>
            <Link to="/service-areas/sweet-home-or" className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg p-6 transition-all">
              <h3 className="font-bold text-xl mb-2">Sweet Home, OR</h3>
            </Link>
          </div>
          <p className="text-center text-structural-gray text-sm mt-6">
            Also serving Lebanon, Albany, and Mid-Valley Oregon communities
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-12 text-center">
            Frequently Asked Questions
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
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 text-cream">
            Let's discuss your construction needs. Free consultations and estimates available.
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

export default GeneralContracting;