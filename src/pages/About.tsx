
import { Calendar, Users, Trophy, BookOpen } from "lucide-react";

const About = () => {
  const timeline = [
    { year: "2024", event: "First Gold Medal at PAMO", description: "Historic achievement marking Rwanda's excellence" },
    { year: "2023", event: "National Training Camp Expansion", description: "Increased capacity to 90 top students" },
    { year: "2022", event: "Gender Parity Achievement", description: "Reached 50/50 gender balance in participation" },
    { year: "2021", event: "Rwanda Mathematics Olympiad Founded", description: "Launched with support from Ministry of Education" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
            About Rwanda Mathematics Olympiad
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed">
            Discovering and nurturing Rwanda's brightest mathematical minds through rigorous competition and comprehensive training programs.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Our Mission</h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                To identify, develop, and celebrate exceptional mathematical talent across Rwanda, creating pathways for students to excel in STEM fields and contribute to our nation's technological advancement.
              </p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Our Vision</h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                To establish Rwanda as a regional leader in mathematical education and competition, producing world-class mathematicians who drive innovation and scientific progress globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Format */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-gray-800">
            Competition Format
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 sm:p-6 rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">District Rounds</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Initial competitions held in all 30 districts, engaging over 35,000 junior students annually in mathematical problem-solving.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 sm:p-6 rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">National Selection</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Top performers advance to national level competitions, where the best 90 students are selected for intensive training camps.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 sm:p-6 rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">Training Camps</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Intensive residential camps provide advanced mathematical training, preparing students for international competitions like PAMO.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-gray-800">
            Our Journey
          </h2>
          <div className="space-y-6 sm:space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-start">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center font-bold text-sm sm:text-base mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                  {item.year}
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg flex-grow w-full">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">{item.event}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher Training */}
      <section className="py-12 sm:py-16 lg:py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Teacher & Coach Training</h2>
              <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 leading-relaxed">
                We believe that excellent students need excellent teachers. Our comprehensive training programs ensure educators across Rwanda are equipped with the latest mathematical pedagogy and problem-solving techniques.
              </p>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-xs sm:text-sm">✓</span>
                  </div>
                  <span className="text-sm sm:text-base">Quarterly professional development workshops</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-xs sm:text-sm">✓</span>
                  </div>
                  <span className="text-sm sm:text-base">Access to international mathematical resources</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-xs sm:text-sm">✓</span>
                  </div>
                  <span className="text-sm sm:text-base">Mentorship from international mathematics experts</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-700 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-xs sm:text-sm">✓</span>
                  </div>
                  <span className="text-sm sm:text-base">Certification in advanced problem-solving methods</span>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
                alt="Teacher training session"
                className="w-full max-w-md rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
