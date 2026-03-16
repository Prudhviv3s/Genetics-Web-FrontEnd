import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  Home, Users, UserCircle, Activity, FileText, Settings, 
  ChevronRight, Search, Grid, List, BarChart3, Shield, 
  Bell, HelpCircle, LogOut, Eye, Filter, Stethoscope,
  GitBranch, Clock, Share2, Download, Languages, Accessibility,
  Shuffle, Zap, Lock, Code
} from 'lucide-react';

interface ScreenItem {
  id: number;
  name: string;
  route: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  userRole?: 'patient' | 'doctor' | 'both';
}

export default function AllScreensDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');

  // Developer/Tester Access Code
  const DEVELOPER_ACCESS_CODE = 'dev2024';
  const TESTER_ACCESS_CODE = 'test2024';

  // Check if already authenticated from session storage
  useEffect(() => {
    const authenticated = sessionStorage.getItem('developerAccess') === 'true';
    setIsAuthenticated(authenticated);
  }, []);

  const handleAccessCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === DEVELOPER_ACCESS_CODE || accessCode === TESTER_ACCESS_CODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem('developerAccess', 'true');
      setError('');
    } else {
      setError('Invalid access code. This dashboard is restricted to developers and testers only.');
      setAccessCode('');
    }
  };

  // If not authenticated, show access code screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Developer Access Required</h1>
              <p className="text-sm text-gray-600 text-center">
                This dashboard is restricted to developers and testers only
              </p>
            </div>

            <form onSubmit={handleAccessCodeSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Code
                </label>
                <input
                  type="password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Enter developer/tester access code"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                  <Shield className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Access Dashboard
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <Code className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700 mb-1">For Development & Testing Only</p>
                  <p className="text-xs">
                    Patients and doctors should use their respective role-based dashboards.
                    Contact your development team for access credentials.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/home')}
              className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  const screens: ScreenItem[] = [
    // Authentication & Onboarding (1-10)
    { id: 1, name: 'Splash Screen', route: '/welcome', description: 'App loading animation', icon: <Home className="w-5 h-5" />, category: 'Authentication', userRole: 'both' },
    { id: 2, name: 'Welcome Screen', route: '/welcome', description: 'Welcome message and get started', icon: <Home className="w-5 h-5" />, category: 'Authentication', userRole: 'both' },
    { id: 3, name: 'Role Selection', route: '/role-selection', description: 'Choose patient or doctor role', icon: <Users className="w-5 h-5" />, category: 'Authentication', userRole: 'both' },
    { id: 4, name: 'Login', route: '/login', description: 'User authentication', icon: <Shield className="w-5 h-5" />, category: 'Authentication', userRole: 'both' },
    { id: 5, name: 'Sign Up', route: '/signup', description: 'New user registration', icon: <UserCircle className="w-5 h-5" />, category: 'Authentication', userRole: 'both' },
    { id: 6, name: 'OTP Verification', route: '/otp-verification', description: 'Verify phone/email with OTP', icon: <Shield className="w-5 h-5" />, category: 'Authentication', userRole: 'both' },
    { id: 7, name: 'Forgot Password', route: '/forgot-password', description: 'Password recovery', icon: <Shield className="w-5 h-5" />, category: 'Authentication', userRole: 'both' },
    { id: 8, name: 'Reset Password', route: '/reset-password', description: 'Create new password', icon: <Shield className="w-5 h-5" />, category: 'Authentication', userRole: 'both' },

    // Patient Dashboard & Profile (11-12)
    { id: 11, name: 'Patient Home Dashboard', route: '/patient-dashboard', description: 'Patient main dashboard', icon: <Home className="w-5 h-5" />, category: 'Patient Dashboard', userRole: 'patient' },
    { id: 12, name: 'Patient Profile', route: '/patient-profile', description: 'View and edit patient info', icon: <UserCircle className="w-5 h-5" />, category: 'Patient Dashboard', userRole: 'patient' },

    // Family Management (13-20)
    { id: 13, name: 'Family Overview', route: '/family-overview', description: 'View all family members', icon: <Users className="w-5 h-5" />, category: 'Family Management', userRole: 'patient' },
    { id: 14, name: 'Add Family Member', route: '/add-family-member', description: 'Add new family member', icon: <Users className="w-5 h-5" />, category: 'Family Management', userRole: 'patient' },
    { id: 15, name: 'Select Relationship', route: '/select-relationship', description: 'Define family relationship', icon: <GitBranch className="w-5 h-5" />, category: 'Family Management', userRole: 'patient' },
    { id: 16, name: 'Select Status', route: '/select-status', description: 'Set health status', icon: <Activity className="w-5 h-5" />, category: 'Family Management', userRole: 'patient' },
    { id: 17, name: 'Medical Notes', route: '/medical-notes', description: 'Add medical information', icon: <FileText className="w-5 h-5" />, category: 'Family Management', userRole: 'patient' },
    { id: 18, name: 'Pedigree Builder', route: '/pedigree-builder', description: 'Build family tree', icon: <GitBranch className="w-5 h-5" />, category: 'Family Management', userRole: 'patient' },
    { id: 19, name: 'Edit Family Member', route: '/edit-family-member/1', description: 'Modify member details', icon: <Users className="w-5 h-5" />, category: 'Family Management', userRole: 'patient' },
    { id: 20, name: 'Delete Confirmation', route: '/delete-confirmation/1', description: 'Confirm member deletion', icon: <Users className="w-5 h-5" />, category: 'Family Management', userRole: 'patient' },

    // Pedigree Operations (21-25)
    { id: 21, name: 'Save Pedigree', route: '/save-pedigree', description: 'Save pedigree chart', icon: <FileText className="w-5 h-5" />, category: 'Pedigree Operations', userRole: 'patient' },
    { id: 22, name: 'Update Pedigree', route: '/update-pedigree', description: 'Update existing pedigree', icon: <FileText className="w-5 h-5" />, category: 'Pedigree Operations', userRole: 'patient' },
    { id: 23, name: 'Version History', route: '/version-history', description: 'View pedigree versions', icon: <Clock className="w-5 h-5" />, category: 'Pedigree Operations', userRole: 'patient' },
    { id: 24, name: 'Compare Changes', route: '/compare-changes', description: 'Compare pedigree versions', icon: <Eye className="w-5 h-5" />, category: 'Pedigree Operations', userRole: 'patient' },
    { id: 25, name: 'Submit Pedigree', route: '/submit-pedigree', description: 'Submit to doctor', icon: <Share2 className="w-5 h-5" />, category: 'Pedigree Operations', userRole: 'patient' },

    // Doctor Dashboard (26-28)
    { id: 26, name: 'Doctor Home Dashboard', route: '/doctor-home', description: 'Doctor main dashboard', icon: <Stethoscope className="w-5 h-5" />, category: 'Doctor Dashboard', userRole: 'doctor' },
    { id: 27, name: 'Doctor Patient List', route: '/doctor-patients', description: 'View all patients', icon: <Users className="w-5 h-5" />, category: 'Doctor Dashboard', userRole: 'doctor' },
    { id: 28, name: 'Patient Detail View', route: '/patient-detail/p1', description: 'View patient details', icon: <UserCircle className="w-5 h-5" />, category: 'Doctor Dashboard', userRole: 'doctor' },
    { id: 29, name: 'Visual Pedigree Analysis', route: '/visual-analysis', description: 'Analyze pedigree chart', icon: <Eye className="w-5 h-5" />, category: 'Doctor Dashboard', userRole: 'doctor' },

    // Analysis & Detection (30-35)
    { id: 30, name: 'Inheritance Detection', route: '/inheritance-detection', description: 'Detect inheritance patterns', icon: <BarChart3 className="w-5 h-5" />, category: 'Analysis & Detection', userRole: 'doctor' },
    { id: 31, name: 'Rule-Based Evaluation', route: '/rule-evaluation', description: 'Apply genetic rules', icon: <Filter className="w-5 h-5" />, category: 'Analysis & Detection', userRole: 'doctor' },
    { id: 32, name: 'Autosomal Dominant', route: '/autosomal-dominant', description: 'AD pattern analysis', icon: <BarChart3 className="w-5 h-5" />, category: 'Analysis & Detection', userRole: 'doctor' },
    { id: 33, name: 'Autosomal Recessive', route: '/autosomal-recessive', description: 'AR pattern analysis', icon: <BarChart3 className="w-5 h-5" />, category: 'Analysis & Detection', userRole: 'doctor' },
    { id: 34, name: 'X-Linked', route: '/x-linked', description: 'X-linked pattern analysis', icon: <BarChart3 className="w-5 h-5" />, category: 'Analysis & Detection', userRole: 'doctor' },
    { id: 35, name: 'Y-Linked', route: '/y-linked', description: 'Y-linked pattern analysis', icon: <BarChart3 className="w-5 h-5" />, category: 'Analysis & Detection', userRole: 'doctor' },

    // Advanced Analysis (36-39)
    { id: 36, name: 'Mitochondrial', route: '/mitochondrial', description: 'Mitochondrial pattern', icon: <BarChart3 className="w-5 h-5" />, category: 'Advanced Analysis', userRole: 'doctor' },
    { id: 37, name: 'Processing', route: '/processing', description: 'Analysis in progress', icon: <Activity className="w-5 h-5" />, category: 'Advanced Analysis', userRole: 'doctor' },
    { id: 38, name: 'Prediction Result', route: '/prediction-result', description: 'View predictions', icon: <BarChart3 className="w-5 h-5" />, category: 'Advanced Analysis', userRole: 'doctor' },
    { id: 39, name: 'Confidence Score', route: '/confidence-score', description: 'Analysis confidence metrics', icon: <BarChart3 className="w-5 h-5" />, category: 'Advanced Analysis', userRole: 'doctor' },

    // Reports & Documentation (40-44)
    { id: 40, name: 'Doctor Notes', route: '/doctor-notes', description: 'Add clinical notes', icon: <FileText className="w-5 h-5" />, category: 'Reports & Documentation', userRole: 'doctor' },
    { id: 41, name: 'Generate Report', route: '/generate-report', description: 'Create medical report', icon: <FileText className="w-5 h-5" />, category: 'Reports & Documentation', userRole: 'doctor' },
    { id: 42, name: 'My Inheritance Analysis', route: '/my-inheritance-analysis', description: 'View inheritance analysis', icon: <Activity className="w-5 h-5" />, category: 'Reports & Documentation', userRole: 'patient' },
    { id: 43, name: 'Export Report', route: '/export-report', description: 'Export to PDF/Excel', icon: <Download className="w-5 h-5" />, category: 'Reports & Documentation', userRole: 'both' },
    { id: 44, name: 'Share Report', route: '/share-report', description: 'Share with others', icon: <Share2 className="w-5 h-5" />, category: 'Reports & Documentation', userRole: 'both' },

    // Notifications & Support (45-48)
    { id: 45, name: 'Notifications', route: '/notifications', description: 'View all notifications', icon: <Bell className="w-5 h-5" />, category: 'Notifications & Support', userRole: 'both' },
    { id: 46, name: 'Help', route: '/help', description: 'Help and tutorials', icon: <HelpCircle className="w-5 h-5" />, category: 'Notifications & Support', userRole: 'both' },
    { id: 47, name: 'FAQ', route: '/faq', description: 'Frequently asked questions', icon: <HelpCircle className="w-5 h-5" />, category: 'Notifications & Support', userRole: 'both' },
    { id: 48, name: 'Feedback', route: '/feedback', description: 'Send feedback', icon: <FileText className="w-5 h-5" />, category: 'Notifications & Support', userRole: 'both' },

    // Settings (49-51)
    { id: 49, name: 'Language', route: '/language', description: 'Change language', icon: <Languages className="w-5 h-5" />, category: 'Settings', userRole: 'both' },
    { id: 50, name: 'Accessibility', route: '/accessibility', description: 'Accessibility options', icon: <Accessibility className="w-5 h-5" />, category: 'Settings', userRole: 'both' },
    { id: 51, name: 'Logout', route: '/logout', description: 'Sign out of app', icon: <LogOut className="w-5 h-5" />, category: 'Settings', userRole: 'both' },
  ];

  const categories = [
    'all',
    'Authentication',
    'Patient Dashboard',
    'Family Management',
    'Pedigree Operations',
    'Doctor Dashboard',
    'Analysis & Detection',
    'Advanced Analysis',
    'Reports & Documentation',
    'Notifications & Support',
    'Settings',
  ];

  const filteredScreens = screens.filter(screen => {
    const matchesSearch = screen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         screen.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || screen.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Authentication': 'bg-blue-100 text-blue-700',
      'Patient Dashboard': 'bg-green-100 text-green-700',
      'Family Management': 'bg-purple-100 text-purple-700',
      'Pedigree Operations': 'bg-indigo-100 text-indigo-700',
      'Doctor Dashboard': 'bg-cyan-100 text-cyan-700',
      'Analysis & Detection': 'bg-orange-100 text-orange-700',
      'Advanced Analysis': 'bg-red-100 text-red-700',
      'Reports & Documentation': 'bg-yellow-100 text-yellow-700',
      'Notifications & Support': 'bg-pink-100 text-pink-700',
      'Settings': 'bg-gray-100 text-gray-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const getRoleBadgeColor = (role?: string) => {
    if (role === 'patient') return 'bg-green-500';
    if (role === 'doctor') return 'bg-blue-500';
    return 'bg-purple-500';
  };

  const goToRandomScreen = () => {
    const randomIndex = Math.floor(Math.random() * screens.length);
    const randomScreen = screens[randomIndex];
    navigate(randomScreen.route);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('developerAccess');
    setIsAuthenticated(false);
    setAccessCode('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">All Screens Dashboard</h1>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  Developer Mode
                </span>
              </div>
              <p className="text-sm text-gray-600">50 screens available</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                title="Exit Developer Mode"
              >
                <Lock className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search screens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="max-w-7xl mx-auto px-4 pb-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category === 'all' ? 'All Screens' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Random Screen Button */}
        <div className="mb-6">
          <button
            onClick={goToRandomScreen}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 group"
          >
            <Shuffle className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-lg font-semibold">Go to Random Screen</span>
            <Zap className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-gray-900">{filteredScreens.length}</div>
            <div className="text-sm text-gray-600">Screens Found</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{categories.length - 1}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {screens.filter(s => s.userRole === 'patient' || s.userRole === 'both').length}
            </div>
            <div className="text-sm text-gray-600">Patient Screens</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-cyan-600">
              {screens.filter(s => s.userRole === 'doctor' || s.userRole === 'both').length}
            </div>
            <div className="text-sm text-gray-600">Doctor Screens</div>
          </div>
        </div>

        {/* Screens Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredScreens.map((screen) => (
              <div
                key={screen.id}
                onClick={() => navigate(screen.route)}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-blue-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      {screen.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-500">#{screen.id}</span>
                        <div className={`w-2 h-2 rounded-full ${getRoleBadgeColor(screen.userRole)}`} />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm">{screen.name}</h3>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-xs text-gray-600 mb-3">{screen.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(screen.category)}`}>
                    {screen.category}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">{screen.userRole}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredScreens.map((screen) => (
              <div
                key={screen.id}
                onClick={() => navigate(screen.route)}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-blue-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      {screen.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-semibold text-gray-500">#{screen.id}</span>
                        <h3 className="font-semibold text-gray-900">{screen.name}</h3>
                        <div className={`w-2 h-2 rounded-full ${getRoleBadgeColor(screen.userRole)}`} />
                      </div>
                      <p className="text-sm text-gray-600">{screen.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-3 py-1 rounded-full ${getCategoryColor(screen.category)}`}>
                        {screen.category}
                      </span>
                      <span className="text-xs text-gray-500 capitalize w-16">{screen.userRole}</span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredScreens.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No screens found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Role Legend</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-gray-700">Patient Only</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-700">Doctor Only</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-sm text-gray-700">Both Roles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}