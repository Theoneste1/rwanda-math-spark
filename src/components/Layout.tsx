
import { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

// Define props interface for Layout component
interface LayoutProps {
  children: ReactNode; // Content to be rendered inside the layout
}

// Main layout component that wraps all pages
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Navigation header - always visible at top */}
      <Navigation />
      
      {/* Main content area - grows to fill available space */}
      <main className="flex-grow pt-16 w-full"> {/* pt-16 accounts for fixed navigation height */}
        <div className="w-full max-w-full overflow-x-hidden">
          {children} {/* Render page-specific content here */}
        </div>
      </main>
      
      {/* Footer - always at bottom */}
      <Footer />
    </div>
  );
};

export default Layout;
