
import { Users, BookOpen, Heart, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const GetInvolved = () => {
  const opportunities = [
    {
      icon: Users,
      title: "Volunteer as a Coach",
      description: "Share your mathematical expertise by mentoring talented students during our training camps and competitions.",
      requirements: ["Strong mathematics background", "Passion for teaching", "Available for weekend sessions"],
      action: "Apply to Coach"
    },
    {
      icon: BookOpen,
      title: "Teacher Training Program",
      description: "Join our professional development program to enhance your mathematics teaching skills and problem-solving techniques.",
      requirements: ["Certified mathematics teacher", "Teaching experience", "Commitment to attend workshops"],
      action: "Join Training"
    },
    {
      icon: Heart,
      title: "Support as a Sponsor",
      description: "Help us expand our reach by providing financial support for training camps, materials, and international competitions.",
      requirements: ["Individual or organization", "Commitment to education", "Partnership agreement"],
      action: "Become Sponsor"
    }
  ];

  const benefits = [
    "Contribute to Rwanda's mathematical excellence",
    "Network with education professionals",
    "Professional development opportunities",
    "Recognition in our community",
    "Access to international mathematics resources",
    "Certificate of participation"
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-800 to-green-600 text-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
              Get Involved
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Join our mission to nurture Rwanda's mathematical talent and build a brighter future through education
            </p>
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
              Ways to Make a Difference
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose how you'd like to contribute to Rwanda's mathematical excellence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {opportunities.map((opportunity, index) => (
              <div key={index} className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <opportunity.icon className="w-10 sm:w-12 h-10 sm:h-12 text-green-600 mb-4 sm:mb-6" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                  {opportunity.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  {opportunity.description}
                </p>
                
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">Requirements:</h4>
                  <ul className="text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-2">
                    {opportunity.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link
                  to="/contact"
                  className="inline-block w-full text-center bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 text-sm sm:text-base"
                >
                  {opportunity.action}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 sm:py-16 lg:py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
                Benefits of Joining Us
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                When you join the Rwanda Mathematics Olympiad community, you're not just volunteering – you're investing in Rwanda's future and your own professional growth.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-green-600 mr-2 sm:mr-3 mt-1">✓</span>
                    <span className="text-sm sm:text-base text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/lovable-uploads/17cc90d2-2994-4d96-8763-249e19c98daf.png"
                alt="Mathematics Olympiad Community"
                className="w-full max-w-md rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Student Opportunities */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
              For Students
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to challenge yourself and represent Rwanda in mathematical competitions?
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 sm:p-8 lg:p-12 rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
                  Join Our Training Program
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-blue-100 mb-6 sm:mb-8 leading-relaxed">
                  Participate in district-level competitions, advance to national selections, and join our intensive training camps. The top performers represent Rwanda in international competitions.
                </p>
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="flex items-center">
                    <span className="text-blue-300 mr-2 sm:mr-3">→</span>
                    <span className="text-sm sm:text-base">District competitions (all 30 districts)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-300 mr-2 sm:mr-3">→</span>
                    <span className="text-sm sm:text-base">National selection process</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-300 mr-2 sm:mr-3">→</span>
                    <span className="text-sm sm:text-base">Intensive training camps</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-300 mr-2 sm:mr-3">→</span>
                    <span className="text-sm sm:text-base">International competition representation</span>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="inline-block bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 text-sm sm:text-base"
                >
                  Start Your Journey
                </Link>
              </div>
              <div className="flex justify-center">
                <img
                  src="/lovable-uploads/54fd327f-f5c3-41fe-9b5b-be85e246227a.png"
                  alt="Student Training"
                  className="w-full max-w-md rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 sm:mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 leading-relaxed">
            Contact us today to learn more about how you can contribute to Rwanda's mathematical excellence.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
              <Mail className="w-8 sm:w-10 h-8 sm:h-10 text-green-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Email Us</h3>
              <p className="text-sm sm:text-base text-gray-600 break-all">theoneste.sanzabarinda@aims.ac.rw</p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
              <Phone className="w-8 sm:w-10 h-8 sm:h-10 text-green-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Call Us</h3>
              <p className="text-sm sm:text-base text-gray-600">+250 788 123 456</p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
              <MapPin className="w-8 sm:w-10 h-8 sm:h-10 text-green-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Visit Us</h3>
              <p className="text-sm sm:text-base text-gray-600">AIMS Rwanda, Kigali</p>
            </div>
          </div>
          
          <Link
            to="/contact"
            className="inline-block bg-green-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 text-base sm:text-lg"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
