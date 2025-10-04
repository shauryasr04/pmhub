import React from 'react';
import { Brain, BookOpen, Users, Calendar } from 'lucide-react';

interface NavbarProps {
  onNavigateToInterviewPrep: () => void;
  onNavigateToNetworking: () => void;
  onNavigateToTimelines: () => void;
  onNavigateToHome?: () => void;
  currentPage?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  onNavigateToInterviewPrep,
  onNavigateToNetworking,
  onNavigateToTimelines,
  onNavigateToHome,
  currentPage
}) => {
  const getNavItemClass = (page: string) => {
    const baseClass = "px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center";
    const isActive = currentPage === page;
    
    if (isActive) {
      return `${baseClass} text-primary-600 bg-primary-50`;
    }
    
    return `${baseClass} text-gray-600 hover:text-primary-600 hover:bg-gray-50`;
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={onNavigateToHome}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <div className="bg-primary-600 p-2 rounded-full mr-3">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PM Hub</span>
            </button>
          </div>
          
          {/* Navigation Links */}
          <div className="flex space-x-2">
            <button
              onClick={onNavigateToInterviewPrep}
              className={getNavItemClass('interview-prep')}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Interview Prep
            </button>
            <button
              onClick={onNavigateToNetworking}
              className={getNavItemClass('networking')}
            >
              <Users className="w-4 h-4 mr-2" />
              Networking Guide
            </button>
            <button
              onClick={onNavigateToTimelines}
              className={getNavItemClass('timelines')}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Recruiting Timelines
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
