
import { Mail, Linkedin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Team = () => {
  const teamMembers = [
    {
      id: "theoneste-sanzabarinda",
      name: "Theoneste Sanzabarinda",
      role: "National Coordinator",
      image: "/lovable-uploads/ad410bb8-b1e7-4597-8b81-c8ca068bb15b.png",
      bio: "Leading Rwanda's mathematical excellence journey with passion and dedication to nurturing young mathematical minds.",
      email: "theoneste.sanzabarinda@aims.ac.rw",
      linkedin: "https://linkedin.com/in/theoneste-sanzabarinda"
    },
    {
      id: "obed-nsanzimfura",
      name: "Obed Nsanzimfura",
      role: "Program Manager",
      image: "/lovable-uploads/b075c570-24b9-4af5-9c85-ee3ca13412df.png",
      bio: "Overseeing training programs and international competition preparations with a focus on excellence and inclusivity.",
      email: "obed.nsanzimfura@aims.ac.rw",
      linkedin: "https://linkedin.com/in/obed-nsanzimfura"
    },
    {
      id: "jean-baptiste-niyibizi",
      name: "Jean Baptiste Niyibizi",
      role: "Senior Coach",
      image: "/lovable-uploads/c68a1031-acb9-47de-a1ee-057ba9d2c255.png",
      bio: "Experienced mathematics educator specializing in competition training and advanced problem-solving techniques.",
      email: "jean.niyibizi@aims.ac.rw",
      linkedin: "https://linkedin.com/in/jean-niyibizi"
    },
    {
      id: "marie-claire-uwimana",
      name: "Marie Claire Uwimana",
      role: "Training Coordinator",
      image: "/lovable-uploads/cc887979-9afc-423c-bdc6-202b2585112a.png",
      bio: "Coordinating training camps and ensuring gender balance in mathematical education across Rwanda.",
      email: "marie.uwimana@aims.ac.rw",
      linkedin: "https://linkedin.com/in/marie-uwimana"
    },
    {
      id: "david-mutimura",
      name: "David Mutimura",
      role: "Regional Coordinator",
      image: "/lovable-uploads/9341434d-7938-45f8-aeb3-1d41bf781299.png",
      bio: "Managing district-level competitions and identifying talented students across all 30 districts of Rwanda.",
      email: "david.mutimura@aims.ac.rw",
      linkedin: "https://linkedin.com/in/david-mutimura"
    },
    {
      id: "alice-mukamana",
      name: "Alice Mukamana",
      role: "Education Specialist",
      image: "/lovable-uploads/ecda7b10-e626-4cd7-a151-f7d0b549d327.png",
      bio: "Developing curriculum and training materials for mathematics teachers and student participants.",
      email: "alice.mukamana@aims.ac.rw",
      linkedin: "https://linkedin.com/in/alice-mukamana"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 to-purple-700 text-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
              Our Team
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Meet the dedicated professionals behind Rwanda's mathematical excellence journey
            </p>
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm sm:text-base text-purple-600 font-semibold mb-3 sm:mb-4">
                    {member.role}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                    {member.bio}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center justify-center text-xs sm:text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200 py-2 px-3 bg-gray-100 rounded-md hover:bg-purple-50"
                    >
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="truncate">Email</span>
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center text-xs sm:text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200 py-2 px-3 bg-gray-100 rounded-md hover:bg-purple-50"
                    >
                      <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                  
                  <div className="mt-4">
                    <Link
                      to={`/team/${member.id}`}
                      className="inline-flex items-center text-xs sm:text-sm text-purple-600 hover:text-purple-800 transition-colors duration-200 font-medium"
                    >
                      View Profile
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-12 sm:py-16 lg:py-20 bg-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
            Join Our Team
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            We're always looking for passionate mathematicians, educators, and professionals to join our mission of nurturing Rwanda's mathematical talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link
              to="/get-involved"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 text-sm sm:text-base"
            >
              Get Involved
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors duration-200 text-sm sm:text-base"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
