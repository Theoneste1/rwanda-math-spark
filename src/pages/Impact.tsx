import { useState } from "react";
import { ChevronLeft, ChevronRight, Trophy, Users, Target, Award } from "lucide-react";
import Pagination from "../components/common/Pagination";

const Impact = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const kpiData = [
    { kpi: "Total Participants", target2022: "30,000", actual2022: "32,500", target2023: "35,000", actual2023: "37,200" },
    { kpi: "Female Participation (%)", target2022: "45%", actual2022: "48%", target2023: "50%", actual2023: "52%" },
    { kpi: "International Medals", target2022: "2", actual2022: "3", target2023: "3", actual2023: "4" },
    { kpi: "Districts Covered", target2022: "25", actual2022: "30", target2023: "30", actual2023: "30" },
    { kpi: "Teachers Trained", target2022: "200", actual2022: "245", target2023: "300", actual2023: "315" },
  ];

  // Extended success stories with more diverse profiles
  const allSuccessStories = [
    {
      name: "Marie Uwimana",
      achievement: "MIT Scholarship Recipient",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c108?w=300&h=300&fit=crop&crop=face",
      story: "Started as a shy student from Musanze district, Marie's journey through RwMO transformed her into a confident mathematician. She now studies Computer Science at MIT on a full scholarship.",
    },
    {
      name: "David Mukamana",
      achievement: "PAMO Gold Medalist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      story: "David's determination and RwMO's training led him to win Rwanda's first gold medal at the Pan African Mathematical Olympiad in 2024, inspiring a new generation of students.",
    },
    {
      name: "Grace Ingabire",
      achievement: "National Team Captain",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      story: "As team captain, Grace led Rwanda to its best-ever performance at international competitions while maintaining perfect gender balance in leadership roles.",
    },
    {
      name: "Emmanuel Nkurunziza",
      achievement: "Stanford Graduate",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      story: "From RwMO camps to Stanford University, Emmanuel now works at Google as a software engineer, crediting RwMO for teaching him problem-solving skills that extend beyond mathematics.",
    },
    {
      name: "Sarah Uwizeye",
      achievement: "Harvard Medical School",
      image: "https://images.unsplash.com/photo-1559209172-2bf61d31aabb?w=300&h=300&fit=crop&crop=face",
      story: "RwMO's rigorous training in logical thinking prepared Sarah for medical school. She's now pursuing her MD at Harvard, specializing in pediatric surgery.",
    },
    {
      name: "Jean Claude Bizimana",
      achievement: "IMO Bronze Medalist",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
      story: "Jean Claude became the first Rwandan to win a medal at the International Mathematical Olympiad, bringing global recognition to Rwanda's mathematical talent.",
    },
    {
      name: "Aline Mutoni",
      achievement: "Cambridge University Scholar",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=300&fit=crop&crop=face",
      story: "RwMO opened doors to Cambridge University where Aline is pursuing a PhD in Applied Mathematics, focusing on climate modeling for African agriculture.",
    },
    {
      name: "Patrick Nzeyimana",
      achievement: "Tech Entrepreneur",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face",
      story: "After RwMO, Patrick founded a fintech startup in Kigali that now serves over 100,000 users across East Africa, applying mathematical algorithms to financial inclusion.",
    },
    {
      name: "Claudine Uwimana",
      achievement: "UNESCO Program Officer",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
      story: "Claudine now works with UNESCO to promote STEM education across Africa, using her RwMO experience to design programs that have reached over 50,000 students.",
    },
    {
      name: "Felix Habimana",
      achievement: "Oxford DPhil Student",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=300&h=300&fit=crop&crop=face",
      story: "Felix is pursuing his DPhil at Oxford in Mathematical Biology, researching disease modeling. His RwMO background gave him the foundation for complex mathematical research.",
    }
  ];

  const testimonials = [
    {
      name: "Jean Baptiste Nsengimana",
      role: "RwMO Alumni, Stanford University",
      quote: "RwMO didn't just teach me mathematics—it taught me how to think critically, solve complex problems, and believe in the power of perseverance.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Dr. Sarah Mukandoli",
      role: "Mathematics Professor & Former Mentor",
      quote: "Watching these young minds flourish through RwMO has been the most rewarding experience of my career. They're not just solving equations—they're solving tomorrow's challenges.",
      image: "https://images.unsplash.com/photo-1559209172-2bf61d31aabb?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Emmanuel Bizimana",
      role: "Secondary School Principal",
      quote: "RwMO has transformed our school's approach to mathematics. Our students now see math as an adventure, not an obstacle.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    },
  ];

  const [currentSuccessPage, setCurrentSuccessPage] = useState(1);
  const itemsPerPage = 3; // Show 3 stories by default as requested

  // Calculate pagination for success stories
  const totalPages = Math.ceil(allSuccessStories.length / itemsPerPage);
  const startIndex = (currentSuccessPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSuccessStories = allSuccessStories.slice(startIndex, endIndex);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleSuccessPageChange = (page: number) => {
    setCurrentSuccessPage(page);
    // Scroll to success stories section when page changes
    document.getElementById('success-stories')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Measuring Our Impact</h1>
          <p className="text-xl opacity-90">
            Transforming lives, communities, and Rwanda's future through mathematical excellence
          </p>
        </div>
      </section>

      {/* KPI Table */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Key Performance Indicators</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">KPI</th>
                    <th className="px-6 py-4 text-center font-semibold">2022 Target</th>
                    <th className="px-6 py-4 text-center font-semibold">2022 Actual</th>
                    <th className="px-6 py-4 text-center font-semibold">2023 Target</th>
                    <th className="px-6 py-4 text-center font-semibold">2023 Actual</th>
                  </tr>
                </thead>
                <tbody>
                  {kpiData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-6 py-4 font-medium text-gray-800">{row.kpi}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{row.target2022}</td>
                      <td className="px-6 py-4 text-center font-semibold text-green-600">{row.actual2022}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{row.target2023}</td>
                      <td className="px-6 py-4 text-center font-semibold text-green-600">{row.actual2023}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Paginated Success Stories - Updated to show 3 by default */}
      <section id="success-stories" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Success Stories</h2>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover the inspiring journeys of our alumni who have gone on to achieve remarkable success 
            in universities, careers, and leadership roles worldwide.
          </p>
          
          {/* Success stories grid - Now showing 3 stories per page */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {currentSuccessStories.map((story, index) => (
              <div key={startIndex + index} className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  {/* Story number */}
                  <div className="text-sm text-blue-600 font-semibold mb-2">
                    #{startIndex + index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{story.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3 text-sm">{story.achievement}</p>
                  <p className="text-gray-600 text-sm">{story.story}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination for success stories */}
          <Pagination
            currentPage={currentSuccessPage}
            totalPages={totalPages}
            onPageChange={handleSuccessPageChange}
            itemsPerPage={itemsPerPage}
            totalItems={allSuccessStories.length}
            showItemCount={true}
            className="mt-8"
          />
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">What People Say</h2>
          <div className="relative">
            <div className="bg-blue-800 rounded-lg p-8 text-center">
              <img
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].name}
                className="w-20 h-20 rounded-full mx-auto mb-6 object-cover"
              />
              <p className="text-xl italic mb-6">"{testimonials[currentTestimonial].quote}"</p>
              <h3 className="text-lg font-semibold">{testimonials[currentTestimonial].name}</h3>
              <p className="text-blue-200">{testimonials[currentTestimonial].role}</p>
            </div>
            
            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white text-blue-900 rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white text-blue-900 rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentTestimonial ? "bg-white" : "bg-blue-700"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-20 bg-yellow-500">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-black">Impact at a Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Users className="w-16 h-16 text-black mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-black mb-2">37,200</h3>
              <p className="text-black font-semibold">Students Reached</p>
            </div>
            <div className="text-center">
              <Target className="w-16 h-16 text-black mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-black mb-2">52%</h3>
              <p className="text-black font-semibold">Female Participation</p>
            </div>
            <div className="text-center">
              <Trophy className="w-16 h-16 text-black mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-black mb-2">4</h3>
              <p className="text-black font-semibold">International Medals</p>
            </div>
            <div className="text-center">
              <Award className="w-16 h-16 text-black mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-black mb-2">315</h3>
              <p className="text-black font-semibold">Teachers Trained</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;
