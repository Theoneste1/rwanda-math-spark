
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, Linkedin, Phone } from "lucide-react";

const TeamMember = () => {
  const { memberName } = useParams();

  const teamData: Record<string, any> = {
    "alice-uwase": {
      name: "Alice Uwase",
      role: "Camp Coordinator",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c108?w=600&h=600&fit=crop&crop=face",
      bio: "Alice brings over 8 years of experience in educational program management and youth development. She holds a Master's degree in Mathematics Education from the University of Rwanda and has been instrumental in designing our national training camp curriculum. Under her leadership, camp participation has grown by 300% while maintaining our commitment to gender parity.",
      background: "Before joining RwMO, Alice worked as a senior mathematics teacher at Lycée de Kigali, where she mentored numerous students who went on to excel in national competitions. She is passionate about creating inclusive learning environments where every student can thrive.",
      achievements: [
        "Designed the comprehensive training camp curriculum used nationwide",
        "Increased camp enrollment from 30 to 90 students annually",
        "Maintained 50/50 gender balance in all programs",
        "Trained over 50 camp counselors and assistant coordinators"
      ],
      contact: {
        email: "alice.uwase@rwandaolympiad.rw",
        phone: "+250 788 123 001",
        linkedin: "https://linkedin.com/in/alice-uwase"
      }
    },
    "boris-habimana": {
      name: "Boris Habimana",
      role: "Training Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face",
      bio: "Boris is a distinguished mathematician with a PhD in Pure Mathematics from the University of Cape Town. He has represented Rwanda at multiple international mathematical conferences and has published over 15 research papers in peer-reviewed journals. His expertise spans number theory, combinatorics, and olympiad-style problem solving.",
      background: "With 12 years of experience in mathematical education and competition training, Boris has coached teams that have won medals at regional and continental competitions. He is known for his innovative teaching methods that make complex mathematical concepts accessible to young learners.",
      achievements: [
        "Led Rwanda to its first gold medal at PAMO 2024",
        "Developed advanced problem-solving curricula for gifted students",
        "Mentored 15 students who received international university scholarships",
        "Authored 'Advanced Problem Solving for Young Mathematicians' textbook"
      ],
      contact: {
        email: "boris.habimana@rwandaolympiad.rw",
        phone: "+250 788 123 002",
        linkedin: "https://linkedin.com/in/boris-habimana"
      }
    },
    "claudine-mutesi": {
      name: "Claudine Mutesi",
      role: "Outreach Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop&crop=face",
      bio: "Claudine is a dynamic community engagement specialist with a background in educational outreach and partnership development. She holds a Bachelor's degree in Social Sciences and has extensive experience working with schools, communities, and government institutions across Rwanda.",
      background: "Her passion for educational equity drives her work in ensuring that RwMO reaches students in all corners of Rwanda, including rural and underserved communities. She has built strong relationships with over 200 schools and educational institutions nationwide.",
      achievements: [
        "Established partnerships with all 30 district education offices",
        "Increased rural student participation by 400%",
        "Developed mobile outreach programs reaching remote schools",
        "Secured sponsorships worth over $500,000 for student programs"
      ],
      contact: {
        email: "claudine.mutesi@rwandaolympiad.rw",
        phone: "+250 788 123 003",
        linkedin: "https://linkedin.com/in/claudine-mutesi"
      }
    },
    "emmanuel-nshimiyimana": {
      name: "Emmanuel Nshimiyimana",
      role: "Logistics",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop&crop=face",
      bio: "Emmanuel is an experienced operations manager with a talent for coordinating complex educational programs. He holds a degree in Business Administration and has over 10 years of experience in event management and educational logistics. His attention to detail ensures that all RwMO activities run smoothly and efficiently.",
      background: "Emmanuel's expertise in logistics and operations has been crucial to RwMO's growth and success. He manages everything from camp accommodations and transportation to competition venues and international travel arrangements for our teams.",
      achievements: [
        "Successfully coordinated logistics for 50+ national competitions",
        "Managed international travel for teams to 8 different countries",
        "Streamlined operations reducing program costs by 25%",
        "Implemented digital systems improving efficiency by 60%"
      ],
      contact: {
        email: "emmanuel.n@rwandaolympiad.rw",
        phone: "+250 788 123 004",
        linkedin: "https://linkedin.com/in/emmanuel-nshimiyimana"
      }
    },
    "theoneste-nsanzabarinda": {
      name: "Theoneste Nsanzabarinda",
      role: "Program Support Officer",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=600&fit=crop&crop=face",
      bio: "Theoneste Nsanzabarinda is a dedicated computer science graduate of African Leadership University, and a Millennium Fellow. Throughout his career, he has worked on various web and software development projects, gaining experience in full-stack engineering.",
      background: "In his role as Program Support Officer for the Rwanda Mathematics Olympiad, Theoneste mentors high school students preparing for national and international math competitions and organizes Olympiad training programs. His passion lies in fostering problem-solving skills and nurturing the next generation of mathematicians and technologists. Outside of his Olympiad work, Theoneste enjoys competitive programming and creating tools that improve learning experiences.",
      achievements: [
        "Mentored over 100 high school students in math competitions",
        "Developed digital training platforms for remote learning",
        "Led organizing committee for 3 national math competitions",
        "Created automated scoring systems for olympiad contests"
      ],
      contact: {
        email: "theoneste@rwandaolympiad.rw",
        phone: "+250 788 123 005",
        linkedin: "https://linkedin.com/in/theoneste-nsanzabarinda"
      }
    },
    "obed-kor-nsanzimfura": {
      name: "Obed Kor Nsanzimfura",
      role: "Program Manager",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=600&fit=crop&crop=face",
      bio: "Obed Kor Nsanzimfura is the Program Manager for the Rwanda Mathematics Olympiad, where he oversees national competitions, training camps, and Olympiad team selection. Under his leadership, Rwanda's math teams have participated successfully at prestigious international competitions, including PAMO and the IMO, earning medals and honorable mentions.",
      background: "In addition to his Olympiad responsibilities, Obed is an experienced math coach and volunteer mentor who enjoys guiding students through challenging math concepts. His technical background as a full-stack developer and data analyst allows him to contribute creatively to Olympiad operations, problem databases, and training tools. Obed is deeply committed to cultivating mathematical excellence in Rwanda and supporting the next generation of problem solvers.",
      achievements: [
        "Led Rwanda to first-ever IMO participation in 2023",
        "Coordinated training camps for over 200 students annually",
        "Developed comprehensive problem database with 1000+ questions",
        "Established partnerships with international math organizations"
      ],
      contact: {
        email: "obed@rwandaolympiad.rw",
        phone: "+250 788 123 006",
        linkedin: "https://linkedin.com/in/obed-kor-nsanzimfura"
      }
    }
  };

  const member = teamData[memberName || ""];

  if (!member) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Team Member Not Found</h1>
          <Link to="/team" className="text-blue-600 hover:text-blue-800 font-semibold">
            ← Back to Team
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            to="/team"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Team
          </Link>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-96 md:h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{member.name}</h1>
                <p className="text-2xl text-blue-600 font-semibold mb-6">{member.role}</p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-3" />
                    <a href={`mailto:${member.contact.email}`} className="hover:text-blue-600 transition-colors duration-200">
                      {member.contact.email}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 mr-3" />
                    <span>{member.contact.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Linkedin className="w-5 h-5 mr-3" />
                    <a 
                      href={member.contact.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors duration-200"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Biography</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{member.bio}</p>
              <p className="text-gray-600 leading-relaxed">{member.background}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Achievements</h2>
              <ul className="space-y-3">
                {member.achievements.map((achievement: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-blue-600 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-blue-900 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl mb-6 opacity-90">
              Have questions about {member.name.split(' ')[0]}'s work or want to collaborate?
            </p>
            <a
              href={`mailto:${member.contact.email}`}
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-block"
            >
              Send an Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamMember;
