
import { Link } from "react-router-dom";
import { Mail, Linkedin } from "lucide-react";

const Team = () => {
  const teamMembers = [
    {
      name: "Alice Uwase",
      role: "Camp Coordinator",
      slug: "alice-uwase",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c108?w=400&h=400&fit=crop&crop=face",
      description: "Coordinates national training camps and manages student development programs.",
    },
    {
      name: "Boris Habimana",
      role: "Training Lead",
      slug: "boris-habimana",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      description: "Designs curriculum and leads advanced mathematical training sessions.",
    },
    {
      name: "Claudine Mutesi",
      role: "Outreach Manager",
      slug: "claudine-mutesi",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      description: "Manages community outreach and partnerships with schools across Rwanda.",
    },
    {
      name: "Emmanuel Nshimiyimana",
      role: "Logistics",
      slug: "emmanuel-nshimiyimana",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      description: "Handles operations, logistics, and administrative coordination.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-blue-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Meet Our Team</h1>
          <p className="text-xl opacity-90">
            Passionate educators and leaders dedicated to nurturing Rwanda's mathematical talent
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Link
                key={index}
                to={`/team/${member.slug}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                  <div className="mt-4 flex items-center text-blue-600 font-semibold">
                    <span>Learn more</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Excellence</h3>
              <p className="text-gray-600">
                We strive for the highest standards in mathematical education and student development.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Collaboration</h3>
              <p className="text-gray-600">
                Working together with schools, communities, and international partners for greater impact.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚖️</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Equity</h3>
              <p className="text-gray-600">
                Ensuring equal opportunities for all students, regardless of background or gender.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8">
            Are you passionate about mathematics education and youth development? We're always looking for talented individuals to join our team.
          </p>
          <Link
            to="/contact"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-block"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Team;
