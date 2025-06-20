
import { useState } from "react";
import { DollarSign, GraduationCap, Building, CheckCircle } from "lucide-react";

const GetInvolved = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    sponsorshipType: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "", sponsorshipType: "" });
    }, 3000);
  };

  const sponsorshipOptions = [
    {
      title: "Sponsor a Student",
      amount: "$500/year",
      icon: GraduationCap,
      description: "Provide full support for one student's training, materials, and competition participation.",
      benefits: [
        "Direct impact on one student's mathematical journey",
        "Regular updates on student progress",
        "Invitation to graduation ceremonies",
        "Tax-deductible contribution"
      ]
    },
    {
      title: "Sponsor a Teacher",
      amount: "$1,500/year",
      icon: Building,
      description: "Fund professional development and training for mathematics teachers.",
      benefits: [
        "Enhance teaching quality across multiple schools",
        "Access to training reports and outcomes",
        "Recognition in program materials",
        "Multiplied impact through improved instruction"
      ]
    },
    {
      title: "Host a Camp",
      amount: "$10,000",
      icon: DollarSign,
      description: "Sponsor an entire training camp for our top 90 students.",
      benefits: [
        "Your organization's name on the camp",
        "VIP access to camp activities and ceremonies",
        "Media coverage and PR opportunities",
        "Direct interaction with Rwanda's brightest minds"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-900 to-blue-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Get Involved</h1>
          <p className="text-xl opacity-90">
            Join us in empowering Rwanda's next generation of STEM leaders
          </p>
        </div>
      </section>

      {/* Sponsorship Options */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Sponsorship Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sponsorshipOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 text-center">
                  <option.icon className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{option.title}</h3>
                  <p className="text-3xl font-bold">{option.amount}</p>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6">{option.description}</p>
                  <ul className="space-y-3">
                    {option.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Start Your Partnership</h2>
          
          {isSubmitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Thank you for your interest!</h3>
              <p>We'll be in touch within 24 hours to discuss how we can work together.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="sponsorshipType" className="block text-sm font-medium text-gray-700 mb-2">
                  Sponsorship Interest
                </label>
                <select
                  id="sponsorshipType"
                  name="sponsorshipType"
                  value={formData.sponsorshipType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                >
                  <option value="">Select a sponsorship option</option>
                  <option value="student">Sponsor a Student ($500/year)</option>
                  <option value="teacher">Sponsor a Teacher ($1,500/year)</option>
                  <option value="camp">Host a Camp ($10,000)</option>
                  <option value="custom">Custom Partnership</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Tell us about your organization and how you'd like to get involved..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Donation Links */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Make an Impact?</h2>
          <p className="text-xl mb-8 opacity-90">
            Choose your preferred way to support Rwanda's mathematical excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://donate.rwandaolympiad.rw"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-300"
            >
              Donate Online
            </a>
            <a
              href="https://corporate.rwandaolympiad.rw"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300"
            >
              Corporate Partnerships
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
