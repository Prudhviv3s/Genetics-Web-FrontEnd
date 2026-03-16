import React from 'react';
import { BarChart3, TrendingUp, FileText, ChevronRight, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { useAppContext } from '../context/AppContext';

export default function InheritanceAnalysisScreen() {
  const navigate = useNavigate();
  const { userRole } = useAppContext();

  const analysisTypes = [
    {
      id: 'autosomal-dominant',
      title: 'Autosomal Dominant',
      description: 'Analyze autosomal dominant inheritance patterns',
      color: 'blue',
      path: '/autosomal-dominant',
    },
    {
      id: 'autosomal-recessive',
      title: 'Autosomal Recessive',
      description: 'Analyze autosomal recessive inheritance patterns',
      color: 'purple',
      path: '/autosomal-recessive',
    },
    {
      id: 'x-linked',
      title: 'X-Linked',
      description: 'Analyze X-linked inheritance patterns',
      color: 'pink',
      path: '/x-linked',
    },
    {
      id: 'y-linked',
      title: 'Y-Linked',
      description: 'Analyze Y-linked inheritance patterns',
      color: 'green',
      path: '/y-linked',
    },
    {
      id: 'mitochondrial',
      title: 'Mitochondrial',
      description: 'Analyze mitochondrial inheritance patterns',
      color: 'orange',
      path: '/mitochondrial',
    },
  ];

  const recentAnalyses = [
    { patient: 'John Doe', pattern: 'Autosomal Dominant', date: '2 days ago' },
    { patient: 'Jane Smith', pattern: 'X-Linked', date: '3 days ago' },
    { patient: 'Bob Johnson', pattern: 'Autosomal Recessive', date: '5 days ago' },
  ];

  return (
    <DesktopLayout title="Inheritance Analysis">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Pattern Analysis</h2>
          <p className="text-gray-600 mt-2 text-lg">
            Analyze and predict genetic inheritance patterns
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 rounded-lg p-2">
                <BarChart3 size={24} className="text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">Total Analyses</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">127</div>
            <p className="text-sm text-gray-500 mt-1">All time</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-100 rounded-lg p-2">
                <TrendingUp size={24} className="text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">This Month</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">23</div>
            <p className="text-sm text-gray-500 mt-1">+12% from last month</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-100 rounded-lg p-2">
                <FileText size={24} className="text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">Completed</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">115</div>
            <p className="text-sm text-gray-500 mt-1">90.6% success rate</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-orange-100 rounded-lg p-2">
                <BarChart3 size={24} className="text-orange-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">Pending</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">12</div>
            <p className="text-sm text-gray-500 mt-1">Awaiting review</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Analysis Types */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Inheritance Pattern Types
              </h3>
              <div className="space-y-3">
                {analysisTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => navigate(type.path)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-blue-50 hover:border-blue-400 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900 mb-1">{type.title}</div>
                        <div className="text-sm text-gray-600">{type.description}</div>
                      </div>
                      <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => navigate('/inheritance-detection')}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-4 font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                Start New Analysis
              </button>
            </div>
          </div>

          <div>
            {/* Recent Analyses */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Recent Analyses
              </h3>
              <div className="space-y-3">
                {recentAnalyses.map((analysis, index) => (
                  <button
                    key={index}
                    onClick={() => navigate('/prediction-result')}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-all text-left"
                  >
                    <div className="flex items-start gap-3">
                      <FileText size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 truncate">{analysis.patient}</div>
                        <div className="text-sm text-gray-600">{analysis.pattern}</div>
                        <div className="text-xs text-gray-500 mt-1">{analysis.date}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => navigate('/patient-results')}
                className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center justify-center gap-1"
              >
                View All Results
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
}