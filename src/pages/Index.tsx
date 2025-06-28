
import { Link } from "react-router-dom";
import { ChevronRight, Users, Trophy, Target, Award } from "lucide-react";
import ChatBot from "../components/ChatBot";
import Carousel from "../components/common/Carousel";

const Index = () => {
  // Extended success stories data with different types of people
  const successStories = [
    {
      id: "1",
      name: "Jean Baptiste Nsengimana",
      role: "Alumni - Stanford University",
      quote: "RwMO didn't just teach me mathematics—it taught me how to think critically, solve complex problems, and believe in the power of perseverance. The program shaped my entire academic journey.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "2",
      name: "Grace Uwimana",
      role: "Current Student - S6",
      quote: "Being part of RwMO has opened doors I never imagined. The training camps, mentorship, and competitions have prepared me for university applications to top institutions worldwide.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c108?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "3",
      name: "Dr. Sarah Mukandoli",
      role: "Mathematics Teacher & Mentor",
      quote: "Watching these young minds flourish through RwMO has been the most rewarding experience of my career. They're not just solving equations—they're solving tomorrow's challenges.",
      image: "https://images.unsplash.com/photo-1559209172-2bf61d31aabb?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "4",
      name: "Emmanuel Bizimana",
      role: "Program Manager",
      quote: "Managing RwMO has shown me the incredible potential of Rwandan youth. Every year, we see students exceed expectations and compete at the highest international levels.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "5",
      name: "Marie Uwimana",
      role: "Alumni - MIT Scholar",
      quote: "From a shy student in Musanze to MIT—RwMO made this journey possible. The program doesn't just teach math; it builds confidence and opens global opportunities.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "6",
      name: "David Mukamana",
      role: "PAMO Gold Medalist",
      quote: "Winning Rwanda's first gold medal at PAMO was a dream come true. RwMO's rigorous training and support system made it possible to compete with the best in Africa.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const sponsors = [
    { name: "Jane Street", url: "https://www.janestreet.com/" },
    { name: "Carina Initiatives", url: "https://www.carina.fund/", logo: "/lovable-uploads/54fd327f-f5c3-41fe-9b5b-be85e246227a.png" },
    { name: "AIMS Rwanda", url: "https://aims.ac.rw/", logo: "/lovable-uploads/4b9719bb-905e-4daa-b406-6d19562edd83.png" },
    { name: "African Olympiad Foundation", url: "https://africanolympiadfoundation.org/" },
  ];

  const universities = [
    { name: "MIT", url: "https://www.mit.edu/", logo: "/lovable-uploads/c68a1031-acb9-47de-a1ee-057ba9d2c255.png" },
    { name: "Harvard", url: "https://www.harvard.edu/", logo: "/lovable-uploads/3b465dad-8059-4e8c-acc8-fcee7a6653cd.png" },
    { name: "Yale", url: "https://www.yale.edu/", logo: "/lovable-uploads/ad410bb8-b1e7-4597-8b81-c8ca068bb15b.png" },
    { name: "African Leadership University", url: "https://www.alueducation.com/", logo: "/lovable-uploads/5a495ba1-4710-4fdf-91f1-2d1334030d5c.png" },
    { name: "Ashesi", url: "https://www.ashesi.edu.gh/", logo: "/lovable-uploads/87a9489c-9a9d-4a03-bb95-34d2efab464b.png" },
    { name: "Caltech", url: "https://www.caltech.edu/", logo: "/lovable-uploads/9341434d-7938-45f8-aeb3-1d41bf781299.png" },
    { name: "Rice", url: "https://www.rice.edu/", logo: "/lovable-uploads/ecda7b10-e626-4cd7-a151-f7d0b549d327.png" },
    { name: "University of Cambridge", url: "https://www.cam.ac.uk/", logo: "/lovable-uploads/cc887979-9afc-423c-bdc6-202b2585112a.png" },
    { name: "Carnegie Mellon", url: "https://www.cmu.edu/" },
    { name: "UGHE", url: "https://ughe.org/", logo: "/lovable-uploads/fe28381d-f15e-4390-8df4-fcafd2bf8079.png" },
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

      {/* Success Stories Carousel Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Success Stories
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Hear from our diverse community of students, alumni, teachers, and program managers 
            who have been part of the Rwanda Mathematics Olympiad journey.
          </p>
          
          {/* Manual-only carousel showing 2 stories at a time */}
          <Carousel 
            items={successStories} 
            autoPlay={false} // Disabled auto-scroll as requested
            showArrows={true}
            itemsPerView={2} // Show 2 stories at a time as requested
            className="mb-8"
          />
        </div>
      </section>

      {/* Why Get Involved Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Get Involved with Rwanda's Math Olympiad?
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
                {sponsor.logo ? (
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-700 font-semibold text-center text-sm">
                    {sponsor.name}
                  </span>
                )}
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {universities.map((university, index) => (
              <a
                key={index}
                href={university.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow duration-300 h-32"
              >
                <img
                  src={university.logo}
                  alt={university.name}
                  className="max-w-full max-h-full object-contain"
                />
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
