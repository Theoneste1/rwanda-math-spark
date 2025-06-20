
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-green-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl opacity-90">
            Get in touch with our team to learn more about Rwanda Mathematics Olympiad
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Email</h3>
                    <p className="text-gray-600">invest@rwandaolympiad.rw</p>
                    <p className="text-gray-600">info@rwandaolympiad.rw</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Phone</h3>
                    <p className="text-gray-600">+250 788 123 456</p>
                    <p className="text-gray-600">+250 788 654 321</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Office Address</h3>
                    <p className="text-gray-600">
                      Rwanda Mathematics Olympiad<br />
                      KG 123 St, Kigali<br />
                      Gasabo District, Rwanda
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Office Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Find Us</h2>
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">Interactive Map</p>
                  <p className="text-gray-500">Rwanda Mathematics Olympiad Office</p>
                  <p className="text-gray-500">Kigali, Rwanda</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Follow Us</h2>
          <p className="text-lg text-gray-600 mb-8">
            Stay updated with our latest news, student achievements, and upcoming events
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://twitter.com/rwandaolympiad"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition-colors duration-300 transform hover:scale-110"
            >
              <Twitter className="w-8 h-8" />
            </a>
            <a
              href="https://facebook.com/rwandaolympiad"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 text-white p-4 rounded-full hover:bg-blue-800 transition-colors duration-300 transform hover:scale-110"
            >
              <Facebook className="w-8 h-8" />
            </a>
            <a
              href="https://instagram.com/rwandaolympiad"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-500 text-white p-4 rounded-full hover:bg-pink-600 transition-colors duration-300 transform hover:scale-110"
            >
              <Instagram className="w-8 h-8" />
            </a>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Quick Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">For Students & Parents</h3>
              <p className="text-gray-600 mb-4">
                Questions about participation, training camps, or academic programs
              </p>
              <a
                href="mailto:students@rwandaolympiad.rw"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                students@rwandaolympiad.rw
              </a>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Building className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">For Schools & Teachers</h3>
              <p className="text-gray-600 mb-4">
                Partnership opportunities, teacher training, and school registration
              </p>
              <a
                href="mailto:schools@rwandaolympiad.rw"
                className="text-green-600 hover:text-green-800 font-semibold"
              >
                schools@rwandaolympiad.rw
              </a>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">For Sponsors & Partners</h3>
              <p className="text-gray-600 mb-4">
                Investment opportunities, sponsorships, and corporate partnerships
              </p>
              <a
                href="mailto:invest@rwandaolympiad.rw"
                className="text-purple-600 hover:text-purple-800 font-semibold"
              >
                invest@rwandaolympiad.rw
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Import the missing icons
import { GraduationCap, Building, DollarSign } from "lucide-react";

export default Contact;
