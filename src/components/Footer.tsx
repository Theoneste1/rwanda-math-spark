
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Linkedin } from "lucide-react";

const Footer = () => {
  // Social media and contact links
  const linkedinUrl = "https://www.linkedin.com/company/103636241/admin/dashboard/";
  const whatsappUrl = "https://chat.whatsapp.com/LZBJL0Ps0NK7fPFoZtbc0g";
  const instagramUrl = "https://www.instagram.com/rwanda_mathematical_olympiad?igsh=YzljYTk1ODg3Zg==";

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              {/* Rwanda Mathematics Olympiad logo - Improved mobile sizing */}
              <img 
                src="/lovable-uploads/0115baec-ea29-4a53-b52e-009316b8fed0.png" 
                alt="Rwanda Mathematics Olympiad" 
                className="h-12 sm:h-14 md:h-16 w-auto mr-3 flex-shrink-0"
              />
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-400 leading-tight">Rwanda Mathematics Olympiad</span>
            </Link>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">
              Rwanda Mathematics Olympiad - Empowering Rwanda's future STEM leaders through mathematical excellence and innovation.
            </p>
            
            {/* Social media icons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {/* LinkedIn */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 p-1"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="w-6 h-6 sm:w-7 sm:h-7" />
              </a>
              
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors duration-200 p-1"
                aria-label="Join our WhatsApp group"
              >
                <svg 
                  className="w-6 h-6 sm:w-7 sm:h-7" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
              
              {/* Twitter */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 p-1"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-6 h-6 sm:w-7 sm:h-7" />
              </a>
              
              {/* Facebook */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 p-1"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-6 h-6 sm:w-7 sm:h-7" />
              </a>
              
              {/* Instagram with updated link */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors duration-200 p-1"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-6 h-6 sm:w-7 sm:h-7" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base block">
                  Our Impact
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base block">
                  Meet the Team
                </Link>
              </li>
              <li>
                <Link to="/get-involved" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base block">
                  Get Involved
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start text-gray-300 text-sm sm:text-base">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span className="break-all">theoneste.sanzabarinda@aims.ac.rw</span>
              </li>
              <li className="flex items-center text-gray-300 text-sm sm:text-base">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                <span>+250 788 123 456</span>
              </li>
              <li className="flex items-start text-gray-300 text-sm sm:text-base">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>Kigali, Rwanda</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            © 2025 Rwanda Mathematics Olympiad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
