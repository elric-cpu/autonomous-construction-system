import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const Footer = () => {
  const { user } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-contractor-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Benson Home Solutions</h3>
            <p className="text-gray-400 mb-4">
              Professional restoration and remodeling services in Harney County and Mid-Valley Oregon.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="w-4 h-4 text-maroon" />
                <a href="tel:5413215115" className="hover:text-white transition-colors">(541) 321-5115</a>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4 text-maroon" />
                <a href="mailto:info@bensonhomesolutions.com" className="hover:text-white transition-colors">info@bensonhomesolutions.com</a>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-maroon" />
                <span>Burns, OR & Sweet Home, OR</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-maroon transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-maroon transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-maroon transition-colors">Services</Link></li>
              <li><Link to="/reviews" className="hover:text-maroon transition-colors">Reviews</Link></li>
              <li><Link to="/blog" className="hover:text-maroon transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-maroon transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/services/water-damage-mitigation" className="hover:text-maroon transition-colors">Water Damage Mitigation</Link></li>
              <li><Link to="/services/mold-remediation" className="hover:text-maroon transition-colors">Mold Remediation</Link></li>
              <li><Link to="/services/bathroom-remodels" className="hover:text-maroon transition-colors">Bathroom Remodels</Link></li>
              <li><Link to="/services/kitchen-remodels" className="hover:text-maroon transition-colors">Kitchen Remodels</Link></li>
              <li><Link to="/services/general-contracting" className="hover:text-maroon transition-colors">General Contracting</Link></li>
            </ul>
          </div>

          {/* Legal / Social */}
          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <div className="flex gap-4 mb-6">
              <a href="https://www.facebook.com/p/Benson-Enterprises-61565667928376/" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-maroon transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              {/* Add Instagram if available */}
            </div>
            <div className="text-sm text-gray-500">
              <p>CCB# 258533</p>
              <p>Licensed • Bonded • Insured</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Benson Home Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/sitemap" className="hover:text-white">Sitemap</Link>
            <span className="text-gray-700">|</span>
            {user ? (
               <Link to="/staff-portal" className="text-maroon font-semibold hover:text-white">Staff Portal</Link>
            ) : (
               <Link to="/login" className="hover:text-white">Staff Login</Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;