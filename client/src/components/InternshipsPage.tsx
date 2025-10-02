import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  MapPin, 
  Calendar, 
  Building, 
  Search, 
  Filter,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowLeft
} from 'lucide-react';

interface Internship {
  id: string;
  company: string;
  position: string;
  location: string;
  type: string; // 'Full-time', 'Part-time', 'Contract', 'Internship'
  duration: string;
  description: string;
  requirements: string[];
  benefits: string[];
  applicationDeadline: string;
  applicationLink: string;
  postedDate: string;
  status: 'active' | 'expired' | 'coming-soon';
}

interface InternshipsPageProps {
  onBack?: () => void;
}

const InternshipsPage: React.FC<InternshipsPageProps> = ({ onBack }) => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');

  // Mock data for demonstration (replace with actual API call)
  const mockInternships: Internship[] = [
    {
      id: '1',
      company: 'Google',
      position: 'Product Management Intern',
      location: 'Mountain View, CA',
      type: 'Internship',
      duration: '12 weeks',
      description: 'Join Google\'s Product Management team and work on products used by billions of people worldwide. You\'ll collaborate with engineers, designers, and other PMs to define product strategy and drive execution.',
      requirements: [
        'Currently pursuing a Bachelor\'s or Master\'s degree',
        'Strong analytical and problem-solving skills',
        'Experience with data analysis tools (SQL, Excel)',
        'Excellent communication and collaboration skills',
        'Previous internship or project experience preferred'
      ],
      benefits: [
        'Competitive compensation',
        'Mentorship from senior PMs',
        'Access to Google\'s learning resources',
        'Networking opportunities',
        'Potential for full-time conversion'
      ],
      applicationDeadline: '2024-03-15',
      applicationLink: 'https://careers.google.com/jobs/results/',
      postedDate: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      company: 'Microsoft',
      position: 'Product Manager Intern',
      location: 'Seattle, WA',
      type: 'Internship',
      duration: '10 weeks',
      description: 'Work on Microsoft\'s cloud and productivity products. Gain hands-on experience in product strategy, user research, and cross-functional collaboration.',
      requirements: [
        'Pursuing degree in Business, Engineering, or related field',
        'Passion for technology and innovation',
        'Strong analytical thinking',
        'Experience with user research methods',
        'Previous product or project management experience'
      ],
      benefits: [
        'Mentorship program',
        'Professional development workshops',
        'Competitive salary and housing stipend',
        'Access to Microsoft\'s product suite',
        'Career development opportunities'
      ],
      applicationDeadline: '2024-03-20',
      applicationLink: 'https://careers.microsoft.com/us/en/',
      postedDate: '2024-01-20',
      status: 'active'
    },
    {
      id: '3',
      company: 'Meta',
      position: 'Product Management Intern - Reality Labs',
      location: 'Menlo Park, CA',
      type: 'Internship',
      duration: '12 weeks',
      description: 'Join Meta\'s Reality Labs team and work on the future of augmented and virtual reality. Help shape products that will define the next generation of computing.',
      requirements: [
        'Currently enrolled in university',
        'Strong technical background',
        'Passion for AR/VR technology',
        'Experience with product development',
        'Excellent communication skills'
      ],
      benefits: [
        'Cutting-edge technology exposure',
        'Mentorship from industry leaders',
        'Competitive compensation package',
        'Access to Meta\'s internal tools',
        'Networking with top talent'
      ],
      applicationDeadline: '2024-03-10',
      applicationLink: 'https://www.metacareers.com/',
      postedDate: '2024-01-10',
      status: 'active'
    },
    {
      id: '4',
      company: 'Amazon',
      position: 'Product Manager Intern - AWS',
      location: 'Seattle, WA',
      type: 'Internship',
      duration: '12 weeks',
      description: 'Work on Amazon Web Services products that power millions of businesses worldwide. Gain experience in cloud computing, enterprise software, and product strategy.',
      requirements: [
        'Pursuing degree in Computer Science, Business, or related field',
        'Understanding of cloud computing concepts',
        'Strong analytical and problem-solving skills',
        'Experience with data analysis',
        'Previous internship experience preferred'
      ],
      benefits: [
        'Hands-on experience with AWS services',
        'Mentorship from senior product managers',
        'Competitive salary and benefits',
        'Access to Amazon\'s internal tools',
        'Potential for full-time offers'
      ],
      applicationDeadline: '2024-03-25',
      applicationLink: 'https://www.amazon.jobs/',
      postedDate: '2024-01-25',
      status: 'active'
    },
    {
      id: '5',
      company: 'Stripe',
      position: 'Product Management Intern',
      location: 'San Francisco, CA',
      type: 'Internship',
      duration: '10 weeks',
      description: 'Join Stripe\'s product team and work on financial infrastructure that powers the internet economy. Help build products that enable businesses to accept payments globally.',
      requirements: [
        'Currently enrolled in university',
        'Interest in fintech and payments',
        'Strong analytical skills',
        'Experience with product development',
        'Excellent written and verbal communication'
      ],
      benefits: [
        'Exposure to fintech industry',
        'Mentorship from experienced PMs',
        'Competitive compensation',
        'Access to Stripe\'s product suite',
        'Networking opportunities'
      ],
      applicationDeadline: '2024-03-30',
      applicationLink: 'https://stripe.com/jobs/',
      postedDate: '2024-01-30',
      status: 'active'
    }
  ];

  // Load internships data
  useEffect(() => {
    const loadInternships = async () => {
      setLoading(true);
      try {
        // In a real implementation, you would call an API here
        // For now, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        setInternships(mockInternships);
        setFilteredInternships(mockInternships);
      } catch (err) {
        setError('Failed to load internships. Please try again later.');
        console.error('Error loading internships:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInternships();
  }, []);

  // Filter internships based on search and filters
  useEffect(() => {
    let filtered = internships;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(internship =>
        internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(internship => internship.type === filterType);
    }

    // Location filter
    if (filterLocation !== 'all') {
      filtered = filtered.filter(internship => 
        internship.location.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }

    setFilteredInternships(filtered);
  }, [internships, searchTerm, filterType, filterLocation]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'expired':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'coming-soon':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'expired':
        return 'Expired';
      case 'coming-soon':
        return 'Coming Soon';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isDeadlineApproaching = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading internships...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {onBack && (
                <button
                  onClick={onBack}
                  className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">PM Internships</h1>
                <p className="text-gray-600 mt-2">
                  Find your next Product Management internship opportunity
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {filteredInternships.length} opportunities found
              </span>
              <button
                onClick={() => window.location.reload()}
                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search companies, positions, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="md:w-48">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="Internship">Internship</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            {/* Location Filter */}
            <div className="md:w-48">
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Locations</option>
                <option value="san francisco">San Francisco</option>
                <option value="seattle">Seattle</option>
                <option value="mountain view">Mountain View</option>
                <option value="menlo park">Menlo Park</option>
                <option value="new york">New York</option>
                <option value="remote">Remote</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Internships List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredInternships.length === 0 ? (
          <div className="text-center py-12">
            <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No internships found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or check back later.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredInternships.map((internship) => (
              <div
                key={internship.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {internship.position}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(internship.status)}
                          <span className="text-sm text-gray-600">
                            {getStatusText(internship.status)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Building className="w-4 h-4" />
                          <span className="font-medium">{internship.company}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{internship.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{internship.duration}</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-2">
                        {internship.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {internship.type}
                        </span>
                        {isDeadlineApproaching(internship.applicationDeadline) && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                            Deadline Soon
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Deadline:</span> {formatDate(internship.applicationDeadline)}
                        </div>
                        <a
                          href={internship.applicationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Apply Now
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="bg-blue-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center">
            <p className="text-sm text-blue-800">
              💡 <strong>Pro Tip:</strong> This data is sourced from the 
              <a 
                href="https://docs.google.com/spreadsheets/d/1eS-GIK25Zqpj5vrVht8l3Ob1RZLsRXzfDWkjp-jNo94/edit?gid=1737102963#gid=1737102963" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:no-underline ml-1"
              >
                Product Management Internships Spreadsheet
              </a>
              . The spreadsheet is moving to a dedicated site soon for better stability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipsPage;
