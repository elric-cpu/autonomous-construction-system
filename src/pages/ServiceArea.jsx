import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Phone, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Droplets, 
  Hammer, 
  Home, 
  CheckCircle,
  ThermometerSnowflake,
  Waves
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getTownData, serviceAreaData } from '@/data/serviceAreas';

const ServiceArea = () => {
  const { region, town } = useParams();
  const townData = getTownData(region, town);

  if (!townData) {
    return <Navigate to="/" replace />;
  }

  const isHarney = region === 'harney-county';
  const countyName = townData.county || (isHarney ? 'Harney County' : 'Linn, Marion, Polk or Yamhill County');

  // Dynamic Content Generators
  const getRegionalRisks = () => {
    if (isHarney) {
      return (
        <>
          <p className="mb-4">
            In <strong>{townData.name}</strong> and the high desert climate of Harney County, the primary threat to homes is extreme temperature fluctuation. Winter freezes often lead to burst pipes in exterior walls, crawlspaces, and attics.
          </p>
          <p>
            When these frozen pipes thaw, they can release hundreds of gallons of water in minutes. Benson Home Solutions specializes in <span className="text-maroon font-semibold">structural drying for frozen pipe damage</span>, ensuring that moisture is removed from wall cavities before dry rot sets in.
          </p>
        </>
      );
    }
    return (
      <>
        <p className="mb-4">
          Residents of <strong>{townData.name}</strong> know that the Willamette Valley's persistent rain and high humidity create unique challenges. The primary risk here isn't just the water you see—it's the moisture that lingers.
        </p>
        <p>
          In our region, flooding from river swells and groundwater saturation is common in spring. Furthermore, the ambient humidity makes mold growth a rapid threat after any leak. We use industrial-grade dehumidification tailored for the wet Oregon climate to protect your home.
        </p>
      </>
    );
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Benson Home Solutions - ${townData.name}`,
    "image": "https://bensonhomesolutions.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": townData.name,
      "addressRegion": "OR",
      "postalCode": townData.zip,
      "addressCountry": "US"
    },
    "url": window.location.href,
    "telephone": "+15413215115",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "areaServed": {
      "@type": "City",
      "name": townData.name
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${townData.name}, OR Water Damage Restoration & Home Services | Benson Home Solutions`}</title>
        <meta name="description" content={`Professional water damage restoration, mold remediation, and remodeling in ${townData.name}, OR (${townData.zip}). 24/7 Emergency Service. Licensed CCB# 258533.`} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-contractor-black text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {isHarney ? (
             <img src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f" alt="High desert Oregon landscape" className="w-full h-full object-cover" />
          ) : (
             <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e" alt="Willamette Valley lush landscape" className="w-full h-full object-cover" />
          )}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-maroon text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
          >
            <MapPin className="w-4 h-4" />
            Serving {townData.name}, {townData.zip}
          </motion.div>
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
            {townData.name}, {townData.county} Water Damage Restoration <br className="hidden md:block" />& Home Services
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Professional restoration and remodeling services serving {townData.name} and surrounding communities.
            Licensed, Bonded, and Insured (CCB# 258533).
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5413215115">
              <Button size="lg" className="bg-maroon hover:bg-red-700 text-white w-full sm:w-auto font-bold py-6 px-8 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                24/7 Emergency: (541) 321-5115
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-contractor-black w-full sm:w-auto font-bold py-6 px-8 text-lg">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <main className="lg:col-span-8 space-y-16">
            
            {/* Introduction */}
            <section>
              <h2 className="text-3xl font-bold text-contractor-black mb-6">
                Welcome to {townData.name}
              </h2>
              <div className="prose prose-lg text-gray-700">
                <p>
                  Benson Home Solutions is proud to serve homeowners and businesses in <strong>{townData.name}, OR ({townData.zip})</strong>. Whether you are dealing with a sudden water emergency or planning a dream renovation, you need a contractor who understands the local area.
                </p>
                <p>
                  We are not a national franchise. We are a locally owned and operated business that knows {countyName}. From navigating local building codes to understanding the specific climate challenges of the {isHarney ? "high desert" : "Willamette Valley"}, our expertise is tailored to your community.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6 not-prose rounded-r-lg">
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-blue-900 text-lg">24/7 Emergency Response in {townData.name}</h4>
                      <p className="text-blue-800">
                        Water damage doesn't wait for business hours. We have crews ready to deploy to {townData.name} day or night to stop the damage and protect your property.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Services Grid */}
            <section>
              <h2 className="text-3xl font-bold text-contractor-black mb-8">
                Our Services in {townData.name}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-maroon transition-colors">
                  <Droplets className="w-8 h-8 text-maroon mb-4" />
                  <h3 className="text-xl font-bold mb-2">Water Damage Restoration</h3>
                  <p className="text-gray-600 mb-4">Rapid extraction, structural drying, and damage repairs. We handle everything from burst pipes to flood cleanup.</p>
                  <Link to="/services/water-damage-mitigation" className="text-maroon font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-maroon transition-colors">
                  <ShieldCheck className="w-8 h-8 text-maroon mb-4" />
                  <h3 className="text-xl font-bold mb-2">Mold Remediation</h3>
                  <p className="text-gray-600 mb-4">Safe containment and removal of mold spores. We identify the moisture source to prevent future growth.</p>
                  <Link to="/services/mold-remediation" className="text-maroon font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-maroon transition-colors">
                  <Home className="w-8 h-8 text-maroon mb-4" />
                  <h3 className="text-xl font-bold mb-2">Kitchen & Bath Remodels</h3>
                  <p className="text-gray-600 mb-4">Transform your {townData.name} home with modern designs, quality cabinetry, and professional installation.</p>
                  <Link to="/services/kitchen-remodels" className="text-maroon font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    Kitchens <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-maroon transition-colors">
                  <Hammer className="w-8 h-8 text-maroon mb-4" />
                  <h3 className="text-xl font-bold mb-2">General Contracting</h3>
                  <p className="text-gray-600 mb-4">Additions, repairs, and ADA modifications. We help you age in place safely and comfortably.</p>
                  <Link to="/services/general-contracting" className="text-maroon font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Regional Context */}
            <section className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                {isHarney ? (
                  <ThermometerSnowflake className="w-8 h-8 text-maroon" />
                ) : (
                  <Waves className="w-8 h-8 text-blue-600" />
                )}
                <h2 className="text-2xl font-bold text-contractor-black m-0">
                  Regional Risks: {isHarney ? 'Extreme Cold' : 'Moisture & Mold'}
                </h2>
              </div>
              <div className="prose prose-lg text-gray-700">
                {getRegionalRisks()}
                <p className="mt-4 font-semibold">
                  We are familiar with {townData.name}'s local building regulations and common architectural styles, ensuring every repair meets code and maintains your home's character.
                </p>
              </div>
            </section>

            {/* Insurance Section */}
            <section>
              <h2 className="text-3xl font-bold text-contractor-black mb-6">
                Insurance Claims in {townData.name}
              </h2>
              <div className="prose prose-lg text-gray-700">
                <p>
                  Dealing with insurance claims can be stressful. At Benson Home Solutions, we work for <strong>you</strong>, not the insurance company. We use industry-standard Xactimate software to ensure your claim in {townData.name} is accurately valued.
                </p>
                <ul className="list-none pl-0 space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <span><strong>Direct Billing:</strong> We bill your insurance carrier directly, so you don't have to float the costs.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <span><strong>Documentation:</strong> We provide comprehensive photo logs and moisture readings required by adjusters.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <span><strong>Representation:</strong> We meet adjusters on-site at your {townData.name} property to ensure no damage is overlooked.</span>
                  </li>
                </ul>
                <Link to="/resources">
                   <Button variant="outline" className="border-maroon text-maroon hover:bg-maroon hover:text-white">
                     Learn About Homeowner Rights
                   </Button>
                </Link>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-3xl font-bold text-contractor-black mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-contractor-black">How fast can you get to {townData.name}?</h4>
                  <p className="text-gray-600 mt-2">For emergencies, we dispatch immediately. Our response times are among the fastest in the region because we are locally based, not dispatching from Portland.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-contractor-black">Are you licensed to work in {townData.name}?</h4>
                  <p className="text-gray-600 mt-2">Yes. We hold Oregon CCB# 258533, which covers all residential and commercial work in {townData.name} and the entire state of Oregon.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-contractor-black">Do you offer free estimates?</h4>
                  <p className="text-gray-600 mt-2">Yes. Whether it's a kitchen remodel in {townData.name} or assessing water damage, our initial estimates are complimentary.</p>
                </div>
              </div>
            </section>

          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 sticky top-24">
              <h3 className="text-xl font-bold text-contractor-black mb-4">Quick Actions</h3>
              
              <div className="bg-maroon text-white p-6 rounded-lg text-center mb-6">
                <Phone className="w-8 h-8 mx-auto mb-2" />
                <h4 className="font-bold text-lg mb-1">Emergency?</h4>
                <p className="text-sm text-white/90 mb-4">24/7 Response for {townData.name}</p>
                <a href="tel:5413215115" className="block w-full py-3 bg-white text-maroon rounded font-bold hover:bg-gray-100 transition-colors">
                  (541) 321-5115
                </a>
              </div>

              <nav className="space-y-3">
                <Link to="/contact" className="block w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-center rounded font-semibold text-contractor-black transition-colors">
                  Request Free Estimate
                </Link>
                <Link to="/services" className="block w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-center rounded font-semibold text-contractor-black transition-colors">
                  View All Services
                </Link>
              </nav>

              {isHarney && (
                <div className="mt-8 border-t pt-6">
                  <p className="text-sm text-center text-gray-500 mb-2">Proud Member</p>
                  <a href="https://www.harneycountychamber.org" target="_blank" rel="noopener noreferrer" className="block text-center font-bold text-maroon hover:underline">
                    Harney County Chamber of Commerce
                  </a>
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
               <h3 className="font-bold text-contractor-black mb-4">Other {countyName} Areas</h3>
               <div className="flex flex-wrap gap-2">
                 {isHarney ? (
                    serviceAreaData['harney-county'].towns.map(t => (
                      <Link key={t.slug} to={`/service-areas/harney-county/${t.slug}`} className="text-sm text-blue-600 hover:underline">
                        {t.name}
                      </Link>
                    ))
                 ) : (
                    serviceAreaData['mid-valley'].counties[townData.county?.toLowerCase().split(' ')[0]]?.towns.map(t => (
                      <Link key={t.slug} to={`/service-areas/mid-valley/${t.slug}`} className="text-sm text-blue-600 hover:underline">
                        {t.name},
                      </Link>
                    ))
                 )}
               </div>
            </div>
          </aside>

        </div>
      </div>
    </>
  );
};

export default ServiceArea;