
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Navigation = () => {
  // State for mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);
  // State for tracking which dropdown is currently active
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  // Hook to get current page location for active link highlighting
  const location = useLocation();

  // Navigation menu items configuration
  const navItems = [
    { name: "Home", path: "/" },
    { 
      name: "About", 
      path: "/about",
      // Submenu items for About section
      submenu: [
        { name: "About Us", path: "/about" },
        { name: "Team", path: "/team" }
      ]
    },
    { name: "Impact", path: "/impact" },
    { 
      name: "Competitions", 
      path: "/competitions",
      // Submenu items for Competitions section
      submenu: [
        { name: "Competition Platform", path: "/competition" },
        { name: "Campers", path: "/competitions/campers" },
        { name: "Results", path: "/competitions/results" }
      ]
    },
    { name: "Get Involved", path: "/get-involved" },
    { name: "Contact", path: "/contact" },
  ];

  // Function to check if current page matches the given path
  const isActive = (path: string) => location.pathname === path;
  
  // Function to check if any submenu item is active
  const hasActiveSubmenu = (submenu: any[]) => submenu?.some(item => isActive(item.path));

  // Function to toggle dropdown menus in mobile view
  const toggleDropdown = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo section - Improved mobile sizing */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img 
              src="/lovable-uploads/0115baec-ea29-4a53-b52e-009316b8fed0.png" 
              alt="Rwanda Mathematics Olympiad" 
              className="h-10 sm:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex space-x-4 xl:space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {/* Check if item has submenu */}
                {item.submenu ? (
                  <div>
                    {/* Dropdown trigger button */}
                    <button
                      className={`px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1 whitespace-nowrap ${
                        isActive(item.path) || hasActiveSubmenu(item.submenu)
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                      onMouseEnter={() => setActiveDropdown(item.name)}
                    >
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div 
                      className="absolute left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="py-2">
                        {/* Render submenu items */}
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                              isActive(subItem.path)
                                ? "text-blue-600 bg-blue-50"
                                : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Regular navigation link without dropdown
                  <Link
                    to={item.path}
                    className={`px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                      isActive(item.path)
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu hamburger button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 p-2"
            >
              {/* Toggle between hamburger and X icon */}
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - only shown when isOpen is true */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t max-h-screen overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.name}>
                {/* Check if item has submenu for mobile */}
                {item.submenu ? (
                  <div>
                    {/* Mobile dropdown trigger */}
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                        isActive(item.path) || hasActiveSubmenu(item.submenu)
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.name}
                      {/* Rotating chevron icon */}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`} />
                    </button>
                    
                    {/* Mobile Submenu - only shown when this dropdown is active */}
                    {activeDropdown === item.name && (
                      <div className="pl-4 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            onClick={() => setIsOpen(false)} // Close mobile menu when link is clicked
                            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                              isActive(subItem.path)
                                ? "text-blue-600 bg-blue-50"
                                : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Regular mobile navigation link
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)} // Close mobile menu when link is clicked
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive(item.path)
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
