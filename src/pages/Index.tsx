
import { Link } from "react-router-dom";
import { ArrowRight, Trophy, Users, BookOpen, Target, Award, Globe } from "lucide-react";

const Index = () => {
  const stats = [
    { icon: Users, label: "Students Reached", value: "35,000+" },
    { icon: Trophy, label: "Districts Covered", value: "30" },
    { icon: Award, label: "Training Camps", value: "90" },
    { icon: Globe, label: "International Competitions", value: "5+" },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Training",
      description: "Intensive residential camps with advanced mathematical training and problem-solving techniques."
    },
    {
      icon: Target,
      title: "Talent Development",
      description: "Identifying and nurturing Rwanda's brightest mathematical minds from across all districts."
    },
    {
      icon: Trophy,
      title: "International Excellence",
      description: "Preparing students for regional and international mathematics competitions like PAMO."
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Rwanda Mathematics <span className="text-yellow-400">Olympiad</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-blue-100 leading-relaxed">
                Empowering Rwanda's future STEM leaders through mathematical excellence and innovation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-yellow-500 text-blue-900 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200 text-base sm:text-lg"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/get-involved"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-200 text-base sm:text-lg"
                >
                  Get Involved
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src="/lovable-uploads/54fd327f-f5c3-41fe-9b5b-be85e246227a.png"
                alt="Mathematics Olympiad Students"
                className="w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600 leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
              Our Impact
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover how we're transforming mathematical education across Rwanda
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <feature.icon className="w-10 sm:w-12 h-10 sm:h-12 text-blue-600 mb-4 sm:mb-6" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Highlight */}
      <section className="py-12 sm:py-16 lg:py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <img
                src="/lovable-uploads/5a495ba1-4710-4fdf-91f1-2d1334030d5c.png"
                alt="Gold Medal Achievement"
                className="w-full max-w-md mx-auto lg:mx-0 rounded-lg shadow-2xl"
              />
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                Historic Achievement
              </h2>
              <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-blue-100 leading-relaxed">
                In 2024, Rwanda made history by winning our first Gold Medal at the Pan African Mathematical Olympiad (PAMO), marking a significant milestone in our mathematical journey.
              </p>
              <Link
                to="/impact"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-yellow-500 text-blue-900 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200 text-base sm:text-lg"
              >
                View Our Impact
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
            Join the Mathematical Revolution
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            Be part of Rwanda's mathematical excellence journey. Whether you're a student, teacher, or supporter, there's a place for you in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link
              to="/get-involved"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-base sm:text-lg"
            >
              Get Involved
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200 text-base sm:text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
