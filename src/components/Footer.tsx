import { Mail, Phone, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return <footer className="bg-gray-900">
      {/* Get in Touch Section */}
      <div className="bg-gray-800/50">
        
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo */}
          <div className="col-span-1">
            <img src="/lovable-uploads/79b5855a-c8c3-4d37-bf06-efd901bde2b3.png" alt="BayVibe DC Logo" className="h-12 w-auto" />
          </div>

          {/* Building Infrastructure */}
          <div className="col-span-1">
            <Link to="/building-infrastructure">
              <h3 className="text-gray-400 text-sm font-medium mb-6 hover:text-white transition-colors cursor-pointer">Building Infrastructure</h3>
            </Link>
            <ul className="space-y-4">
              <li>
                <Link to="/it-hardware-infrastructure" className="text-gray-400 hover:text-white transition-colors">
                  IT & Hardware Infrastructure
                </Link>
              </li>
              <li>
                <Link to="/digital-data-infrastructure" className="text-gray-400 hover:text-white transition-colors">
                  Digital Data Infrastructure
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-gray-400 hover:text-white transition-colors">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* About us */}
          <div className="col-span-1">
            
            <ul className="space-y-4">
              <li>
                <Link to="/about-us" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/business-revenue-model" className="text-gray-400 hover:text-white transition-colors">
                  Business Revenue Model
                </Link>
              </li>
              <li>
                <Link to="/maintenance-future-innovations" className="text-gray-400 hover:text-white transition-colors">
                  Maintenance & Future Innovations
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact us */}
          <div className="col-span-1">
            <h3 className="text-white text-lg font-semibold mb-6">Contact us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <a href="mailto:support@bayvibedc.com" className="text-white hover:text-green-500 transition-colors break-all">
                  support@bayvibedc.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <a href="tel:+919444126240" className="text-white hover:text-green-500 transition-colors">
                  +91 9444126240
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 mt-12 border-t border-gray-700">
          <div className="flex gap-6 mb-4 md:mb-0">
            <Link to="/terms-and-conditions" className="text-white hover:text-green-500 transition-colors underline">
              Terms and condition
            </Link>
            <Link to="/privacy-policy" className="text-white hover:text-green-500 transition-colors underline">
              Privacy policy
            </Link>
          </div>
          <div className="flex items-center gap-2 text-green-500">
            <span>All Rights Reserved.</span>
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span>Copyright 2025 Bayvibedc.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;