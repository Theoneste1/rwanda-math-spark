
import { Trophy, Users, BookOpen, Target, Award, Globe } from "lucide-react";

const Impact = () => {
  const achievements = [
    {
      year: "2024",
      title: "First Gold Medal at PAMO",
      description: "Rwanda achieved its first Gold Medal at the Pan African Mathematical Olympiad, marking a historic milestone in our mathematical journey.",
      image: "/lovable-uploads/5a495ba1-4710-4fdf-91f1-2d1334030d5c.png"
    },
    {
      year: "2023",
      title: "National Expansion",
      description: "Extended our reach to all 30 districts of Rwanda, engaging over 35,000 students in mathematical competitions.",
      image: "/lovable-uploads/54fd327f-f5c3-41fe-9b5b-be85e246227a.png"
    },
    {
      year: "2022",
      title: "Gender Parity Achievement",
      description: "Successfully achieved 50/50 gender balance in our national training camps, promoting inclusive mathematical education.",
      image: "/lovable-uploads/17cc90d2-2994-4d96-8763-249e19c98daf.png"
    }
  ];

  const stats = [
    { icon: Users, label: "Students Reached Annually", value: "35,000+", color: "text-blue-600" },
    { icon: Trophy, label: "Districts Covered", value: "30", color: "text-green-600" },
    { icon: Award, label: "Training Camp Participants", value: "90", color: "text-purple-600" },
    { icon: Globe, label: "International Competitions", value: "5+", color: "text-orange-600" },
    { icon: BookOpen, label: "Teachers Trained", value: "200+", color: "text-red-600" },
    { icon: Target, label: "Schools Participating", value: "500+", color: "text-indigo-600" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
              Our Impact
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Transforming mathematical education across Rwanda and achieving excellence on the international stage
            </p>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12 lg:mb-16">
            By the Numbers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <stat.icon className={`w-10 sm:w-12 h-10 sm:h-12 ${stat.color} mb-4 sm:mb-6`} />
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-600 leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Timeline */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12 lg:mb-16">
            Major Achievements
          </h2>
          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            {achievements.map((achievement, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                <div className="w-full lg:w-1/2">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full max-w-md mx-auto lg:mx-0 rounded-lg shadow-xl"
                  />
                </div>
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                  <div className="bg-blue-600 text-white text-sm sm:text-base font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded-full inline-block mb-3 sm:mb-4">
                    {achievement.year}
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                    {achievement.title}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International Recognition */}
      <section className="py-12 sm:py-16 lg:py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
              International Recognition
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed">
              Rwanda's participation in international mathematical competitions has brought recognition to our nation and inspired a new generation of mathematicians.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="bg-blue-800 p-4 sm:p-6 rounded-lg">
                <Trophy className="w-8 sm:w-10 h-8 sm:h-10 text-yellow-400 mx-auto mb-3 sm:mb-4" />
                <div className="text-lg sm:text-xl font-bold mb-2">PAMO</div>
                <div className="text-xs sm:text-sm text-blue-200">Pan African Mathematical Olympiad</div>
              </div>
              <div className="bg-blue-800 p-4 sm:p-6 rounded-lg">
                <Award className="w-8 sm:w-10 h-8 sm:h-10 text-yellow-400 mx-auto mb-3 sm:mb-4" />
                <div className="text-lg sm:text-xl font-bold mb-2">IMO</div>
                <div className="text-xs sm:text-sm text-blue-200">International Mathematical Olympiad</div>
              </div>
              <div className="bg-blue-800 p-4 sm:p-6 rounded-lg">
                <Globe className="w-8 sm:w-10 h-8 sm:h-10 text-yellow-400 mx-auto mb-3 sm:mb-4" />
                <div className="text-lg sm:text-xl font-bold mb-2">EGMO</div>
                <div className="text-xs sm:text-sm text-blue-200">European Girls' Mathematical Olympiad</div>
              </div>
              <div className="bg-blue-800 p-4 sm:p-6 rounded-lg">
                <Target className="w-8 sm:w-10 h-8 sm:h-10 text-yellow-400 mx-auto mb-3 sm:mb-4" />
                <div className="text-lg sm:text-xl font-bold mb-2">Regional</div>
                <div className="text-xs sm:text-sm text-blue-200">East African Competitions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Goals */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 sm:mb-8">
              Looking Forward
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed">
              Our vision extends beyond current achievements. We're committed to establishing Rwanda as a regional mathematical powerhouse and continuing to inspire young minds across Africa.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-gray-50 p-6 sm:p-8 rounded-lg">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                  Expand Reach
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Increase participation to 50,000 students annually by 2026
                </p>
              </div>
              <div className="bg-gray-50 p-6 sm:p-8 rounded-lg">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                  Teacher Development
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Train 500+ mathematics teachers in advanced problem-solving
                </p>
              </div>
              <div className="bg-gray-50 p-6 sm:p-8 rounded-lg">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                  International Excellence
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Achieve consistent top-10 rankings in international competitions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;
