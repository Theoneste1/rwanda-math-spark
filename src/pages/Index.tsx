
import { Link } from "react-router-dom";
import { ChevronRight, Users, Trophy, Target, Award } from "lucide-react";
import ChatBot from "../components/ChatBot";

const Index = () => {
  const sponsors = [
    { name: "Jane Street", url: "https://www.janestreet.com/" },
    { name: "Carina Initiatives", url: "https://www.carina.fund/" },
    { name: "AIMS Rwanda", url: "https://aims.ac.rw/" },
    { name: "African Olympiad Foundation", url: "https://africanolympiadfoundation.org/" },
  ];

  const universities = [
    { name: "MIT", url: "https://www.mit.edu/" },
    { name: "Harvard", url: "https://www.harvard.edu/" },
    { name: "Carnegie Mellon", url: "https://www.cmu.edu/" },
    { name: "African Leadership University", url: "https://www.alueducation.com/" },
    { name: "Yale", url: "https://www.yale.edu/" },
    { name: "Ashesi", url: "https://www.ashesi.edu.gh/" },
    { name: "Caltech", url: "https://www.caltech.edu/" },
    { name: "Rice", url: "https://www.rice.edu/" },
    { name: "University of Cambridge", url: "https://www.cam.ac.uk/" },
    { name: "UGHE", url: "https://ughe.org/" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with YouTube Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src="https://www.youtube.com/embed/W0pPix0o50c?autoplay=1&mute=1&loop=1&playlist=W0pPix0o50c&controls=0&showinfo=0&modestbranding=1&rel=0"
            className="w-full h-full object-cover"
            style={{ minWidth: '100%', minHeight: '100%' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Empowering Rwanda's Future 
            <span className="block text-yellow-400">STEM Leaders</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
            Identifying and nurturing Rwanda's top mathematics talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link
              to="/about"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Learn More
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              to="/get-involved"
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      {/* Key Highlights Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">35,000+</h3>
              <p className="text-gray-600">Junior students annually</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">50/50</h3>
              <p className="text-gray-600">Gender-balanced participation</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <Trophy className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">90</h3>
              <p className="text-gray-600">Top students selected annually</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <Award className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">First</h3>
              <p className="text-gray-600">Gold Medal at PAMO 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                  alt="Jean M."
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Jean M.</h3>
                  <p className="text-gray-600">Alumni, Class of 2023</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg italic">
                "Thanks to RwMO, I secured a full scholarship at MIT. The program didn't just teach me mathematics—it taught me how to think, solve problems, and believe in myself."
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b332c108?w=150&h=150&fit=crop&crop=face"
                  alt="Teacher Grace U."
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Grace U.</h3>
                  <p className="text-gray-600">Mathematics Teacher</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg italic">
                "This program has helped my students believe they can excel in mathematics. I've watched shy students become confident problem-solvers and future leaders."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Invest Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Invest in Rwanda's Math Olympiad?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-800 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Target className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Scalability</h3>
              <p className="text-blue-100">
                Our proven model can reach every district in Rwanda, creating a nationwide network of mathematical excellence.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-800 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Gender Equity</h3>
              <p className="text-blue-100">
                We're committed to 50/50 gender balance, ensuring equal opportunities for all Rwandan students.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-800 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Partnerships</h3>
              <p className="text-blue-100">
                Strong collaborations with schools, government, and international organizations amplify our impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Our Sponsors
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {sponsors.map((sponsor, index) => (
              <a
                key={index}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-50 p-6 rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow duration-300 h-24"
              >
                <span className="text-gray-700 font-semibold text-center text-sm">
                  {sponsor.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Universities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Where Our Alumni Study
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {universities.map((university, index) => (
              <a
                key={index}
                href={university.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow duration-300 h-20"
              >
                <span className="text-gray-700 font-medium text-center text-xs">
                  {university.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-yellow-500">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-black mb-6">
            Ready to Shape Rwanda's Future?
          </h2>
          <p className="text-xl text-black mb-8">
            Join us in empowering the next generation of STEM leaders
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/get-involved"
              className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300"
            >
              Get Involved Today
            </Link>
            <Link
              to="/contact"
              className="border-2 border-black text-black px-8 py-4 rounded-lg font-semibold hover:bg-black hover:text-white transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Chat Bot */}
      <ChatBot />
    </div>
  );
};

export default Index;
