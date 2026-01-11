import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, CheckCircle, ArrowRight, Shield, Clock, Award, Users, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';

const Home = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "name": "Benson Home Solutions",
    "description": "Professional water damage restoration, mold remediation, and home remodeling services in Harney County and Mid-Valley Oregon. 24/7 emergency response.",
    "url": "https://bensonhomesolutions.com",
    "telephone": "+1-541-321-5115",
    "sameAs": ["https://www.facebook.com/p/Benson-Enterprises-61565667928376/"],
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "OR",
      "addressCountry": "US"
    },
    "areaServed": [{
      "@type": "City",
      "name": "Burns"
    }, {
      "@type": "City",
      "name": "Hines"
    }, {
      "@type": "City",
      "name": "Sweet Home"
    }, {
      "@type": "City",
      "name": "Lebanon"
    }, {
      "@type": "City",
      "name": "Albany"
    }],
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "name": "CCB# 258533"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59",
      "description": "24/7 Emergency Service Available"
    }
  };
  const services = [{
    title: 'Water Damage Mitigation & Dry-Out',
    description: 'Fast emergency response to extract water, dry structures, and prevent secondary damage. We work directly with insurance companies.',
    icon: '💧',
    link: '/services/water-damage-mitigation'
  }, {
    title: 'Mold Remediation',
    description: 'Professional mold assessment, containment, and removal following industry protocols to restore healthy indoor air quality.',
    icon: '🛡️',
    link: '/services/mold-remediation'
  }, {
    title: 'Bathroom Remodels',
    description: 'Complete bathroom renovations from concept to completion, including fixtures, tile, accessibility upgrades, and custom touches.',
    icon: '🚿',
    link: '/services/bathroom-remodels'
  }, {
    title: 'Kitchen Remodels',
    description: 'Kitchen transformations that blend functionality with style—cabinets, countertops, appliances, and layout optimization.',
    icon: '🏠',
    link: '/services/kitchen-remodels'
  }, {
    title: 'General Contracting',
    description: 'Home additions, remodels, ADA/aging-in-place modifications, exterior improvements, and insurance restoration work.',
    icon: '🔨',
    link: '/services/general-contracting'
  }];
  const processSteps = [{
    title: 'Initial Contact & Assessment',
    description: 'Call us or submit a request. We respond quickly, especially for water emergencies.'
  }, {
    title: 'Detailed Estimate',
    description: 'We provide clear, itemized estimates with no hidden fees. Insurance claim coordination available.'
  }, {
    title: 'Professional Execution',
    description: 'Licensed, insured team works efficiently with regular communication and quality workmanship.'
  }, {
    title: 'Final Walkthrough',
    description: 'We ensure you\'re completely satisfied before considering the job complete.'
  }];
  const reviews = [{
    name: 'Sarah M.',
    location: 'Burns, OR',
    text: 'Benson Home Solutions saved our home after a pipe burst. They were on-site within hours and handled everything professionally.',
    rating: 5
  }, {
    name: 'Mike T.',
    location: 'Sweet Home, OR',
    text: 'Our kitchen remodel exceeded expectations. The team was punctual, clean, and incredibly skilled.',
    rating: 5
  }, {
    name: 'Jennifer L.',
    location: 'Hines, OR',
    text: 'Professional mold remediation service. They explained everything clearly and worked with our insurance company seamlessly.',
    rating: 5
  }];
  return <>
      <SEO title="Benson Home Solutions | Water Damage & Restoration Services" description="Professional water damage restoration, mold remediation, and home remodeling services in Harney County and Mid-Valley Oregon. 24/7 emergency response." schema={schema} keywords="Oregon construction, restoration company, water damage mitigation, mold remediation, bathroom remodel, kitchen remodel, Burns OR contractor, Sweet Home OR contractor" />

      {/* Hero Section */}
      <section className="relative bg-contractor-black text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            className="w-full h-full object-cover" 
            alt="Modern Oregon home exterior with professional restoration work in progress" 
            src="https://images.unsplash.com/photo-1678575326996-a1bf09b86158?auto=format&fit=crop&w=1920&q=80" 
            loading="eager" 
            fetchpriority="high"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }}>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Professional Home Restoration & Remodeling Services in Oregon
              </h1>
              <p className="text-xl lg:text-2xl mb-4 text-cream">
                Water Damage Mitigation, Mold Remediation & Expert General Contracting
              </p>
              <p className="text-lg mb-8 text-structural-gray">
                Serving Harney County (Burns, Hines) and the Mid-Willamette Valley (Sweet Home, Lebanon, Albany) with licensed, professional restoration and construction services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:5413215115">
                  <Button size="lg" className="bg-maroon hover:bg-opacity-90 text-white text-lg px-8 py-6 w-full sm:w-auto">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now: (541) 321-5115
                  </Button>
                </a>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-contractor-black text-lg px-8 py-6 w-full sm:w-auto">
                    Request an Estimate
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Optimized for rendering - removed motion here for better performance on mobile scroll */}
            <div className="flex flex-col items-center text-center">
              <Shield className="w-12 h-12 text-maroon mb-3" />
              <p className="font-semibold text-contractor-black">Licensed & Insured</p>
              <p className="text-sm text-restoration-gray">CCB# 258533</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Clock className="w-12 h-12 text-maroon mb-3" />
              <p className="font-semibold text-contractor-black">Fast Response</p>
              <p className="text-sm text-restoration-gray">Emergency Available</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Award className="w-12 h-12 text-maroon mb-3" />
              <p className="font-semibold text-contractor-black">Quality Work</p>
              <p className="text-sm text-restoration-gray">Professional Standards</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Users className="w-12 h-12 text-maroon mb-3" />
              <p className="font-semibold text-contractor-black">Local Team</p>
              <p className="text-sm text-restoration-gray">Oregon Owned</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-contractor-black mb-4">
              Our Core Services
            </h2>
            <p className="text-xl text-restoration-gray max-w-3xl mx-auto">
              Comprehensive restoration and remodeling solutions tailored to your home's needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => <div key={service.title} className="flex">
                <Link to={service.link} className="w-full flex">
                  <div className="bg-white border-2 border-structural-gray rounded-lg p-6 hover:border-maroon hover:shadow-lg transition-all w-full flex flex-col h-full">
                    <div className="text-5xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold text-contractor-black mb-3">
                      {service.title}
                    </h3>
                    <p className="text-restoration-gray mb-4 flex-grow">
                      {service.description}
                    </p>
                    <span className="text-maroon font-semibold flex items-center gap-2 mt-auto">
                      View Service Details
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </div>)}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button size="lg" className="bg-maroon hover:bg-opacity-90 text-white">
                View All Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Expanded Content Section for SEO */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none text-gray-700">
                <h2 className="text-3xl font-bold text-maroon mb-6">Why Choose Benson Home Solutions?</h2>
                <p className="mb-6">
                    At Benson Home Solutions, we understand that your home is more than just a building—it’s your sanctuary. Whether you’re facing the sudden stress of water damage or planning a dream kitchen remodel, you need a partner you can trust. We are a locally owned and operated construction and restoration company dedicated to serving our neighbors in Harney County and the Mid-Willamette Valley.
                </p>
                <p className="mb-6">
                    Our team brings years of experience and a commitment to excellence in every project we undertake. We are fully licensed, bonded, and insured (CCB# 258533), giving you peace of mind that your property is in capable hands. From emergency water extraction in the middle of the night to meticulous tile work in your new bathroom, we prioritize quality, transparency, and customer satisfaction.
                </p>

                <h2 className="text-3xl font-bold text-maroon mb-6 mt-12">Our Commitment to Emergency Response</h2>
                <p className="mb-6">
                    Disasters don’t wait for business hours, and neither do we. Water damage can escalate quickly, leading to structural issues and mold growth if not addressed immediately. That’s why Benson Home Solutions offers <strong>24/7 emergency response services</strong>. 
                </p>
                <p className="mb-6">
                    When you call us, you speak to a local professional ready to mobilize quickly to Burns, Hines, Sweet Home, Lebanon, or Albany. We arrive with the industrial-grade equipment needed to extract water, dry out your property, and secure your home against further damage. We also work directly with your insurance company to streamline the claims process, documenting every step to ensure you get the coverage you deserve.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                   <div>
                       <h3 className="text-2xl font-bold text-contractor-black mb-4">Serving Harney County</h3>
                       <p>
                           We are proud to be a trusted resource for residents of Burns, Hines, and the surrounding high desert communities. We understand the unique challenges of our local climate and provide solutions built to last.
                       </p>
                   </div>
                   <div>
                       <h3 className="text-2xl font-bold text-contractor-black mb-4">Serving Mid-Willamette Valley</h3>
                       <p>
                           Our team is equally committed to serving homeowners in Sweet Home, Lebanon, Albany, and nearby areas. We bring top-tier craftsmanship to every renovation and restoration project in the valley.
                       </p>
                   </div>
                </div>
            </div>
        </div>
      </section>

      {/* Insurance Section */}
      <section className="py-20 bg-mitigation-graphite text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                We Work With Your Insurance Company
              </h2>
              <p className="text-lg text-structural-gray mb-6">
                Dealing with water damage, mold, or property loss is stressful enough. We have extensive experience coordinating with insurance companies to streamline your claim process.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-cream flex-shrink-0 mt-1" />
                  <span>Direct communication with adjusters and claim representatives</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-cream flex-shrink-0 mt-1" />
                  <span>Detailed documentation and photo evidence for claims</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-cream flex-shrink-0 mt-1" />
                  <span>Transparent estimates aligned with industry standards</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-cream flex-shrink-0 mt-1" />
                  <span>Emergency mitigation to prevent further damage and protect your claim</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link to="/contact">
                  <Button size="lg" className="bg-maroon hover:bg-opacity-90 text-white">
                    Discuss Your Claim
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                className="rounded-lg shadow-2xl w-full" 
                alt="Insurance claim documentation paperwork and professional restoration equipment on site" 
                src="https://images.unsplash.com/photo-1586282391127-20f3952f64f7?auto=format&fit=crop&w=800&q=80" 
                loading="lazy" 
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-contractor-black mb-4">
              Our Restoration Process
            </h2>
            <p className="text-xl text-restoration-gray max-w-3xl mx-auto">
              Clear communication and professional execution from start to finish
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => <div key={step.title} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-maroon text-white flex items-center justify-center text-2xl font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-contractor-black mb-3">
                    {step.title}
                  </h3>
                  <p className="text-restoration-gray">
                    {step.description}
                  </p>
                </div>
                {index < processSteps.length - 1 && <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-structural-gray -z-10" style={{
              width: 'calc(100% - 4rem)'
            }} />}
              </div>)}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-contractor-black mb-4">
              Service Areas
            </h2>
            <p className="text-xl text-restoration-gray">
              Proudly serving communities across Oregon
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-contractor-black mb-4">Harney County</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/service-areas/harney-county/burns" className="text-maroon hover:underline font-semibold">
                    Burns, OR
                  </Link>
                </li>
                <li>
                  <Link to="/service-areas/harney-county/hines" className="text-maroon hover:underline font-semibold">
                    Hines, OR
                  </Link>
                </li>
              </ul>
              <p className="text-restoration-gray mt-4 text-sm">
                Fast emergency response for water damage and restoration needs
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-contractor-black mb-4">Mid-Willamette Valley</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/service-areas/mid-valley/sweet-home" className="text-maroon hover:underline font-semibold">
                    Sweet Home, OR
                  </Link>
                </li>
                <li className="text-restoration-gray">Lebanon, OR</li>
                <li className="text-restoration-gray">Albany, OR</li>
              </ul>
              <p className="text-restoration-gray mt-4 text-sm">
                Full-service remodeling and construction throughout the valley
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-contractor-black mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-restoration-gray">
              Real experiences from Oregon homeowners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => <div key={review.name} className="bg-cream rounded-lg p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => <span key={i} className="text-2xl">⭐</span>)}
                </div>
                <p className="text-restoration-gray mb-4 italic">
                  "{review.text}"
                </p>
                <div>
                  <p className="font-bold text-contractor-black">{review.name}</p>
                  <p className="text-sm text-restoration-gray">{review.location}</p>
                </div>
              </div>)}
          </div>

          <div className="text-center mt-12">
            <Link to="/reviews">
              <Button size="lg" variant="outline" className="border-2 border-maroon text-maroon hover:bg-maroon hover:text-white">
                Read More Reviews
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t-2 border-structural-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-contractor-black mb-4">
              Recent Projects
            </h2>
            <p className="text-xl text-restoration-gray">
              Quality workmanship across all our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img className="w-full h-64 object-cover" alt="Modern bathroom remodel with white subway tile and chrome fixtures" src="https://images.unsplash.com/photo-1609946860441-a51ffcf22208?auto=format&fit=crop&w=600&q=80" loading="lazy" />
              <div className="p-4 bg-cream">
                <p className="font-bold text-contractor-black">Bathroom Remodel - Burns</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img className="w-full h-64 object-cover" alt="Professional water damage restoration equipment drying out residential space" src="https://horizons-cdn.hostinger.com/ab318564-f769-4748-824b-13bd38e75f18/img_4039-vBW6K.jpeg" loading="lazy" />
              <div className="p-4 bg-cream">
                <p className="font-bold text-contractor-black">Water Mitigation - Sweet Home</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img className="w-full h-64 object-cover" alt="Updated kitchen with white cabinets and quartz countertops" src="https://images.unsplash.com/flagged/photo-1573168710465-7f7da9a23a15?auto=format&fit=crop&w=600&q=80" loading="lazy" />
              <div className="p-4 bg-cream">
                <p className="font-bold text-contractor-black">Kitchen Renovation - Hines</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img className="w-full h-64 object-cover" alt="Mold remediation containment setup with plastic barriers" src="https://horizons-cdn.hostinger.com/ab318564-f769-4748-824b-13bd38e75f18/img_3666-VwRV2.heic" loading="lazy" />
              <div className="p-4 bg-cream">
                <p className="font-bold text-contractor-black">Mold Remediation - Lebanon</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img className="w-full h-64 object-cover" alt="Home addition exterior construction framing" src="https://horizons-cdn.hostinger.com/ab318564-f769-4748-824b-13bd38e75f18/img_3274-qzQ8j.jpeg" loading="lazy" />
              <div className="p-4 bg-cream">
                <p className="font-bold text-contractor-black">Concrete slab plumbing repair - Albany</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img className="w-full h-64 object-cover" alt="ADA accessible bathroom with grab bars and walk-in shower" src="https://horizons-cdn.hostinger.com/ab318564-f769-4748-824b-13bd38e75f18/img_2603-FgtM8.jpeg" loading="lazy" />
              <div className="p-4 bg-cream">
                <p className="font-bold text-contractor-black">Wheelchair Ramp - Burns</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-maroon text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-cream">
            Call us today for a free estimate or to discuss your project. Emergency water mitigation available 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="tel:5413215115" className="w-full sm:w-auto">
              <Button size="lg" className="bg-white text-maroon hover:bg-cream text-lg px-8 py-6 w-full">
                <Phone className="w-5 h-5 mr-2" />
                (541) 321-5115
              </Button>
            </a>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-maroon text-lg px-8 py-6 w-full">
                <Mail className="w-5 h-5 mr-2" />
                Request Estimate
              </Button>
            </Link>
             <a href="https://www.facebook.com/p/Benson-Enterprises-61565667928376/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6 w-full">
                <Facebook className="w-5 h-5 mr-2" />
                Follow on Facebook
              </Button>
            </a>
          </div>
          <p className="text-sm text-cream mt-6">
            Licensed, Bonded & Insured • CCB# 258533 • Free Estimates
          </p>
        </div>
      </section>
    </>;
};
export default Home;